// Server-side data access functions for directory routes.
// These fetch directly from Prisma (not via API) so route handlers can
// render fully populated HTML for SEO.

import { db } from "@/lib/db"
import type { Listing, CityInfo, ServiceInfo } from "@/components/directory/types"
import { servicesArray } from "@/lib/format"

export type { Listing, CityInfo, ServiceInfo }

// Fetch a single listing by id. Returns null if not found or not published.
export async function getListingById(id: string): Promise<Listing | null> {
  const l = await db.listing.findUnique({ where: { id } })
  if (!l || l.status !== "published") return null
  return l as Listing
}

// Fetch a single listing by slug. Used by /[city]/[slug] route.
export async function getListingBySlug(city: string, slug: string): Promise<Listing | null> {
  // Slugs are stored as "business-name-city" — but the route receives just the
  // business part. We match by checking if the slug starts with the business
  // slug and the city matches.
  // Simpler: store full slug as "business-name-city" and match exactly.
  const fullSlug = `${slug}-${city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`
  const l = await db.listing.findFirst({
    where: {
      slug: fullSlug,
      city: city,
      status: "published",
    },
  })
  if (!l) return null
  return l as Listing
}

// Fetch all listings in a city. Used by /[city] route.
export async function getListingsByCity(city: string): Promise<{
  listings: Listing[]
  city: string
  county: string | null
  region: string | null
}> {
  const listings = await db.listing.findMany({
    where: { city, status: "published" },
    orderBy: [{ featured: "desc" }, { rating: "desc" }, { reviewCount: "desc" }],
  })
  const first = listings[0]
  return {
    listings: listings as Listing[],
    city,
    county: first?.county ?? null,
    region: first?.region ?? null,
  }
}

// Fetch featured listings for the home page.
export async function getFeaturedListings(limit = 6): Promise<Listing[]> {
  const listings = await db.listing.findMany({
    where: { status: "published", featured: true },
    orderBy: [{ rating: "desc" }, { reviewCount: "desc" }],
    take: limit,
  })
  return listings as Listing[]
}

// Fetch all cities with listing counts, grouped by region.
export async function getCitiesWithCounts(): Promise<{
  cities: CityInfo[]
  byRegion: Record<string, CityInfo[]>
  totalCities: number
  totalListings: number
}> {
  const rows = await db.listing.groupBy({
    by: ["city", "county", "region"],
    _count: { _all: true },
    where: { status: "published" },
    orderBy: [{ region: "asc" }, { city: "asc" }],
  })

  const featured = await db.listing.groupBy({
    by: ["city"],
    _count: { _all: true },
    where: { status: "published", featured: true },
  })
  const featuredMap = new Map(featured.map((f) => [f.city, f._count._all]))

  const cities: CityInfo[] = rows.map((r) => ({
    city: r.city,
    county: r.county,
    region: r.region,
    listingCount: r._count._all,
    featuredCount: featuredMap.get(r.city) ?? 0,
  }))

  const byRegion: Record<string, CityInfo[]> = {}
  for (const c of cities) {
    if (!byRegion[c.region]) byRegion[c.region] = []
    byRegion[c.region].push(c)
  }

  return {
    cities,
    byRegion,
    totalCities: cities.length,
    totalListings: cities.reduce((sum, c) => sum + c.listingCount, 0),
  }
}

// Fetch all service categories with counts.
export async function getServicesWithCounts(): Promise<ServiceInfo[]> {
  const listings = await db.listing.findMany({
    where: { status: "published" },
    select: { services: true },
  })

  const counts = new Map<string, number>()
  for (const l of listings) {
    const tags = servicesArray(l.services)
    for (const t of tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

// Fetch listings by service (across all cities).
export async function getListingsByService(service: string, limit = 100): Promise<{
  listings: Listing[]
  service: string
  total: number
}> {
  // Services are stored comma-separated, so we need a contains filter
  const listings = await db.listing.findMany({
    where: {
      status: "published",
      OR: [
        { primaryService: service },
        { services: { contains: service } },
      ],
    },
    orderBy: [{ featured: "desc" }, { rating: "desc" }, { reviewCount: "desc" }],
    take: limit,
  })
  return {
    listings: listings as Listing[],
    service,
    total: listings.length,
  }
}

// Fetch listings with filters (for /browse).
export async function getListingsWithFilters(filters: {
  q?: string
  service?: string
  region?: string
  city?: string
  limit?: number
}): Promise<{ listings: Listing[]; total: number }> {
  const { q, service, region, city, limit = 100 } = filters

  const where: Record<string, unknown> = { status: "published" }
  if (city) where.city = city
  if (region) where.region = region
  if (service) {
    where.OR = [
      { primaryService: service },
      { services: { contains: service } },
    ]
  }

  let OR: Array<Record<string, { contains: string }>> | undefined
  if (q) {
    OR = [
      { businessName: { contains: q } },
      { description: { contains: q } },
      { services: { contains: q } },
      { city: { contains: q } },
    ]
  }

  const [listings, total] = await Promise.all([
    db.listing.findMany({
      where: OR ? { AND: [where, { OR }] } : where,
      orderBy: [{ featured: "desc" }, { rating: "desc" }, { reviewCount: "desc" }],
      take: limit,
    }),
    db.listing.count({ where: OR ? { AND: [where, { OR }] } : where }),
  ])

  return { listings: listings as Listing[], total }
}

// Fetch pending submissions (for admin dashboard).
export async function getPendingSubmissions() {
  return db.submission.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "desc" },
  })
}

// Convert a service name to a URL-safe slug.
export function serviceToSlug(service: string): string {
  return service.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

// Convert a URL slug back to a service name (best-effort match).
export async function slugToService(slug: string): Promise<string | null> {
  const services = await getServicesWithCounts()
  for (const s of services) {
    if (serviceToSlug(s.name) === slug) return s.name
  }
  return null
}

// Convert a city name to a URL-safe slug.
export function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
}

// Convert a URL slug back to a city name.
export async function slugToCity(slug: string): Promise<string | null> {
  const { cities } = await getCitiesWithCounts()
  for (const c of cities) {
    if (cityToSlug(c.city) === slug) return c.city
  }
  // Also check exact match (in case the city has spaces, the slug might be the city itself)
  for (const c of cities) {
    if (c.city.toLowerCase() === slug.toLowerCase()) return c.city
  }
  return null
}
