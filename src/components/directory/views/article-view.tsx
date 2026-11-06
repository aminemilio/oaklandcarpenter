"use client";

import Link from "next/link";
import {
  ChevronLeft, Clock, ArrowRight, FileText, AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles";
import { buildQuery } from "../types";

const categoryColors: Record<string, string> = {
  "Hiring Guide": "bg-blue-100 text-blue-800",
  "Cost Guide": "bg-green-100 text-green-800",
  "Permits & Legal": "bg-amber-100 text-amber-800",
  "License Guide": "bg-purple-100 text-purple-800",
};

export function ArticleView({ slug }: { slug: string }) {
  // Article lookup is synchronous (static data) — no useEffect needed
  const article = getArticleBySlug(slug);
  const related = article ? getRelatedArticles(slug, 3) : [];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Article not found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The article you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href={`/${buildQuery({ view: "resources" })}`}>Browse all guides</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero strip */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary to-background border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
          <Link href={`/${buildQuery({ view: "resources" })}`} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-4">
            <ChevronLeft className="h-3.5 w-3.5" /> All guides
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <Badge
              className={`${categoryColors[article.category] ?? "bg-secondary text-secondary-foreground"} text-[10px]`}
              variant="secondary"
            >
              {article.category}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> {article.readTime}
            </span>
            <span className="text-xs text-muted-foreground">Updated {article.lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
            {article.title}
          </h1>
          <p className="mt-3 text-base text-muted-foreground max-w-2xl">
            {article.description}
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Content sections */}
        <div className="space-y-8">
          {article.content.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-foreground mb-3 tracking-tight">
                {section.heading}
              </h2>
              <div className="space-y-3">
                {section.body.map((para, j) => (
                  <p key={j} className="text-sm sm:text-base text-foreground/85 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-4 space-y-2">
                  {section.list.map((item, k) => (
                    <li key={k} className="flex items-start gap-2 text-sm sm:text-base text-foreground/85">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold mt-0.5">
                        •
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* FAQ */}
        {article.faq && article.faq.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
            <div className="space-y-4">
              {article.faq.map((f, i) => (
                <Card key={i}>
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-sm mb-2">{f.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* FAQ structured data for SEO */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: article.faq.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: f.answer,
                    },
                  })),
                }),
              }}
            />
          </section>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-border bg-secondary/40 p-6 text-center">
          <FileText className="h-8 w-8 mx-auto text-primary mb-3" />
          <h2 className="text-lg font-bold mb-2">Need a licensed carpenter?</h2>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Browse verified carpentry businesses across California. Free to search, no lead fees.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm">
              <Link href={`/${buildQuery({ view: "browse" })}`}>
                Browse carpenters <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href={`/${buildQuery({ view: "submit" })}`}>
                List your business
              </Link>
            </Button>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
              Related guides
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${buildQuery({ view: "article", slug: rel.slug })}`}
                  className="group block"
                >
                  <Card className="h-full hover:border-primary/30 transition-all">
                    <CardContent className="p-4">
                      <Badge
                        className={`${categoryColors[rel.category] ?? "bg-secondary"} text-[9px] mb-2`}
                        variant="secondary"
                      >
                        {rel.category}
                      </Badge>
                      <h3 className="text-sm font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Clock className="h-3 w-3" /> {rel.readTime}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
