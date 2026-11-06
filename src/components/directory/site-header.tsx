"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Hammer, Search, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildQuery } from "./types";

export function SiteHeader({
  totalListings,
  totalCities,
}: {
  totalListings?: number;
  totalCities?: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();
  // Initialize q as empty string — don't read sp during initial render to
  // avoid hydration mismatch (sp is empty on server, has values on client).
  // Update q from sp after mount.
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // After mount: read search params + set up scroll listener
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setQ(sp.get("q") ?? "");
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sp]);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const target = q.trim()
      ? `/${buildQuery({ view: "browse", q: q.trim() })}`
      : `/${buildQuery({ view: "browse" })}`;
    router.push(target);
    setMobileOpen(false);
  };

  const navLink = (label: string, params: Record<string, string | undefined>) => {
    const href = `/${buildQuery(params)}`;
    // Only compute active state after mount — sp is empty on server during
    // SSR, so isActive would differ between server and client.
    const isActive = mounted && sp.get("view") === params.view && (!params.city || sp.get("city") === params.city);
    return (
      <Link
        href={href}
        className={`relative text-sm font-medium transition-colors group ${
          isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        {label}
        <span
          className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-300 ${
            isActive ? "w-full" : "w-0 group-hover:w-full"
          }`}
        />
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/60 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Hammer className="h-5 w-5" aria-hidden />
            <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-primary-foreground/20" />
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

        {/* Desktop search */}
        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-md mx-2">
          <div className="relative w-full group">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search carpenters, cities, services…"
              className="pl-9 h-10 bg-background/70 border-border/60 focus-visible:bg-background transition-colors"
              aria-label="Search the directory"
            />
          </div>
          <Button type="submit" className="ml-2 h-10" aria-label="Search">
            Search
          </Button>
        </form>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-auto">
          {navLink("Browse", { view: "browse" })}
          {navLink("Cities", { view: "home" })}
          {navLink("Guides", { view: "resources" })}
          {navLink("About", { view: "about" })}
          <Button asChild size="sm" className="h-9 shadow-sm">
            <Link href={`/${buildQuery({ view: "submit" })}`} onClick={() => setMobileOpen(false)}>
              List your business
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className="ml-auto md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-t border-border/60">
          <div className="mx-auto max-w-7xl px-4 py-4 space-y-3">
            <form onSubmit={onSearch} className="flex">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="pl-9"
                  aria-label="Search the directory"
                />
              </div>
              <Button type="submit" className="ml-2" aria-label="Search">Go</Button>
            </form>
            <div className="flex flex-col gap-3 pt-2">
              {navLink("Browse all", { view: "browse" })}
              {navLink("Cities", { view: "home" })}
              {navLink("Guides", { view: "resources" })}
              {navLink("About", { view: "about" })}
              <Button asChild size="sm" className="w-full">
                <Link href={`/${buildQuery({ view: "submit" })}`} onClick={() => setMobileOpen(false)}>
                  List your business
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats strip — only on hero / non-scrolled state */}
      {!scrolled && (totalListings !== undefined || totalCities !== undefined) && (
        <div className="hidden md:block border-t border-border/40 bg-secondary/40 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1.5 text-xs text-muted-foreground flex items-center gap-4">
            {totalListings !== undefined && (
              <span>
                <span className="font-semibold text-foreground">{totalListings}</span> carpenter listings
              </span>
            )}
            {totalCities !== undefined && (
              <span>
                across <span className="font-semibold text-foreground">{totalCities}</span> California cities
              </span>
            )}
            <span className="ml-auto">Free to list · Licensed contractors verified against CSLB</span>
          </div>
        </div>
      )}
    </header>
  );
}
