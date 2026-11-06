"use client";

import Link from "next/link";
import { ChevronLeft, BadgeCheck, Search, Hammer, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildQuery } from "../types";

export function AboutView() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="h-4 w-4" /> Back to home
      </Link>

      <Badge variant="secondary" className="mb-3">About</Badge>
      <h1 className="text-3xl font-bold text-foreground">About Oakland Carpenter</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        A focused, California-only directory for licensed carpenters — built to help homeowners find the right carpentry business and to help carpenters get found without paying lead-generation fees.
      </p>

      <div className="prose-stone mt-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Why a niche carpenter directory?</h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Yelp, Angi, HomeAdvisor, and Thumbtack are great at broad coverage, but they&apos;re not focused on carpentry. They also charge carpenters for leads — sometimes $50–$200 per lead, regardless of whether the job is booked. That model pushes prices up for everyone.
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed mt-3">
            Oakland Carpenter is different. Listings are free. We make money only from optional Featured upgrades. We focus on one trade (carpentry) in one state (California), so every page is built to rank for &quot;carpenter in [your city]&quot; — the search homeowners actually type.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
            <BadgeCheck className="h-5 w-5 text-primary" /> How verification works
          </h2>
          <div className="space-y-3">
            <Card className="border-border">
              <CardContent className="pt-5 flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-bold">1</span>
                <div>
                  <h3 className="text-sm font-semibold">Carpenter submits listing</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    The carpenter fills out the free submission form, including their CSLB license number and license class.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-5 flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-bold">2</span>
                <div>
                  <h3 className="text-sm font-semibold">Admin checks CSLB</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    We look up the license number on the public <a href="https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CSLB Check a License</a> tool. We confirm: license is active, business name matches, class matches the services offered.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-5 flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-bold">3</span>
                <div>
                  <h3 className="text-sm font-semibold">Verified badge or rejection</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    If the license checks out, the listing is published with the Verified badge. If not, we reject the listing and email the carpenter with the reason.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="pt-5 flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-sm font-bold">4</span>
                <div>
                  <h3 className="text-sm font-semibold">Homeowners re-verify</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Every listing page links directly to the CSLB license record so homeowners can re-verify before hiring. License status can change, so the Verified badge reflects the status at the time of listing — not a guarantee.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Why homeowners use this directory</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-5">
                <Search className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold">Find carpenters by city</h3>
                <p className="text-xs text-muted-foreground mt-1">Search by city, region, or service. Long-tail results big directories miss.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <ShieldCheck className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold">CSLB-verified listings</h3>
                <p className="text-xs text-muted-foreground mt-1">Every listing with a license number is checked against the public CSLB database.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <Wrench className="h-5 w-5 text-primary mb-2" />
                <h3 className="text-sm font-semibold">Carpentry-only</h3>
                <p className="text-xs text-muted-foreground mt-1">No electricians, no plumbers, no roofers. Just carpenters, cabinet makers, and woodworkers.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">A note on Oakland</h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            The directory started in Oakland — our home base. Oakland has the deepest coverage today. As more California carpenters list their businesses, the directory expands city by city. Oakland is in the name, but every California carpenter is welcome here.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-2">Contact</h2>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Questions, corrections, or takedown requests? Email <a href="mailto:hello@oaklandcarpenter.com" className="text-primary hover:underline">hello@oaklandcarpenter.com</a>. We respond within 3 business days.
          </p>
        </section>

        <div className="rounded-lg border border-border bg-secondary/40 p-6 text-center">
          <Hammer className="h-8 w-8 mx-auto text-primary mb-3" />
          <h2 className="text-lg font-semibold">Ready to list your business?</h2>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Free forever. CSLB-verified. No commission.</p>
          <Button asChild>
            <Link href={`/${buildQuery({ view: "submit" })}`}>List your carpentry business</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
