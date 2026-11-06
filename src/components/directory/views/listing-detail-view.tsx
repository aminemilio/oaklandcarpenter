"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft, Star, MapPin, Phone, Mail, Globe,
  BadgeCheck, Crown, Calendar, FileText, Wrench, Hammer, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Reveal } from "../reveal";
import { buildQuery } from "../types";
import type { Listing } from "../types";
import { servicesArray, yearsInBusiness, licenseLabel } from "@/lib/format";
import { imageForService } from "@/lib/images";

export function ListingDetailView({ id }: { id: string }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      try {
        const r = await fetch(`/api/listings?id=${encodeURIComponent(id)}`);
        if (!r.ok) {
          if (cancelled) return;
          setError("Listing not found");
          return;
        }
        const j = await r.json();
        if (cancelled) return;
        setListing(j.listing ?? null);
      } catch {
        if (!cancelled) setError("Could not load listing.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <Skeleton className="h-64 w-full rounded-xl mb-6" />
        <Skeleton className="h-10 w-96 mb-4" />
        <Skeleton className="h-4 w-64 mb-8" />
        <div className="grid md:grid-cols-3 gap-6">
          <Skeleton className="md:col-span-2 h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Hammer className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-display font-bold text-foreground">{error ?? "Listing not found"}</h1>
        <Button asChild className="mt-4">
          <Link href={`/${buildQuery({ view: "browse" })}`}>Browse all carpenters</Link>
        </Button>
      </div>
    );
  }

  const services = servicesArray(listing.services);
  const yib = yearsInBusiness(listing.yearEstablished);
  const license = licenseLabel(listing.licenseClass);
  const heroImage = imageForService(listing.primaryService, listing.businessName, listing.city);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: listing.businessName,
    description: listing.description,
    telephone: listing.phone,
    email: listing.email,
    url: listing.website,
    image: heroImage,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: "CA",
      addressCountry: "US",
      streetAddress: listing.address ?? undefined,
    },
    areaServed: { "@type": "State", name: "California" },
    foundingDate: listing.yearEstablished ? String(listing.yearEstablished) : undefined,
    aggregateRating: listing.reviewCount > 0 ? {
      "@type": "AggregateRating",
      ratingValue: listing.rating,
      reviewCount: listing.reviewCount,
    } : undefined,
    hasCredential: listing.licenseNumber ? {
      "@type": "EducationalOccupationalCredential",
      identifier: listing.licenseNumber,
      recognizedBy: "California Contractors State License Board",
    } : undefined,
    makesOffer: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: s },
    })),
  };

  return (
    <div>
      {/* JSON-LD inline */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image with overlay */}
      <section className="relative h-72 sm:h-80 lg:h-96 overflow-hidden">
        <img src={heroImage} alt={`${listing.businessName} project`} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />

        <div className="relative h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-7">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 text-xs text-white/80 mb-4 flex-wrap">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href={`/${buildQuery({ view: "city", city: listing.city })}`} className="hover:text-white">
              {listing.city}
            </Link>
            <span>/</span>
            <span className="text-white">{listing.businessName}</span>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {listing.featured && (
                  <Badge variant="default" className="bg-primary text-primary-foreground gap-1">
                    <Crown className="h-3 w-3" /> Featured
                  </Badge>
                )}
                {listing.verified && (
                  <Badge variant="secondary" className="bg-white/15 text-white border-0 backdrop-blur-sm gap-1">
                    <BadgeCheck className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                {listing.businessName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/90 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-amber-400" /> {listing.city}, {listing.county} County, CA
                </span>
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">{listing.rating.toFixed(1)}</span>
                  <span className="text-white/80">({listing.reviewCount} reviews)</span>
                </span>
                {yib && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" /> {yib}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href={`/${buildQuery({ view: "city", city: listing.city })}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ChevronLeft className="h-4 w-4" /> Back to {listing.city} carpenters
        </Link>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="md:col-span-2 space-y-6">
            <Reveal>
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-display font-semibold">About {listing.businessName}</h2>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card>
                <CardHeader>
                  <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-primary" /> Services offered
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <Link key={s} href={`/${buildQuery({ view: "browse", service: s })}`}>
                        <Badge variant="secondary" className="py-1.5 px-3 text-sm hover:bg-accent cursor-pointer">
                          {s}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Reveal>

            {listing.address && (
              <Reveal delay={0.15}>
                <Card>
                  <CardHeader>
                    <h2 className="text-lg font-display font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" /> Location
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/90">{listing.address}</p>
                    <p className="text-sm text-muted-foreground mt-1">{listing.city}, CA</p>
                  </CardContent>
                </Card>
              </Reveal>
            )}
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Reveal delay={0.05}>
              <Card className="border-primary/20">
                <CardHeader>
                  <h2 className="text-base font-display font-semibold">Contact</h2>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href={`tel:${listing.phone.replace(/[^0-9+]/g, "")}`} className="flex items-center gap-3 text-sm hover:text-primary group">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-[11px] text-muted-foreground">Phone</span>
                      <span className="font-medium text-foreground">{listing.phone}</span>
                    </span>
                  </a>
                  {listing.email && (
                    <a href={`mailto:${listing.email}`} className="flex items-center gap-3 text-sm hover:text-primary break-all group">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] text-muted-foreground">Email</span>
                        <span className="font-medium text-foreground break-all">{listing.email}</span>
                      </span>
                    </a>
                  )}
                  {listing.website && (
                    <a href={listing.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary break-all group">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Globe className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] text-muted-foreground">Website</span>
                        <span className="font-medium text-foreground break-all">
                          {listing.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                      </span>
                    </a>
                  )}
                </CardContent>
              </Card>
            </Reveal>

            {(listing.licenseNumber || listing.licenseClass) && (
              <Reveal delay={0.1}>
                <Card>
                  <CardHeader>
                    <h2 className="text-base font-display font-semibold flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" /> License
                    </h2>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {listing.licenseNumber && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">CSLB #</span>
                        <span className="font-mono font-medium text-foreground">{listing.licenseNumber}</span>
                      </div>
                    )}
                    {listing.licenseClass && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Class</span>
                        <span className="font-medium text-foreground text-right">{license}</span>
                      </div>
                    )}
                    {listing.licenseStatus && (
                      <div className="flex justify-between gap-2">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={listing.licenseStatus === "Active" ? "default" : "destructive"} className="text-[10px]">
                          {listing.licenseStatus}
                        </Badge>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <a
                      href={`https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx?LicNum=${listing.licenseNumber ?? ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Verify this license on cslb.ca.gov
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </CardContent>
                </Card>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <Card className="bg-secondary/40 border-dashed">
                <CardContent className="pt-6">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Always verify before hiring.</strong> Oakland Carpenter is an independent directory and is not affiliated with the CSLB. License status can change — confirm directly with the California Contractors State License Board before signing any contract.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
