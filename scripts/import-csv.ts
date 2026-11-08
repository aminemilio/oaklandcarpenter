// CSV import script — bulk-add REAL carpenter listings from a CSV file.
//
// STEP 1: Go to https://www.cslb.ca.gov/FindAContractor
//   - Search by City (e.g., "Oakland") and License Classification (e.g., "B" or "C-6")
//   - The CSLB tool shows: business name, license number, status, phone, address
//   - Copy the results into a CSV file (see template below)
//
// STEP 2: Only include businesses you've contacted and gotten consent from,
//   OR only include your own business if you're a carpenter building your own directory.
//   Do NOT add businesses without their knowledge — it's bad practice and some
//   may request removal (which you must honor under our Terms of Service).
//
// STEP 3: Save as scripts/listings.csv and run:
//   bun run scripts/import-csv.ts
//
// CSV format (header row required):
//   businessName,ownerName,city,county,region,primaryService,services,description,phone,email,website,address,licenseNumber,licenseClass,licenseStatus,yearEstablished,rating,reviewCount,featured,verified
//
// Example row:
//   "Smith Carpentry",,Oakland,Alameda,Bay Area,General Carpentry,"General Carpentry, Framing, Deck Building","Licensed Class B contractor serving Oakland since 2005.",(510) 555-1234,smith@example.com,https://smithcarpentry.com,123 Main St Oakland CA,1024587,B,Active,2005,4.8,23,false,false
//
// TIP: Start with just 5-10 real listings. The site looks better with a few
// real listings than with 40 fake ones. Grow organically from there.

import { db } from "../src/lib/db"
import * as fs from "fs"
import * as path from "path"

function slugify(name: string, city: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return `${base}-${citySlug}`
}

// Simple CSV parser (handles quoted fields with commas)
function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (char === '"' && next === '"') {
        currentField += '"'
        i++
      } else if (char === '"') {
        inQuotes = false
      } else {
        currentField += char
      }
    } else {
      if (char === '"') {
        inQuotes = true
      } else if (char === ",") {
        currentRow.push(currentField)
        currentField = ""
      } else if (char === "\n") {
        currentRow.push(currentField)
        currentField = ""
        rows.push(currentRow)
        currentRow = []
      } else if (char === "\r") {
        // skip carriage return
      } else {
        currentField += char
      }
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }
  return rows.filter((r) => r.length > 0 && r.some((f) => f.trim()))
}

async function main() {
  const csvPath = path.join(process.cwd(), "scripts", "listings.csv")

  if (!fs.existsSync(csvPath)) {
    console.error(`\n❌ CSV file not found: ${csvPath}`)
    console.log("\nCreate a file at scripts/listings.csv with this format:")
    console.log("businessName,ownerName,city,county,region,primaryService,services,description,phone,email,website,address,licenseNumber,licenseClass,licenseStatus,yearEstablished,rating,reviewCount,featured,verified")
    console.log('\nExample:')
    console.log('"Smith Carpentry",,Oakland,Alameda,Bay Area,General Carpentry,"General Carpentry, Framing","Oakland carpenter since 2005.",(510) 555-1234,smith@example.com,https://smithcarpentry.com,123 Main St,1024587,B,Active,2005,4.8,23,false,false')
    process.exit(1)
  }

  const csvText = fs.readFileSync(csvPath, "utf-8")
  const rows = parseCSV(csvText)

  if (rows.length < 2) {
    console.error("CSV file needs a header row + at least one data row.")
    process.exit(1)
  }

  const headers = rows[0].map((h) => h.trim())
  const dataRows = rows.slice(1)

  console.log(`\nImporting ${dataRows.length} listings from CSV…\n`)

  let imported = 0
  let skipped = 0

  for (const row of dataRows) {
    const get = (key: string) => {
      const idx = headers.indexOf(key)
      return idx >= 0 ? (row[idx] ?? "").trim() : ""
    }

    const businessName = get("businessName")
    const city = get("city")

    if (!businessName || !city) {
      console.log(`  ⚠️  Skipping (missing name or city): ${businessName || "unknown"}`)
      skipped++
      continue
    }

    // Check for duplicates
    const existing = await db.listing.findFirst({
      where: { businessName: { equals: businessName }, city: { equals: city } },
      select: { id: true },
    })
    if (existing) {
      console.log(`  ⚠️  Skipping (already exists): ${businessName} in ${city}`)
      skipped++
      continue
    }

    const listing = await db.listing.create({
      data: {
        businessName,
        slug: slugify(businessName, city),
        ownerName: get("ownerName") || null,
        city,
        county: get("county") || "",
        region: get("region") || "",
        services: get("services") || get("primaryService"),
        primaryService: get("primaryService") || "General Carpentry",
        description: get("description") || "",
        phone: get("phone"),
        email: get("email") || null,
        website: get("website") || null,
        address: get("address") || null,
        licenseNumber: get("licenseNumber") || null,
        licenseClass: get("licenseClass") || null,
        licenseStatus: get("licenseStatus") || null,
        yearEstablished: get("yearEstablished") ? parseInt(get("yearEstablished"), 10) : null,
        rating: parseFloat(get("rating")) || 0,
        reviewCount: parseInt(get("reviewCount"), 10) || 0,
        featured: get("featured").toLowerCase() === "true",
        verified: get("verified").toLowerCase() === "true",
        status: "published",
      },
    })

    console.log(`  ✓ ${listing.businessName} — ${listing.city} (${listing.primaryService})`)
    imported++
  }

  console.log(`\n${"=".repeat(50)}`)
  console.log(`Done! Imported: ${imported}, Skipped: ${skipped}`)

  const total = await db.listing.count()
  console.log(`Total listings in database: ${total}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
