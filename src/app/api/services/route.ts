import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/services — returns the list of carpentry services offered across
// the directory with the number of listings offering each.
export async function GET() {
  // We store services as a comma-separated string, so we have to aggregate
  // in JS. Listings volume is small enough for this to be fine.
  const listings = await db.listing.findMany({
    where: { status: 'published' },
    select: { services: true },
  })

  const counts = new Map<string, number>()
  for (const l of listings) {
    const tags = l.services.split(',').map((s) => s.trim()).filter(Boolean)
    for (const t of tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1)
    }
  }

  const services = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)

  return NextResponse.json({ services, totalServices: services.length })
}
