"use client";

import Link from "next/link";
import { Star, MapPin, Phone, BadgeCheck, Crown, Hammer, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Listing } from "./types";
import { buildQuery } from "./types";
import { servicesArray, yearsInBusiness } from "@/lib/format";
import { imageForService } from "@/lib/images";

export function ListingCard({ listing }: { listing: Listing }) {
  const href = `/${buildQuery({ view: "listing", id: listing.id })}`;
  const services = servicesArray(listing.services).slice(0, 3);
  const extraServices = servicesArray(listing.services).length - services.length;
  const yib = yearsInBusiness(listing.yearEstablished);
  const image = imageForService(listing.primaryService, listing.businessName, listing.city);

  // Featured cards: image header + glass overlay + Crown badge
  if (listing.featured) {
    return (
      <Card className="group relative overflow-hidden ring-1 ring-primary/30 hover:ring-primary/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 p-0 gap-0">
        {/* Image header */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={`${listing.businessName} — ${listing.primaryService} project example`}
            className="img-zoom absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Featured badge */}
          <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-lg">
            <Crown className="h-3 w-3" /> Featured
          </div>

          {/* Verified badge */}
          {listing.verified && (
            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full glass-dark px-2.5 py-1 text-[10px] font-medium text-white shadow-lg">
              <BadgeCheck className="h-3 w-3" /> Verified
            </div>
          )}

          {/* City overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div className="text-white">
              <Link href={href} className="block">
                <h3 className="font-display font-bold text-base leading-tight drop-shadow-md group-hover:text-amber-200 transition-colors">
                  {listing.businessName}
                </h3>
              </Link>
              <div className="flex items-center gap-1 text-[11px] text-white/85 mt-0.5">
                <MapPin className="h-3 w-3" />
                <span>{listing.city}, {listing.county} County</span>
              </div>
            </div>
            <div className="flex items-center gap-1 rounded-full glass-dark px-2 py-1 text-[10px] text-white shadow">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{listing.rating.toFixed(1)}</span>
              <span className="text-white/70">({listing.reviewCount})</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <CardContent className="p-4 space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{listing.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {services.map((s) => (
              <Badge key={s} variant="secondary" className="text-[10px] py-0 px-1.5 font-medium">{s}</Badge>
            ))}
            {extraServices > 0 && (
              <Badge variant="outline" className="text-[10px] py-0 px-1.5">+{extraServices}</Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/60">
            {yib && <span className="text-[11px] text-muted-foreground">{yib}</span>}
            <Button asChild size="sm" variant="default" className="ml-auto h-8">
              <Link href={href}>
                View profile
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Regular card: clean, image-less, refined
  return (
    <Card className="group hover:border-primary/30 hover:shadow-md transition-all duration-300 p-0 gap-0">
      <CardContent className="p-5 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <Link href={href} className="block flex-1 min-w-0">
              <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                {listing.businessName}
              </h3>
            </Link>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <Hammer className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{listing.city}, {listing.county} County</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{listing.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {services.map((s) => (
            <Badge key={s} variant="secondary" className="text-[10px] py-0 px-1.5 font-medium">{s}</Badge>
          ))}
          {extraServices > 0 && (
            <Badge variant="outline" className="text-[10px] py-0 px-1.5">+{extraServices}</Badge>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-foreground">{listing.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">({listing.reviewCount})</span>
            </span>
            {listing.verified && (
              <span className="flex items-center gap-1 text-primary font-medium">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified
              </span>
            )}
          </div>
          <Button asChild size="sm" variant="ghost" className="h-7 text-xs">
            <Link href={href}>
              View
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Compact row variant
export function ListingRow({ listing }: { listing: Listing }) {
  const href = `/${buildQuery({ view: "listing", id: listing.id })}`;
  return (
    <Link
      href={href}
      className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors border border-transparent hover:border-border"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Hammer className="h-5 w-5" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-display font-semibold text-sm text-foreground truncate">{listing.businessName}</h4>
          {listing.featured && (
            <Badge variant="default" className="text-[10px] py-0 px-1.5">Featured</Badge>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {listing.city}
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> {listing.rating.toFixed(1)} ({listing.reviewCount})
          </span>
        </div>
      </div>
      <span className="text-xs text-muted-foreground hidden md:flex items-center gap-1">
        <Phone className="h-3 w-3" /> {listing.phone}
      </span>
    </Link>
  );
}
