"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Filter, X, MapPin, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingCard } from "../listing-card";
import { buildQuery } from "../types";
import type { Listing, ServiceInfo, CityInfo } from "../types";

type Props = {
  initialQ?: string;
  initialService?: string;
  initialRegion?: string;
};

export function BrowseView({ initialQ = "", initialService = "", initialRegion = "" }: Props) {
  const [q, setQ] = useState(initialQ);
  const [service, setService] = useState(initialService);
  const [region, setRegion] = useState(initialRegion);
  const [sort, setSort] = useState("rating");
  const [listings, setListings] = useState<Listing[]>([]);
  const [total, setTotal] = useState(0);
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load services + cities for filters
  useEffect(() => {
    (async () => {
      const [sr, cr] = await Promise.all([
        fetch("/api/services"),
        fetch("/api/cities"),
      ]);
      setServices((await sr.json()).services ?? []);
      setCities((await cr.json()).cities ?? []);
    })();
  }, []);

  const regions = Array.from(new Set(cities.map((c) => c.region))).sort();

  // Load listings whenever filters change
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (service) params.set("service", service);
      if (region) params.set("region", region);
      params.set("limit", "100");
      try {
        const r = await fetch(`/api/listings?${params.toString()}`);
        const j = await r.json();
        if (cancelled) return;
        let list: Listing[] = j.listings ?? [];
        // Client-side sort (the API already sorts featured then rating)
        if (sort === "name") {
          list = [...list].sort((a, b) => a.businessName.localeCompare(b.businessName));
        } else if (sort === "reviewCount") {
          list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        } else if (sort === "rating") {
          list = [...list].sort((a, b) => b.rating - a.rating);
        }
        setListings(list);
        setTotal(j.total ?? 0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [q, service, region, sort]);

  const clearFilters = () => {
    setQ("");
    setService("");
    setRegion("");
  };

  const hasFilters = q || service || region;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4">
        <ChevronLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="flex flex-col gap-1 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Browse all carpenters</h1>
        <p className="text-sm text-muted-foreground">
          {loading ? "Loading…" : `${total} carpenter ${total === 1 ? "listing" : "listings"} found across California`}
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto] mb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, service, city…"
            className="pl-9"
            aria-label="Search carpenters"
          />
        </div>
        <Select value={service || "all"} onValueChange={(v) => setService(v === "all" ? "" : v)}>
          <SelectTrigger className="w-full md:w-52">
            <SelectValue placeholder="All services" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {services.map((s) => (
              <SelectItem key={s.name} value={s.name}>
                {s.name} ({s.count})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={region || "all"} onValueChange={(v) => setRegion(v === "all" ? "" : v)}>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="All regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All regions</SelectItem>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>{r}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Sort: Top rated</SelectItem>
            <SelectItem value="reviewCount">Sort: Most reviewed</SelectItem>
            <SelectItem value="name">Sort: Name A–Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active filters */}
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Filter className="h-3 w-3" /> Active filters:
          </span>
          {q && (
            <Badge variant="secondary" className="gap-1">
              “{q}”
              <button onClick={() => setQ("")} aria-label="Clear search"><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {service && (
            <Badge variant="secondary" className="gap-1">
              {service}
              <button onClick={() => setService("")} aria-label="Clear service"><X className="h-3 w-3" /></button>
            </Badge>
          )}
          {region && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="h-3 w-3" /> {region}
              <button onClick={() => setRegion("")} aria-label="Clear region"><X className="h-3 w-3" /></button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
            Clear all
          </Button>
        </div>
      )}

      {/* Results */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-56 w-full rounded-lg" />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-base font-medium text-foreground">No carpenters match your filters.</p>
          <p className="text-sm text-muted-foreground mt-1">Try clearing some filters or searching a different city.</p>
          <Button onClick={clearFilters} className="mt-4" variant="outline">Clear filters</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}

      {/* Suggest a city */}
      {!loading && listings.length > 0 && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          Don&apos;t see your city? <Link href={`/${buildQuery({ view: "submit" })}`} className="text-primary hover:underline">Add your business</Link> and we&apos;ll add the city page.
        </div>
      )}
    </div>
  );
}
