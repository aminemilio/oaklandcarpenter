"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/directory/site-header";
import { SiteFooter } from "@/components/directory/site-footer";
import { viewFromParams } from "@/components/directory/types";
import { HomeView } from "@/components/directory/views/home-view";
import { BrowseView } from "@/components/directory/views/browse-view";
import { CityView } from "@/components/directory/views/city-view";
import { ListingDetailView } from "@/components/directory/views/listing-detail-view";
import { SubmitView } from "@/components/directory/views/submit-view";
import { AboutView } from "@/components/directory/views/about-view";
import { ResourcesView } from "@/components/directory/views/resources-view";
import { ArticleView } from "@/components/directory/views/article-view";
import { DownloadView } from "@/components/directory/views/download-view";
import { PrivacyView } from "@/components/directory/views/privacy-view";
import { TermsView } from "@/components/directory/views/terms-view";
import { ContactView } from "@/components/directory/views/contact-view";

function Routed() {
  const sp = useSearchParams();
  const params = viewFromParams(sp);

  let content: React.ReactNode;
  switch (params.view) {
    case "browse":
      content = (
        <BrowseView
          initialQ={params.q}
          initialService={params.service}
          initialRegion={params.region}
        />
      );
      break;
    case "city":
      content = params.city ? <CityView city={params.city} /> : <HomeView />;
      break;
    case "listing":
      content = params.id ? <ListingDetailView id={params.id} /> : <HomeView />;
      break;
    case "submit":
      content = <SubmitView initialCity={params.city ?? ""} />;
      break;
    case "resources":
      content = <ResourcesView />;
      break;
    case "article":
      content = params.slug ? <ArticleView slug={params.slug} /> : <ResourcesView />;
      break;
    case "about":
      content = <AboutView />;
      break;
    case "download":
      content = <DownloadView />;
      break;
    case "privacy":
      content = <PrivacyView />;
      break;
    case "terms":
      content = <TermsView />;
      break;
    case "contact":
      content = <ContactView />;
      break;
    case "home":
    default:
      content = <HomeView />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{content}</main>
      <SiteFooter />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Routed />
    </Suspense>
  );
}
