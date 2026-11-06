import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// Simple admin auth — checks the x-admin-password header against the
// ADMIN_PASSWORD env var. This is MVP-level security. For production,
// replace with NextAuth.js + proper session management.
function isAuthorized(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const provided = req.headers.get("x-admin-password");
  return provided === password;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await db.submission.findMany({
    where: { status: "pending" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ submissions, total: submissions.length });
}
