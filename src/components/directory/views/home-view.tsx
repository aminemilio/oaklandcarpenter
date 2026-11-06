"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Search, MapPin, Hammer, Crown, BadgeCheck, ArrowRight,
  Wrench, Building2, Star, ShieldCheck, Sparkles, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ListingCard } from "../listing-card";
import { Reveal, RevealStagger, RevealItem } from "../reveal";
import { buildQuery } from "../types";
import { HERO_IMAGE, TOOLS_IMAGE, FINISHED_HOME_IMAGE, imageForService } from "@/lib/images";
import type { CityInfo, Listing, ServiceInfo } from "../types";

export function HomeView() {
  const [featured, setFeatured] = useState<Listing[]>([]);
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [byRegion, setByRegion] = useState<Record<string, CityInfo[]>>({});
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [totalListings, setTotalListings] = useState(0);
  const [totalCities, setTotalCities] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [fr, cr, sr] = await Promise.all([
          fetch("/api/listings?featured=true&limit=6"),
          fetch("/api/cities"),
          fetch("/api/services"),
        ]);
        const fjson = await fr.json();
        const cjson = await cr.json();
        const sjson = await sr.json();
        if (cancelled) return;
        setFeatured(fjson.listings ?? []);
        setCities(cjson.cities ?? []);
        setByRegion(cjson.byRegion ?? {});
        setTotalListings(cjson.totalListings ?? 0);
        setTotalCities(cjson.totalCities ?? 0);
        setServices(sjson.services ?? []);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = q.trim()
      ? `/${buildQuery({ view: "browse", q: q.trim() })}`
      : `/${buildQuery({ view: "browse" })}`;
  };

  // Service image mapping for the visual service grid — each service gets a unique image
  const serviceImage = (s: string): string => {
    return imageForService(s);
  };

  return (
    <div>
      {/* ========== HERO — full-bleed image with overlay + glass search ========== */}
      <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Carpenter working with hand tools in a workshop"
            className="h-full w-full object-cover"
          />
          {/* Multi-stop gradient for legibility — darker on left where text sits */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
            {/* Left: headline + search */}
            <div className="text-white">
              <Reveal>
                <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium text-white mb-6">
                  <MapPin className="h-3 w-3 text-amber-400" />
                  <span>California · {totalCities || "15"} cities · {totalListings || "—"} listings</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] text-balance">
                  Find a licensed carpenter <br className="hidden sm:block" />
                  <span className="text-amber-400">anywhere in California.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="mt-6 text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
                  Browse custom cabinet makers, deck builders, framing contractors, and finish carpenters in Oakland, San Francisco, Los Angeles, San Diego, Sacramento, Fresno and 10+ more California cities.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <form onSubmit={onSearch} className="mt-8 flex max-w-xl">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Try “custom cabinets Oakland” or “deck builder LA”…"
                      className="pl-12 h-14 text-base bg-white shadow-xl border-0"
                      aria-label="Search for carpenters"
                    />
                  </div>
                  <Button type="submit" size="lg" className="ml-2 h-14 px-6 shadow-xl">
                    Search
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </form>
              </Reveal>

              {/* Trust strip */}
              <Reveal delay={0.4}>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-white/80">
                  <span className="flex items-center gap-1.5">
                    <BadgeCheck className="h-4 w-4 text-amber-400" /> CSLB license verification
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Building2 className="h-4 w-4 text-amber-400" /> Free to list your business
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Hammer className="h-4 w-4 text-amber-400" /> Carpentry-only, California-only
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Right: floating featured card (desktop only) */}
            <div className="hidden lg:block">
              <Reveal delay={0.5}>
                {featured[0] && <FloatingFeaturedCard listing={featured[0]} />}
              </Reveal>
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* ========== FEATURED CARPENTERS ========== */}
        <section>
          <Reveal>
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                  <Crown className="h-3.5 w-3.5" />
                  <span>Featured</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                  Top-rated California carpenters
                </h2>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                  CSLB-verified carpentry businesses across the state. Featured listings are admin-curated based on review quality and CSLB license standing — never paid placement.
                </p>
              </div>
              <Link
                href={`/${buildQuery({ view: "browse" })}`}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
              >
                Browse all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </Reveal>

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-xl" />
              ))}
            </div>
          ) : featured.length === 0 ? (
            <p className="text-sm text-muted-foreground">No featured listings yet.</p>
          ) : (
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((l) => (
                <RevealItem key={l.id}>
                  <ListingCard listing={l} />
                </RevealItem>
              ))}
            </RevealStagger>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link href={`/${buildQuery({ view: "browse" })}`}>
                Browse all carpenters <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* ========== BROWSE BY SERVICE — image cards ========== */}
        <section>
          <Reveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                <Wrench className="h-3.5 w-3.5" />
                <span>Services</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Browse by service
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                Every carpentry trade, from framing to fine cabinetry. Pick a service to see specialists across California.
              </p>
            </div>
          </Reveal>

          {loading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : (
            <RevealStagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s) => (
                <RevealItem key={s.name}>
                  <Link
                    href={`/${buildQuery({ view: "browse", service: s.name })}`}
                    className="group relative block h-44 rounded-xl overflow-hidden ring-1 ring-border hover:ring-primary/40 transition-all"
                  >
                    <img
                      src={serviceImage(s.name)}
                      alt={`${s.name} example`}
                      className="img-zoom absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                      <div className="flex items-end justify-between gap-2">
                        <div>
                          <h3 className="font-display font-bold text-lg leading-tight group-hover:text-amber-200 transition-colors">
                            {s.name}
                          </h3>
                          <p className="text-xs text-white/80 mt-1">{s.count} carpenter{s.count === 1 ? "" : "s"} listed</p>
                        </div>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full glass-dark group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealStagger>
          )}

          {/* Remaining services as chips */}
          {services.length > 6 && (
            <Reveal delay={0.2}>
              <div className="mt-5 flex flex-wrap gap-2">
                {services.slice(6).map((s) => (
                  <Link
                    key={s.name}
                    href={`/${buildQuery({ view: "browse", service: s.name })}`}
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card hover:border-primary/40 hover:bg-accent/50 text-sm transition-all"
                  >
                    <Wrench className="h-3.5 w-3.5 text-primary" />
                    <span className="text-foreground">{s.name}</span>
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{s.count}</Badge>
                  </Link>
                ))}
              </div>
            </Reveal>
          )}
        </section>

        {/* ========== BROWSE BY CITY ========== */}
        <section>
          <Reveal>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>Cities</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                Browse by city
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
                California cities served by the directory. Oakland is our home base — listings there are the densest.
              </p>
            </div>
          </Reveal>

          {loading ? (
            <Skeleton className="h-64 w-full rounded-xl" />
          ) : (
            <div className="space-y-8">
              {Object.entries(byRegion).map(([region, regionCities]) => (
                <Reveal key={region}>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-4 border-b border-border pb-2">
                      {region}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {regionCities.map((c) => (
                        <Link
                          key={c.city}
                          href={`/${buildQuery({ view: "city", city: c.city })}`}
                          className="group flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary/30 hover:bg-accent/40 transition-all"
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4 text-primary shrink-0" />
                              <span className="font-display font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                {c.city}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5 ml-5.5">{c.county} County</p>
                          </div>
                          <div className="text-right ml-2 shrink-0 flex items-center gap-1">
                            <span className="text-sm font-bold text-foreground">{c.listingCount}</span>
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </section>

        {/* ========== HOW IT WORKS ========== */}
        <section className="relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>How it works</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground tracking-tight">
                From search to verified contractor
              </h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Three steps. No paywall, no lead fees, no commission on the job you book.
              </p>
            </div>
          </Reveal>

          <RevealStagger className="grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: Search,
                title: "Search by city or service",
                body: "Filter by your California city, your county, or the specific carpentry service you need. Long-tail results the big directories miss.",
              },
              {
                n: "02",
                icon: BadgeCheck,
                title: "Check the Verified badge",
                body: "Every listing with a license number has been cross-checked against the public CSLB database. Click \"Verify on cslb.ca.gov\" for the latest status.",
              },
              {
                n: "03",
                icon: Hammer,
                title: "Contact the carpenter directly",
                body: "Call, email, or visit their website. No middleman, no lead fee, no commission. You and the carpenter work it out.",
              },
            ].map((step) => (
              <RevealItem key={step.n}>
                <Card className="h-full border-border bg-card hover:border-primary/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <span className="font-display text-3xl font-bold text-primary/20">{step.n}</span>
                    </div>
                    <h3 className="font-display font-semibold text-base text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                  </CardContent>
                </Card>
              </RevealItem>
            ))}
          </RevealStagger>
        </section>

        {/* ========== CTA — full-bleed image background ========== */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0">
            <img
              src={TOOLS_IMAGE}
              alt="Carpentry tools on a workbench"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />
          </div>
          <div className="relative p-8 sm:p-12 lg:p-16 text-white max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium text-white mb-5">
                <Hammer className="h-3 w-3 text-amber-400" /> For California carpenters
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold tracking-tight text-balance">
                Are you a California carpenter?
              </h2>
              <p className="mt-3 text-base sm:text-lg text-white/85 max-w-lg">
                List your business for free. Get found by homeowners searching for &quot;carpenter near me&quot; in your city. No commission, no lead fees.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href={`/${buildQuery({ view: "submit" })}`}>
                    List your business — free
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white/10 hover:text-white">
                  <Link href={`/${buildQuery({ view: "about" })}`}>
                    How it works
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/75">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Free forever
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="h-3.5 w-3.5 text-amber-400" /> No commission on jobs
                </span>
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="h-3.5 w-3.5 text-amber-400" /> CSLB verification included
                </span>
              </div>
            </Reveal>
          </div>
        </section>
      </div>
    </div>
  );
}

// Floating featured card shown in the hero on desktop.
function FloatingFeaturedCard({ listing }: { listing: Listing }) {
  const href = `/${buildQuery({ view: "listing", id: listing.id })}`;
  const image = imageForService(listing.primaryService, listing.businessName, listing.city);
  return (
    <Link href={href} className="group block">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/15">
        <div className="relative h-56">
          <img
            src={image}
            alt={`${listing.businessName} project`}
            className="img-zoom absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-lg">
            <Crown className="h-3 w-3" /> Featured
          </div>

          <div className="absolute bottom-0 inset-x-0 p-5 text-white">
            <div className="flex items-center gap-1 text-[10px] text-white/80 mb-1">
              <MapPin className="h-3 w-3" /> {listing.city}, CA
            </div>
            <h3 className="font-display font-bold text-lg leading-tight group-hover:text-amber-200 transition-colors">
              {listing.businessName}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                <span className="text-white/70">({listing.reviewCount})</span>
              </span>
              {listing.verified && (
                <span className="inline-flex items-center gap-1 rounded-full glass-dark px-2 py-0.5 text-[10px] text-white">
                  <BadgeCheck className="h-3 w-3 text-amber-400" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-3 flex items-center justify-between">
          <span className="text-xs text-muted-foreground truncate">{listing.primaryService}</span>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary group-hover:gap-2 transition-all">
            View <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
