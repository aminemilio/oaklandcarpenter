"use client";

import Link from "next/link";
import { ChevronLeft, Download, FileArchive, FileCode, Github, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buildQuery } from "../types";

export function DownloadView() {
  return (
    <div>
      {/* Hero strip */}
      <section className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/15 via-secondary to-background">
        <div className="relative h-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <Badge variant="secondary" className="mb-3 w-fit">
            <Download className="h-3 w-3 mr-1" /> Source Code
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Download the project
          </h1>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl">
            Get the full Next.js source code for the Oakland Carpenter directory. Free, MIT-licensed, ready to deploy on Vercel.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Download buttons */}
        <div className="grid gap-4 sm:grid-cols-2">
          <a href="/oaklandcarpenter.zip" download>
            <Card className="group hover:border-primary/40 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileArchive className="h-7 w-7" />
                </span>
                <h2 className="font-bold text-lg mb-1">ZIP file</h2>
                <p className="text-xs text-muted-foreground mb-3">252 KB · 125 files</p>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download .zip
                </Button>
              </CardContent>
            </Card>
          </a>

          <a href="/oaklandcarpenter.tar.gz" download>
            <Card className="group hover:border-primary/40 hover:shadow-md transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <FileCode className="h-7 w-7" />
                </span>
                <h2 className="font-bold text-lg mb-1">TAR.GZ file</h2>
                <p className="text-xs text-muted-foreground mb-3">202 KB · 126 files</p>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download .tar.gz
                </Button>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Direct URLs */}
        <Card className="bg-secondary/40">
          <CardContent className="p-5">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-3">
              Direct URLs (copy into browser)
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <code className="flex-1 bg-background px-3 py-2 rounded font-mono text-xs overflow-x-auto">
                  /oaklandcarpenter.zip
                </code>
                <CopyButton text="/oaklandcarpenter.zip" />
              </div>
              <div className="flex items-center gap-2 text-sm">
                <code className="flex-1 bg-background px-3 py-2 rounded font-mono text-xs overflow-x-auto">
                  /oaklandcarpenter.tar.gz
                </code>
                <CopyButton text="/oaklandcarpenter.tar.gz" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's inside */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-4">
            What&apos;s inside
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">Next.js 16 + TypeScript</div>
                <div className="text-xs text-muted-foreground">App Router, Tailwind CSS 4, shadcn/ui</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">Prisma + SQLite</div>
                <div className="text-xs text-muted-foreground">Switch to PostgreSQL for Vercel</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">Admin dashboard</div>
                <div className="text-xs text-muted-foreground">Approve/reject submissions at /admin</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">SEO content hub</div>
                <div className="text-xs text-muted-foreground">4 keyword-optimized articles + sitemap</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">33 Pexels photos</div>
                <div className="text-xs text-muted-foreground">Free for commercial use, no attribution</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-sm">
                <div className="font-medium mb-1">Full README</div>
                <div className="text-xs text-muted-foreground">Step-by-step Vercel deployment guide</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick start */}
        <Card className="bg-secondary/40">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" /> Quick start after download
            </h3>
            <pre className="text-xs bg-background rounded-lg p-3 overflow-x-auto"><code>{`# Unzip the file
unzip oaklandcarpenter.zip -d oaklandcarpenter
cd oaklandcarpenter

# Install dependencies
bun install   # or: npm install

# Set up database
bun run db:push

# (Optional) Seed sample data
bun run scripts/seed.ts

# Start dev server
bun run dev   # or: npm run dev
# Open http://localhost:3000`}</code></pre>
          </CardContent>
        </Card>

        {/* Deploy to Vercel */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to deploy? Push to GitHub and import at vercel.com
          </p>
          <Button asChild variant="outline">
            <Link href={`/${buildQuery({ view: "about" })}`}>
              Read the deployment guide
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="flex items-center gap-1 px-2 py-1 rounded text-xs hover:bg-accent transition-colors text-muted-foreground hover:text-primary"
      title="Copy to clipboard"
    >
      <Copy className="h-3 w-3" />
    </button>
  );
}
