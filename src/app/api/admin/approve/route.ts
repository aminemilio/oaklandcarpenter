import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.headers.get("x-admin-password") === password;
}

function slugify(name: string, city: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return `${base}-${citySlug}`;
}

// POST /api/admin/approve
// Body: { submissionId: string, verified?: boolean, featured?: boolean }
// Creates a Listing from the Submission, marks the Submission as approved.
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { submissionId?: string; verified?: boolean; featured?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { submissionId, verified = false, featured = false } = body;
  if (!submissionId) {
    return NextResponse.json({ error: "submissionId required" }, { status: 400 });
  }

  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }
  if (submission.status === "approved") {
    return NextResponse.json({ error: "Already approved" }, { status: 409 });
  }

  // Check for duplicate listing (same business name + city)
  const existing = await db.listing.findFirst({
    where: { businessName: submission.businessName, city: submission.city },
  });
  if (existing) {
    return NextResponse.json(
      { error: `A listing for "${submission.businessName}" in ${submission.city} already exists` },
      { status: 409 }
    );
  }

  // Create the Listing from the submission
  const listing = await db.listing.create({
    data: {
      businessName: submission.businessName,
      slug: slugify(submission.businessName, submission.city),
      ownerName: submission.ownerName,
      city: submission.city,
      county: submission.county ?? "",
      region: "", // admin should fill this in, or derive from city later
      services: submission.services,
      primaryService: submission.primaryService,
      description: submission.description ?? "",
      phone: submission.phone,
      email: submission.email,
      website: submission.website,
      address: submission.address,
      licenseNumber: submission.licenseNumber,
      licenseClass: submission.licenseClass,
      licenseStatus: "Active", // admin should verify via CSLB before approving
      yearEstablished: submission.yearEstablished,
      rating: 0,
      reviewCount: 0,
      featured,
      verified,
      status: "published",
    },
  });

  // Mark submission as approved
  await db.submission.update({
    where: { id: submissionId },
    data: { status: "approved" },
  });

  return NextResponse.json({
    ok: true,
    listingId: listing.id,
    message: `Approved and published "${listing.businessName}" in ${listing.city}`,
  });
}
