"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, ChevronLeft, Hammer, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ListingCard } from "../listing-card";
import { Reveal, RevealStagger, RevealItem } from "../reveal";
import { buildQuery } from "../types";
import { imageForCity } from "@/lib/images";
import type { Listing } from "../types";

export function CityView({ city }: { city: string }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(`/api/listings?city=${encodeURIComponent(city)}&limit=100`);
        if (!r.ok) throw new Error("Failed to load");
        const j = await r.json();
        if (cancelled) return;
        setListings(j.listings ?? []);
      } catch {
        if (!cancelled) setError("Could not load listings for this city.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city]);

  const featured = listings.filter((l) => l.featured);
  const regular = listings.filter((l) => !l.featured);
  const heroImage = imageForCity(city);
  const county = listings[0]?.county;
  const region = listings[0]?.region;
  const description = `Browse ${listings.length || ""} licensed carpenter${listings.length === 1 ? "" : "s"} in ${city}, California. Find custom cabinet makers, deck builders, framing contractors, finish carpenters, and other woodworking professionals serving ${city} and the surrounding area. Every listing is checked against the California Contractors State License Board (CSLB).`;

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-64 w-full rounded-xl mb-6" />
        <Skeleton className="h-10 w-80 mb-3" />
        <Skeleton className="h-4 w-full max-w-3xl mb-6" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="text-base font-medium text-foreground">{error}</p>
        <Button asChild className="mt-4" variant="outline">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <>
        {/* Hero banner — even for empty city */}
        <section className="relative h-56 sm:h-64 overflow-hidden">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-black/55" />
          <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
            <Link href="/" className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white mb-2 w-fit">
              <ChevronLeft className="h-3.5 w-3.5" /> All cities
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {city}, California
            </h1>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <Hammer className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <h1 className="text-2xl font-display font-bold text-foreground">No carpenters listed in {city} yet</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
            We don&apos;t have any carpenter listings in {city}, California yet. If you&apos;re a carpenter based here, list your business for free and be the first.
          </p>
          <Button asChild className="mt-6">
            <Link href={`/${buildQuery({ view: "submit", city })}`}>
              List your business — free
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </>
    );
  }

  return (
    <div>
      {/* Hero banner */}
      <section className="relative h-64 sm:h-72 lg:h-80 overflow-hidden">
        <img src={heroImage} alt={`${city} carpentry`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> All cities
          </Link>

          <div className="flex items-center gap-2 text-xs text-white/85 mb-2">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            <span>{county} County · {region}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Carpenters in {city}, California
          </h1>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white/15 text-white border-0 backdrop-blur-sm">
              <Hammer className="h-3 w-3 mr-1" /> {listings.length} {listings.length === 1 ? "carpenter" : "carpenters"}
            </Badge>
            {featured.length > 0 && (
              <Badge variant="default" className="bg-primary text-primary-foreground">
                <Crown className="h-3 w-3 mr-1" /> {featured.length} featured
              </Badge>
            )}
            <Button asChild size="sm" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link href={`/${buildQuery({ view: "submit", city })}`}>Add a {city} carpenter</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Reveal>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mb-10 leading-relaxed">
            {description}
          </p>
        </Reveal>

        {featured.length > 0 && (
          <section className="mb-12">
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">
                Featured carpenters in {city}
              </h2>
            </Reveal>
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((l) => (
                <RevealItem key={l.id}>
                  <ListingCard listing={l} />
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
        )}

        {regular.length > 0 && (
          <section>
            {featured.length > 0 && (
              <Reveal>
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground mb-5">
                  All {city} carpenters
                </h2>
              </Reveal>
            )}
            <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regular.map((l) => (
                <RevealItem key={l.id}>
                  <ListingCard listing={l} />
                </RevealItem>
              ))}
            </RevealStagger>
          </section>
        )}
      </div>
    </div>
  );
}
