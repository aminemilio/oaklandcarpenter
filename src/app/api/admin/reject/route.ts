import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function isAuthorized(req: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return req.headers.get("x-admin-password") === password;
}

// POST /api/admin/reject
// Body: { submissionId: string, reason?: string }
// Marks the submission as rejected (keeps the record for audit).
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { submissionId?: string; reason?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { submissionId } = body;
  if (!submissionId) {
    return NextResponse.json({ error: "submissionId required" }, { status: 400 });
  }

  const submission = await db.submission.findUnique({ where: { id: submissionId } });
  if (!submission) {
    return NextResponse.json({ error: "Submission not found" }, { status: 404 });
  }

  await db.submission.update({
    where: { id: submissionId },
    data: { status: "rejected" },
  });

  return NextResponse.json({
    ok: true,
    message: `Rejected "${submission.businessName}"`,
  });
}
