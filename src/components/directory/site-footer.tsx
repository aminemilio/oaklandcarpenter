"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Hammer, ArrowRight, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildQuery } from "./types";

export function SiteFooter() {
  // Use a fixed initial year (current year at build/render time) to avoid
  // hydration mismatches when server and client are in different timezones.
  // The year is updated after mount if needed.
  const [year, setYear] = useState(2026);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    // Visual-only for MVP — would POST to /api/subscribe in production
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="mt-auto border-t border-border bg-secondary/30">
      {/* Newsletter band */}
      <div className="border-b border-border/60 bg-gradient-to-r from-secondary/40 via-background to-secondary/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-6 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-xl font-display font-semibold text-foreground">
                Get the California carpenter newsletter
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                Monthly: new carpenter listings in your city, local CSLB compliance updates, and seasonal hiring tips. No spam.
              </p>
            </div>
            {subscribed ? (
              <div className="flex items-center gap-2 text-sm text-primary md:justify-end">
                <CheckCircle2 className="h-5 w-5" />
                <span>You&apos;re subscribed. Watch your inbox.</span>
              </div>
            ) : (
              <form onSubmit={onSubscribe} className="flex gap-2 md:justify-end">
                <div className="relative flex-1 max-w-sm">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="pl-9 bg-background"
                    aria-label="Email address"
                    required
                  />
                </div>
                <Button type="submit">
                  Subscribe
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                <Hammer className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[15px] font-bold tracking-tight text-foreground">
                  Oakland Carpenter
                </span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-0.5">
                  California Directory
                </span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              California&apos;s carpentry directory. Find licensed carpenters, cabinet makers, deck builders, and finish carpenters across the state — from Oakland to San Diego.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5" />
                CSLB verification active
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-background px-2.5 py-1">
                Free to list
              </span>
            </div>
          </div>

          {/* Browse */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground mb-4">
              Browse
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={`/${buildQuery({ view: "browse" })}`} className="text-muted-foreground hover:text-primary transition-colors">All listings</Link></li>
              <li><Link href={`/${buildQuery({ view: "city", city: "Oakland" })}`} className="text-muted-foreground hover:text-primary transition-colors">Oakland carpenters</Link></li>
              <li><Link href={`/${buildQuery({ view: "city", city: "San Francisco" })}`} className="text-muted-foreground hover:text-primary transition-colors">San Francisco carpenters</Link></li>
              <li><Link href={`/${buildQuery({ view: "city", city: "Los Angeles" })}`} className="text-muted-foreground hover:text-primary transition-colors">Los Angeles carpenters</Link></li>
              <li><Link href={`/${buildQuery({ view: "city", city: "San Diego" })}`} className="text-muted-foreground hover:text-primary transition-colors">San Diego carpenters</Link></li>
              <li><Link href={`/${buildQuery({ view: "browse", service: "Custom Cabinets" })}`} className="text-muted-foreground hover:text-primary transition-colors">Custom cabinet makers</Link></li>
            </ul>
          </div>

          {/* For carpenters */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground mb-4">
              For carpenters
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={`/${buildQuery({ view: "submit" })}`} className="text-muted-foreground hover:text-primary transition-colors">List your business — free</Link></li>
              <li><Link href={`/${buildQuery({ view: "about" })}`} className="text-muted-foreground hover:text-primary transition-colors">How verification works</Link></li>
              <li><a href="https://www.cslb.ca.gov/Resources/StudyGuides/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">CSLB license study guide ↗</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-foreground mb-4">
              Guides
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href={`/${buildQuery({ view: "resources" })}`} className="text-muted-foreground hover:text-primary transition-colors">All guides</Link></li>
              <li><Link href={`/${buildQuery({ view: "article", slug: "how-to-hire-carpenter-california" })}`} className="text-muted-foreground hover:text-primary transition-colors">How to hire a carpenter</Link></li>
              <li><Link href={`/${buildQuery({ view: "article", slug: "custom-cabinets-cost-california" })}`} className="text-muted-foreground hover:text-primary transition-colors">Custom cabinets cost</Link></li>
              <li><Link href={`/${buildQuery({ view: "article", slug: "deck-building-permit-california" })}`} className="text-muted-foreground hover:text-primary transition-colors">Deck permit guide</Link></li>
              <li><Link href={`/${buildQuery({ view: "article", slug: "california-contractor-license-classes" })}`} className="text-muted-foreground hover:text-primary transition-colors">License classes explained</Link></li>
              <li><Link href={`/${buildQuery({ view: "about" })}`} className="text-muted-foreground hover:text-primary transition-colors">About the directory</Link></li>
              <li><a href="https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Verify a CSLB license ↗</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Oakland Carpenter. Independent directory. Not affiliated with the California Contractors State License Board.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href={`/${buildQuery({ view: "about" })}`} className="hover:text-primary">Privacy</Link>
            <Link href={`/${buildQuery({ view: "about" })}`} className="hover:text-primary">Terms</Link>
            <Link href={`/${buildQuery({ view: "about" })}`} className="hover:text-primary">Verification policy</Link>
          </div>
        </div>

        {/* Legal disclaimer */}
        <p className="mt-6 text-[11px] text-muted-foreground/80 leading-relaxed max-w-3xl">
          Listings marked &quot;Verified&quot; have had their license number checked against the public CSLB database at the time of listing. License status can change — re-verify directly with the CSLB before signing any contract. Oakland Carpenter does not endorse or guarantee the work of any listed business.
        </p>

        {/* Photography credit */}
        <p className="mt-4 text-[11px] text-muted-foreground/60">
          Photography by <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Pexels</a> — free for commercial use under the Pexels License.
        </p>
      </div>
    </footer>
  );
}
