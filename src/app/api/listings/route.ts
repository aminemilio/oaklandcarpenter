import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/listings
// Query params:
//   city     — filter by exact city name
//   region   — filter by region (e.g. "Bay Area")
//   service  — filter by primaryService
//   q        — search across businessName + description + services + city
//   featured — "true" to return only featured listings
//   id       — return a single listing by id (overrides other filters)
//   limit    — default 50, max 200
//   offset   — default 0
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const city = searchParams.get('city')
  const region = searchParams.get('region')
  const service = searchParams.get('service')
  const q = searchParams.get('q')
  const featured = searchParams.get('featured') === 'true'
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10) || 50, 200)
  const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10) || 0, 0)

  // Single listing by id
  if (id) {
    const listing = await db.listing.findUnique({ where: { id } })
    if (!listing || listing.status !== 'published') {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }
    return NextResponse.json({ listing })
  }

  const where: Record<string, unknown> = { status: 'published' }
  if (city) where.city = city
  if (region) where.region = region
  if (service) where.primaryService = service
  if (featured) where.featured = true

  // Build OR conditions for q (SQLite has limited full-text support)
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
      orderBy: [{ featured: 'desc' }, { rating: 'desc' }, { reviewCount: 'desc' }],
      take: limit,
      skip: offset,
    }),
    db.listing.count({ where: OR ? { AND: [where, { OR }] } : where }),
  ])

  return NextResponse.json({ listings, total, limit, offset })
}

// POST /api/listings — admin-only create (not exposed publicly for MVP).
// Public submissions go through /api/submit instead.
export async function POST() {
  return NextResponse.json(
    { error: 'Direct listing creation is disabled. Use /api/submit.' },
    { status: 403 }
  )
}
