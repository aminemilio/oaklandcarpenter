"use client";

import Link from "next/link";
import { ChevronLeft, Clock, ArrowRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ARTICLES } from "@/lib/articles";
import { buildQuery } from "../types";

const categoryColors: Record<string, string> = {
  "Hiring Guide": "bg-blue-100 text-blue-800",
  "Cost Guide": "bg-green-100 text-green-800",
  "Permits & Legal": "bg-amber-100 text-amber-800",
  "License Guide": "bg-purple-100 text-purple-800",
};

export function ResourcesView() {
  return (
    <div>
      {/* Hero strip */}
      <section className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/15 via-secondary to-background">
        <div className="relative h-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <Badge variant="secondary" className="mb-3 w-fit">
            <FileText className="h-3 w-3 mr-1" /> Resources
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Guides for California homeowners
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Practical guides on hiring licensed carpenters, understanding cabinet costs, deck permit requirements, and CSLB license classes in California.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Articles grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {ARTICLES.map((article) => (
            <Link
              key={article.slug}
              href={`/${buildQuery({ view: "article", slug: article.slug })}`}
              className="group block"
            >
              <Card className="h-full hover:border-primary/30 hover:shadow-md transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`${categoryColors[article.category] ?? "bg-secondary text-secondary-foreground"} text-[10px]`}
                      variant="secondary"
                    >
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {article.readTime}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <span className="text-xs text-muted-foreground">
                      Updated {article.lastUpdated}
                    </span>
                    <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">Ready to find a carpenter?</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Browse licensed carpenters across California, or list your own carpentry business for free.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href={`/${buildQuery({ view: "browse" })}`}>
              <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Browse carpenters <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
            <Link href={`/${buildQuery({ view: "submit" })}`}>
              <span className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent/50 transition-colors">
                List your business
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
