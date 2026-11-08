"use client";

import Link from "next/link";
import { ChevronLeft, Shield, Cookie, FileText, Mail, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "../reveal";
import { buildQuery } from "../types";

export function PrivacyView() {
  return (
    <div>
      <section className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-background border-b border-border">
        <div className="relative h-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Reveal>
          <Card className="bg-secondary/40">
            <CardContent className="p-5 flex gap-3">
              <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Oakland Carpenter (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website at oaklandcarpenter.com — a directory of licensed carpenters in California. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Section icon={<Users className="h-4 w-4" />} title="1. Information We Collect">
          <p><strong>Carpenter listings:</strong> When a carpenter submits their business through our form, we collect the business name, owner name, city, county, phone number, email address, website, services offered, CSLB license number and class, year established, and a business description. This information is published on the directory for public viewing (except the owner name, which is kept private unless the carpenter chooses to display it).</p>
          <p><strong>Submissions contact info:</strong> The email address and phone number provided in submissions are used to contact the carpenter about their listing approval and are not shared with third parties.</p>
          <p><strong>Homeowner contact:</strong> We do not currently collect information from homeowners who browse the directory. If you contact a carpenter through their listing, that communication goes directly to the carpenter — we do not intercept or store it.</p>
          <p><strong>Newsletter (optional):</strong> If you subscribe to our email newsletter, we collect your email address. You can unsubscribe at any time using the link in any newsletter email.</p>
          <p><strong>Technical data:</strong> Like most websites, we automatically collect basic technical information including IP address, browser type, device type, pages visited, and referring URLs. This is used for analytics and security purposes.</p>
        </Section>

        <Section icon={<Cookie className="h-4 w-4" />} title="2. Cookies and Tracking Technologies">
          <p>We use cookies and similar technologies for the following purposes:</p>
          <ul>
            <li><strong>Essential cookies:</strong> Required for the website to function properly (e.g., remembering your search preferences).</li>
            <li><strong>Analytics cookies:</strong> We use Google Analytics to understand how visitors use our site. Google Analytics collects anonymous usage data including page views, session duration, and traffic sources. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google's Privacy Policy</a> for details.</li>
            <li><strong>Advertising cookies:</strong> If we display ads through Google AdSense or other ad networks, these networks may use cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.</li>
            <li><strong>You may opt out</strong> of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>. You can also opt out of third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">aboutads.info</a>.</li>
          </ul>
        </Section>

        <Section icon={<FileText className="h-4 w-4" />} title="3. Google AdSense and Third-Party Advertising">
          <p>If we display Google AdSense ads on this website, the following applies:</p>
          <ul>
            <li>Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites.</li>
            <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Ads Settings</a>.</li>
            <li>For more information about how Google uses data, visit <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google&apos;s Partner Sites policy</a>.</li>
          </ul>
          <p>We may also use third-party ad networks (such as Media.net or Ezoic) that have their own privacy policies. We encourage you to review those policies.</p>
        </Section>

        <Section title="4. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul>
            <li>Operate, maintain, and improve the directory</li>
            <li>Review and approve carpenter submissions</li>
            <li>Verify CSLB license numbers against the public California Contractors State License Board database</li>
            <li>Send newsletter emails (only to those who subscribe)</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Display relevant advertising</li>
            <li>Detect, prevent, and address technical issues, fraud, or policy violations</li>
          </ul>
        </Section>

        <Section title="5. How We Share Your Information">
          <p><strong>Public listing data:</strong> Information submitted by carpenters (business name, city, phone, email, website, services, license number) is published publicly on the directory.</p>
          <p><strong>We do NOT sell</strong> your personal information to third parties.</p>
          <p><strong>Service providers:</strong> We may share data with third-party service providers who help us operate the website (e.g., hosting, analytics, email delivery). These providers are contractually obligated to protect your data.</p>
          <p><strong>Legal compliance:</strong> We may disclose information when required by law or in response to valid requests from public authorities (including law enforcement or CSLB).</p>
        </Section>

        <Section title="6. Data Retention">
          <p><strong>Published listings:</strong> Remain on the directory until the carpenter requests removal or we determine the listing no longer meets our criteria (e.g., CSLB license expired or revoked).</p>
          <p><strong>Submissions:</strong> Pending submissions are retained for 90 days. Approved submissions are retained indefinitely as part of the published listing record. Rejected submissions are deleted after 30 days.</p>
          <p><strong>Technical/logs:</strong> Analytics data is retained for up to 26 months.</p>
        </Section>

        <Section title="7. Your Privacy Rights (California)">
          <p>California residents have specific privacy rights under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA):</p>
          <ul>
            <li><strong>Right to know</strong> what personal information we collect about you</li>
            <li><strong>Right to delete</strong> your personal information</li>
            <li><strong>Right to opt out</strong> of the sale or sharing of your personal information (we do not sell your data)</li>
            <li><strong>Right to non-discrimination</strong> for exercising your privacy rights</li>
          </ul>
          <p>To exercise these rights, contact us at <a href="mailto:privacy@oaklandcarpenter.com" className="text-primary hover:underline">privacy@oaklandcarpenter.com</a>. We will respond within 45 days.</p>
        </Section>

        <Section title="8. CSLB License Information">
          <p>Carpenter listings display CSLB license numbers and status as provided by the carpenter at the time of submission. We verify license numbers against the public CSLB database (<a href="https://www.cslb.ca.gov/CheckALicense" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cslb.ca.gov/CheckALicense</a>) at the time of listing approval. However, license status can change at any time. We do not guarantee the accuracy of license information — always verify directly with the CSLB before hiring any contractor.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>Our website is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us and we will delete it immediately.</p>
        </Section>

        <Section title="10. Data Security">
          <p>We implement reasonable technical and organizational measures to protect your data, including encrypted connections (HTTPS), secure database storage, and access controls. However, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
        </Section>

        <Section title="11. Changes to This Privacy Policy">
          <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. We encourage you to review this page periodically.</p>
        </Section>

        <Section title="12. Contact Us">
          <p>If you have questions about this Privacy Policy or our data practices, contact us:</p>
          <ul>
            <li>Email: <a href="mailto:privacy@oaklandcarpenter.com" className="text-primary hover:underline">privacy@oaklandcarpenter.com</a></li>
            <li>General inquiries: <Link href={`/${buildQuery({ view: "contact" })}`} className="text-primary hover:underline">Contact page</Link></li>
          </ul>
        </Section>

        <div className="rounded-lg border border-border bg-secondary/40 p-6 text-center">
          <Mail className="h-8 w-8 mx-auto text-primary mb-3" />
          <h2 className="text-lg font-semibold mb-1">Questions about privacy?</h2>
          <p className="text-sm text-muted-foreground mb-4">Email us at privacy@oaklandcarpenter.com</p>
          <Link href={`/${buildQuery({ view: "contact" })}`} className="text-sm text-primary hover:underline">
            Go to contact page →
          </Link>
        </div>
      </article>
    </div>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          {title}
        </h2>
        <div className="text-sm sm:text-base text-foreground/85 leading-relaxed space-y-3 [&>ul]:mt-3 [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:leading-relaxed [&>li]:marker:text-primary [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
