"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Hammer, Lock, LogOut, Check, X, ExternalLink, BadgeCheck,
  Crown, Clock, TrendingUp, MapPin, Phone, Mail, FileText, RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

type Submission = {
  id: string;
  businessName: string;
  ownerName: string | null;
  city: string;
  county: string | null;
  services: string;
  primaryService: string;
  description: string | null;
  phone: string;
  email: string;
  website: string | null;
  address: string | null;
  licenseNumber: string | null;
  licenseClass: string | null;
  yearEstablished: number | null;
  status: string;
  createdAt: string;
};

type Stats = {
  listings: { total: number; verified: number; featured: number };
  submissions: { pending: number; approved: number; rejected: number };
  topCities: Array<{ city: string; count: number }>;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist password in sessionStorage so a refresh doesn't log out
  useEffect(() => {
    const saved = sessionStorage.getItem("admin-password");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, []);

  const authHeaders = useCallback(
    () => ({ "x-admin-password": password, "Content-Type": "application/json" }),
    [password]
  );

  const loadData = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    setError(null);
    try {
      const [subRes, statsRes] = await Promise.all([
        fetch("/api/admin/submissions", { headers: authHeaders() }),
        fetch("/api/admin/stats", { headers: authHeaders() }),
      ]);
      if (subRes.status === 401 || statsRes.status === 401) {
        setAuthed(false);
        setError("Session expired. Please re-enter your password.");
        return;
      }
      const subJson = await subRes.json();
      const statsJson = await statsRes.json();
      setSubmissions(subJson.submissions ?? []);
      setStats(statsJson);
    } catch {
      setError("Failed to load data. Check your connection.");
    } finally {
      setLoading(false);
    }
  }, [authed, authHeaders]);

  useEffect(() => {
    if (authed) loadData();
  }, [authed, loadData]);

  const onLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError("Enter the admin password.");
      return;
    }
    // Verify by hitting the stats endpoint
    fetch("/api/admin/stats", { headers: { "x-admin-password": password } })
      .then((r) => {
        if (r.ok) {
          sessionStorage.setItem("admin-password", password);
          setAuthed(true);
          setError(null);
        } else {
          setError("Incorrect password.");
        }
      })
      .catch(() => setError("Network error."));
  };

  const onLogout = () => {
    sessionStorage.removeItem("admin-password");
    setPassword("");
    setAuthed(false);
    setSubmissions([]);
    setStats(null);
  };

  const approve = async (sub: Submission, verified: boolean, featured: boolean) => {
    try {
      const r = await fetch("/api/admin/approve", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ submissionId: sub.id, verified, featured }),
      });
      const j = await r.json();
      if (!r.ok) {
        toast({ title: "Error", description: j.error ?? "Failed to approve", variant: "destructive" });
        return;
      }
      toast({ title: "Approved", description: j.message });
      loadData();
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    }
  };

  const reject = async (sub: Submission) => {
    if (!confirm(`Reject "${sub.businessName}"? This keeps the record but marks it rejected.`)) return;
    try {
      const r = await fetch("/api/admin/reject", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ submissionId: sub.id }),
      });
      const j = await r.json();
      if (!r.ok) {
        toast({ title: "Error", description: j.error ?? "Failed to reject", variant: "destructive" });
        return;
      }
      toast({ title: "Rejected", description: j.message });
      loadData();
    } catch {
      toast({ title: "Network error", variant: "destructive" });
    }
  };

  // ─── Login screen ─────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
        <Toaster />
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Hammer className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <p className="text-xs text-muted-foreground mt-1">Oakland Carpenter Directory</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={onLogin} className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="password" className="flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5" /> Admin password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  autoFocus
                />
              </div>
              {error && <p className="text-xs text-destructive">{error}</p>}
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
            <p className="text-[11px] text-muted-foreground mt-4 text-center">
              Set <code className="bg-secondary px-1 rounded">ADMIN_PASSWORD</code> env var in Vercel.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-secondary/30">
      <Toaster />
      {/* Admin header */}
      <header className="sticky top-0 z-40 glass border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Hammer className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="text-sm font-bold">Admin Dashboard</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">Oakland Carpenter</div>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={loadData} disabled={loading}>
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-3.5 w-3.5" /> View site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={onLogout}>
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {error && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Overview
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                icon={<Hammer className="h-4 w-4" />}
                label="Published listings"
                value={stats.listings.total}
                sub={`${stats.listings.verified} verified`}
              />
              <StatCard
                icon={<Clock className="h-4 w-4" />}
                label="Pending submissions"
                value={stats.submissions.pending}
                sub="Awaiting review"
                highlight={stats.submissions.pending > 0}
              />
              <StatCard
                icon={<BadgeCheck className="h-4 w-4" />}
                label="Approved (all time)"
                value={stats.submissions.approved}
              />
              <StatCard
                icon={<Crown className="h-4 w-4" />}
                label="Featured listings"
                value={stats.listings.featured}
                sub="Admin-curated"
              />
            </div>
          </section>
        )}

        {/* Pending submissions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Pending submissions ({submissions.length})
            </h2>
          </div>

          {submissions.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <BadgeCheck className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">
                  No pending submissions. When carpenters submit through the public form, they&apos;ll appear here for review.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <SubmissionCard
                  key={sub.id}
                  sub={sub}
                  onApprove={approve}
                  onReject={reject}
                />
              ))}
            </div>
          )}
        </section>

        {/* Top cities */}
        {stats && stats.topCities.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Top cities by listing count
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {stats.topCities.map((c) => (
                <Card key={c.city}>
                  <CardContent className="py-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-primary" /> {c.city}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{c.count} listings</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon, label, value, sub, highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "ring-1 ring-primary/30" : ""}>
      <CardContent className="py-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
      </CardContent>
    </Card>
  );
}

function SubmissionCard({
  sub, onApprove, onReject,
}: {
  sub: Submission;
  onApprove: (sub: Submission, verified: boolean, featured: boolean) => void;
  onReject: (sub: Submission) => void;
}) {
  const [verified, setVerified] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const submittedDate = new Date(sub.createdAt).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base">{sub.businessName}</h3>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {sub.city}{sub.county ? `, ${sub.county}` : ""}</span>
              <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {sub.phone}</span>
              <span>Submitted {submittedDate}</span>
            </div>
          </div>
          <Badge variant="secondary">{sub.primaryService}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {sub.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{sub.description}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {sub.services.split(",").map((s) => s.trim()).filter(Boolean).map((s) => (
            <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>
          ))}
        </div>

        {/* Expandable details */}
        {expanded && (
          <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-border text-sm">
            {sub.email && <DetailRow icon={<Mail className="h-3 w-3" />} label="Email" value={sub.email} />}
            {sub.website && <DetailRow icon={<ExternalLink className="h-3 w-3" />} label="Website" value={sub.website} />}
            {sub.address && <DetailRow icon={<MapPin className="h-3 w-3" />} label="Address" value={sub.address} />}
            {sub.licenseNumber && (
              <DetailRow
                icon={<FileText className="h-3 w-3" />}
                label={`CSLB License${sub.licenseClass ? ` (${sub.licenseClass})` : ""}`}
                value={sub.licenseNumber}
              />
            )}
            {sub.yearEstablished && <DetailRow icon={<TrendingUp className="h-3 w-3" />} label="Established" value={String(sub.yearEstablished)} />}
            {sub.ownerName && <DetailRow icon={<BadgeCheck className="h-3 w-3" />} label="Owner" value={sub.ownerName} />}
            {sub.licenseNumber && (
              <a
                href={`https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx?LicNum=${sub.licenseNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline inline-flex items-center gap-1 sm:col-span-2"
              >
                <ExternalLink className="h-3 w-3" /> Verify license #{sub.licenseNumber} on cslb.ca.gov
              </a>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-primary hover:underline"
        >
          {expanded ? "Hide details" : "Show full details"}
        </button>

        {/* Approve / Reject controls */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-border">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={verified} onCheckedChange={(v) => setVerified(v === true)} />
            <span>Verified (CSLB checked)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox checked={featured} onCheckedChange={(v) => setFeatured(v === true)} />
            <span>Featured (top placement)</span>
          </label>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onReject(sub)}>
              <X className="h-3.5 w-3.5" /> Reject
            </Button>
            <Button size="sm" onClick={() => onApprove(sub, verified, featured)}>
              <Check className="h-3.5 w-3.5" /> Approve &amp; publish
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-muted-foreground flex items-center gap-1">{icon} {label}</div>
      <div className="font-medium text-sm break-all">{value}</div>
    </div>
  );
}
