import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/cities — returns the list of California cities covered by the
// directory with the number of listings in each. Used to render the city
// grid on the home view.
export async function GET() {
  const rows = await db.listing.groupBy({
    by: ['city', 'county', 'region'],
    _count: { _all: true },
    where: { status: 'published' },
    orderBy: [{ region: 'asc' }, { city: 'asc' }],
  })

  // Also pull featured listings per city (count)
  const featured = await db.listing.groupBy({
    by: ['city'],
    _count: { _all: true },
    where: { status: 'published', featured: true },
  })
  const featuredMap = new Map(featured.map((f) => [f.city, f._count._all]))

  const cities = rows.map((r) => ({
    city: r.city,
    county: r.county,
    region: r.region,
    listingCount: r._count._all,
    featuredCount: featuredMap.get(r.city) ?? 0,
  }))

  // Group by region for easier display
  const byRegion: Record<string, typeof cities> = {}
  for (const c of cities) {
    if (!byRegion[c.region]) byRegion[c.region] = []
    byRegion[c.region].push(c)
  }

  return NextResponse.json({
    cities,
    byRegion,
    totalCities: cities.length,
    totalListings: cities.reduce((sum, c) => sum + c.listingCount, 0),
  })
}
