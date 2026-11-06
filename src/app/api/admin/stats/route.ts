import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.headers.get("x-admin-password") === password;
}

// GET /api/admin/stats — dashboard summary
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    totalListings,
    verifiedListings,
    featuredListings,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
    listingsByCity,
  ] = await Promise.all([
    db.listing.count({ where: { status: "published" } }),
    db.listing.count({ where: { status: "published", verified: true } }),
    db.listing.count({ where: { status: "published", featured: true } }),
    db.submission.count({ where: { status: "pending" } }),
    db.submission.count({ where: { status: "approved" } }),
    db.submission.count({ where: { status: "rejected" } }),
    db.listing.groupBy({
      by: ["city"],
      _count: { _all: true },
      where: { status: "published" },
      orderBy: { _count: { city: "desc" } },
      take: 10,
    }),
  ]);

  return NextResponse.json({
    listings: {
      total: totalListings,
      verified: verifiedListings,
      featured: featuredListings,
    },
    submissions: {
      pending: pendingSubmissions,
      approved: approvedSubmissions,
      rejected: rejectedSubmissions,
    },
    topCities: listingsByCity.map((c) => ({ city: c.city, count: c._count._all })),
  });
}
