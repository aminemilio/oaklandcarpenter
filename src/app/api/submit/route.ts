import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/submit — public submission form for carpenters to add their
// business to the directory. Submissions go into a "pending" queue and
// must be approved by an admin before becoming a published Listing.
//
// This is intentionally permissive on fields (anyone can submit) but
// validates required fields. The admin verification step (CSLB lookup)
// is what protects directory quality.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const businessName = String(body.businessName ?? '').trim()
  const city = String(body.city ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()
  const primaryService = String(body.primaryService ?? '').trim()
  const services = String(body.services ?? '').trim()

  // Required field validation
  const missing: string[] = []
  if (!businessName) missing.push('businessName')
  if (!city) missing.push('city')
  if (!phone) missing.push('phone')
  if (!email) missing.push('email')
  if (!primaryService) missing.push('primaryService')
  if (!services) missing.push('services')

  if (missing.length > 0) {
    return NextResponse.json(
      { error: 'Missing required fields', fields: missing },
      { status: 400 }
    )
  }

  // Basic email sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  // Optional fields
  const ownerName = body.ownerName ? String(body.ownerName).trim() : null
  const county = body.county ? String(body.county).trim() : null
  const description = body.description ? String(body.description).trim() : null
  const website = body.website ? String(body.website).trim() : null
  const address = body.address ? String(body.address).trim() : null
  const licenseNumber = body.licenseNumber ? String(body.licenseNumber).trim() : null
  const licenseClass = body.licenseClass ? String(body.licenseClass).trim() : null
  const yearEstablished = body.yearEstablished
    ? parseInt(String(body.yearEstablished), 10)
    : null

  if (yearEstablished !== null && (isNaN(yearEstablished) || yearEstablished < 1800 || yearEstablished > new Date().getFullYear())) {
    return NextResponse.json({ error: 'Invalid yearEstablished' }, { status: 400 })
  }

  // De-duplicate: same businessName + city already in queue or already a listing
  const existingListing = await db.listing.findFirst({
    where: { businessName: { equals: businessName }, city: { equals: city } },
    select: { id: true },
  })
  if (existingListing) {
    return NextResponse.json(
      { error: 'A listing with this business name and city already exists.' },
      { status: 409 }
    )
  }

  const existingSubmission = await db.submission.findFirst({
    where: {
      businessName: { equals: businessName },
      city: { equals: city },
      status: 'pending',
    },
    select: { id: true },
  })
  if (existingSubmission) {
    return NextResponse.json(
      { error: 'You already have a submission pending review.' },
      { status: 409 }
    )
  }

  const submission = await db.submission.create({
    data: {
      businessName,
      ownerName,
      city,
      county,
      services,
      primaryService,
      description,
      phone,
      email,
      website,
      address,
      licenseNumber,
      licenseClass,
      yearEstablished,
      status: 'pending',
    },
  })

  return NextResponse.json(
    { ok: true, id: submission.id, message: 'Submission received. It will be reviewed within 3 business days.' },
    { status: 201 }
  )
}
