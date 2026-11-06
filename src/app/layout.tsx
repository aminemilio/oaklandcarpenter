import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  // No explicit weight array — Plus Jakarta Sans is a variable font and
  // specifying multiple weights trips Turbopack's font resolver in dev mode
  // ("next/font/google queries have exactly one entry").
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://oaklandcarpenter.com";
const SITE_NAME = "Oakland Carpenter — California Carpentry Directory";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME}`,
    template: `%s | Oakland Carpenter`,
  },
  description:
    "Find licensed carpenters across California. Browse custom cabinet makers, deck builders, framing contractors, and finish carpenters in Oakland, San Francisco, Los Angeles, San Diego, Sacramento, Fresno and 10+ more California cities. Free to list your carpentry business.",
  keywords: [
    "carpenter California",
    "carpenter Oakland",
    "carpenter San Francisco",
    "carpenter Los Angeles",
    "carpenter San Diego",
    "carpenter Sacramento",
    "custom cabinets California",
    "deck builder California",
    "framing contractor California",
    "finish carpentry California",
    "California contractor directory",
    "CSLB licensed carpenter",
  ],
  authors: [{ name: "Oakland Carpenter Directory" }],
  creator: "Oakland Carpenter Directory",
  applicationName: SITE_NAME,
  category: "Business Directory",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "California's carpenter directory. Find licensed carpenters in Oakland, SF, LA, San Diego, Sacramento and 10+ more cities. Free to list your carpentry business.",
    url: SITE_URL,
    siteName: "Oakland Carpenter",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://images.pexels.com/photos/39404259/pexels-photo-39404259.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 800,
        alt: "Modern kitchen with custom wooden cabinets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "California's carpenter directory. Find licensed carpenters across Oakland, SF, LA, San Diego, Sacramento and 10+ more cities.",
    images: [
      "https://images.pexels.com/photos/39404259/pexels-photo-39404259.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* JSON-LD: Organization / WebSite schema for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: SITE_NAME,
              url: SITE_URL,
              description:
                "California's carpenter directory. Find licensed carpenters across Oakland, SF, LA, San Diego, Sacramento and 10+ more California cities.",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${SITE_URL}/?view=browse&q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${jakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
