// Clear all listings and submissions from the database.
// Use this before launching to production to remove sample/demo data.
//
// Run with: bun run scripts/clear-data.ts
//
// After clearing, the directory will start empty. Carpenters can submit
// their own listings through the public form, or you can manually add
// real listings by writing your own seed script with verified data from
// the CSLB public database (https://www.cslb.ca.gov/CheckALicense).

import { db } from "../src/lib/db";

async function main() {
  console.log("Clearing all listings and submissions...");
  const listingsDeleted = await db.listing.deleteMany({});
  const submissionsDeleted = await db.submission.deleteMany({});

  console.log(`\nDone.`);
  console.log(`  Listings deleted:     ${listingsDeleted.count}`);
  console.log(`  Submissions deleted:  ${submissionsDeleted.count}`);

  const remaining = await db.listing.count();
  console.log(`\nRemaining listings in database: ${remaining}`);

  if (remaining === 0) {
    console.log("\n✓ Database is now empty and ready for production launch.");
    console.log("  Carpenters can submit their listings through the public form.");
    console.log("  Or write your own seed script with REAL verified data.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
