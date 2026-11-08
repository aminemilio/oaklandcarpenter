"use client";

import Link from "next/link";
import { ChevronLeft, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "../reveal";

export function TermsView() {
  return (
    <div>
      <section className="relative h-40 sm:h-48 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary to-background border-b border-border">
        <div className="relative h-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: November 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Reveal>
          <Card className="bg-secondary/40">
            <CardContent className="p-5 flex gap-3">
              <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                These Terms of Service (&quot;Terms&quot;) govern your use of the Oakland Carpenter website at oaklandcarpenter.com (the &quot;Service&quot;). By accessing or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
              </p>
            </CardContent>
          </Card>
        </Reveal>

        <Section title="1. Description of Service">
          <p>Oakland Carpenter is a free online directory that lists licensed carpenters, cabinet makers, deck builders, and other woodworking professionals across California. The Service allows:</p>
          <ul>
            <li><strong>Homeowners</strong> to search for and contact licensed carpenters by city, region, or service type</li>
            <li><strong>Carpenters</strong> to submit their business for inclusion in the directory at no cost</li>
            <li><strong>Visitors</strong> to read guides and articles about hiring carpenters in California</li>
          </ul>
          <p>Oakland Carpenter is an independent directory. We are <strong>not</strong> affiliated with, endorsed by, or sponsored by the California Contractors State License Board (CSLB), any carpenter listed on the directory, or any government agency.</p>
        </Section>

        <Section title="2. Listing Submissions">
          <p>Carpenters may submit their business for inclusion in the directory by completing the submission form. By submitting a listing, you represent and warrant that:</p>
          <ul>
            <li>You are the business owner or are authorized to list the business</li>
            <li>All information provided is accurate, current, and not misleading</li>
            <li>Your CSLB license number is valid and active at the time of submission</li>
            <li>Your business is properly licensed to perform the services listed in California</li>
            <li>You have the right to use any website URL, phone number, or email address you provide</li>
            <li>The listing does not violate any law, regulation, or third-party rights</li>
          </ul>
          <p>We reserve the right to <strong>approve, reject, edit, or remove</strong> any submission at our sole discretion, without notice. We are not obligated to publish any submission.</p>
        </Section>

        <Section title="3. CSLB License Verification">
          <p>When a listing is submitted with a CSLB license number, we attempt to verify the license against the public CSLB database at cslb.ca.gov. Listings that pass this check receive a &quot;Verified&quot; badge. However:</p>
          <ul>
            <li>Verification reflects the license status <strong>at the time of listing approval only</strong></li>
            <li>License status can change at any time (expiration, suspension, revocation)</li>
            <li>We do <strong>not</strong> continuously monitor license status after approval</li>
            <li>The &quot;Verified&quot; badge is <strong>not</strong> a guarantee, endorsement, or warranty of the carpenter&apos;s work quality, financial stability, or fitness for any project</li>
            <li><strong>You must independently verify</strong> any contractor&apos;s license directly with the CSLB at <a href="https://www.cslb.ca.gov/CheckALicense" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cslb.ca.gov/CheckALicense</a> before hiring them</li>
          </ul>
        </Section>

        <Section title="4. Acceptable Use">
          <p>You agree not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent listings</li>
            <li>Impersonate another business or person</li>
            <li>Submit a listing for a business you do not own or represent</li>
            <li>Use the directory to send unsolicited advertising, spam, or promotional messages to listed carpenters</li>
            <li>Scrape, copy, or bulk-download listings for commercial purposes without our written permission</li>
            <li>Use automated tools (bots, crawlers, scrapers) to access the directory in a way that disrupts service or exceeds reasonable request rates</li>
            <li>Attempt to gain unauthorized access to our systems, databases, or admin areas</li>
            <li>Display or use the directory&apos;s content in a way that implies endorsement by Oakland Carpenter</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
          </ul>
        </Section>

        <Section title="5. Homeowner-Contractor Relationships">
          <p>Oakland Carpenter is a <strong>directory only</strong>. We are not a party to any contract between a homeowner and a carpenter. We do not:</p>
          <ul>
            <li>Guarantee the quality, safety, or legality of any carpenter&apos;s work</li>
            <li>Verify the accuracy of claims made in listings beyond CSLB license verification</li>
            <li>Mediate disputes between homeowners and carpenters</li>
            <li>Provide warranties, guarantees, or insurance for any work performed</li>
            <li>Endorse or recommend any specific carpenter</li>
          </ul>
          <p>Any contract you enter into with a carpenter listed on this directory is solely between you and the carpenter. You are responsible for verifying licenses, checking references, reviewing portfolios, and negotiating terms before hiring.</p>
        </Section>

        <Section title="6. Disclaimers">
          <p><strong>As-is basis:</strong> The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis without warranties of any kind, either express or implied.</p>
          <p><strong>No warranty:</strong> We do not warrant that the Service will be uninterrupted, error-free, secure, or that listings are accurate, complete, or current.</p>
          <p><strong>External links:</strong> The directory contains links to third-party websites (carpenter websites, CSLB, etc.). We are not responsible for the content, privacy practices, or accuracy of these external sites.</p>
          <p><strong>Photos:</strong> Photos displayed alongside listings are representative images from Pexels and do not depict the actual work of the listed carpenter unless the carpenter has provided their own photos (feature not yet available).</p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>To the maximum extent permitted by law, Oakland Carpenter and its operators shall not be liable for:</p>
          <ul>
            <li>Any indirect, incidental, special, consequential, or punitive damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Damages arising from your use of or inability to use the Service</li>
            <li>Damages arising from your interaction with any carpenter listed on the directory</li>
            <li>Damages arising from inaccurate, incomplete, or outdated listing information</li>
            <li>Any action or inaction of a listed carpenter, including but not limited to poor workmanship, breach of contract, property damage, or personal injury</li>
          </ul>
          <p>Your sole remedy for dissatisfaction with the Service is to stop using it.</p>
        </Section>

        <Section title="8. Indemnification">
          <p>You agree to indemnify and hold harmless Oakland Carpenter and its operators from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from:</p>
          <ul>
            <li>Your use of the Service</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights (including listing another business without authorization)</li>
            <li>Any listing you submit that contains false, misleading, or infringing content</li>
          </ul>
        </Section>

        <Section title="9. Intellectual Property">
          <p><strong>Our content:</strong> The directory&apos;s design, articles, guides, logos, and original text content are owned by Oakland Carpenter and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works from our content without written permission.</p>
          <p><strong>Listing content:</strong> Listings are submitted by carpenters who retain ownership of their business name, description, and contact information. By submitting a listing, the carpenter grants Oakland Carpenter a non-exclusive, royalty-free license to display the listing on the directory.</p>
          <p><strong>Photography:</strong> Photos used on the directory are sourced from Pexels under the Pexels License (free for commercial use). Individual photo credits are available in the footer.</p>
        </Section>

        <Section title="10. Listing Removal">
          <p>Carpenters may request removal of their listing at any time by emailing <a href="mailto:hello@oaklandcarpenter.com" className="text-primary hover:underline">hello@oaklandcarpenter.com</a>. We will remove the listing within 5 business days.</p>
          <p>We may also remove listings at our discretion if:</p>
          <ul>
            <li>The CSLB license is expired, suspended, or revoked</li>
            <li>The listing contains false or misleading information</li>
            <li>We receive credible complaints about the listed business</li>
            <li>The business is no longer operating</li>
            <li>The listing violates these Terms</li>
          </ul>
        </Section>

        <Section title="11. Advertising">
          <p>The Service may display advertising from third-party ad networks (such as Google AdSense, Media.net, or others). Advertisements are delivered by the ad networks, not by Oakland Carpenter. We do not control which ads are displayed and are not responsible for the content of advertisements.</p>
          <p>Oakland Carpenter does not accept paid placement for listings. All listings are free. The &quot;Featured&quot; designation is assigned at our discretion based on listing quality and is not for sale.</p>
        </Section>

        <Section title="12. Modifications to These Terms">
          <p>We may modify these Terms at any time. We will post the updated Terms on this page and update the &quot;Last updated&quot; date. Your continued use of the Service after any changes constitutes acceptance of the new Terms. We encourage you to review this page periodically.</p>
        </Section>

        <Section title="13. Termination">
          <p>We may terminate or suspend your access to the Service (including removing listings) at any time, without notice, for any reason, including violation of these Terms. Upon termination, all licenses granted by you to us for your listing content will continue for the purpose of maintaining directory records, unless you request deletion.</p>
        </Section>

        <Section title="14. Governing Law">
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the state or federal courts located in Alameda County, California.</p>
        </Section>

        <Section title="15. Severability">
          <p>If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.</p>
        </Section>

        <Section title="16. Contact">
          <p>Questions about these Terms? Contact us:</p>
          <ul>
            <li>Email: <a href="mailto:hello@oaklandcarpenter.com" className="text-primary hover:underline">hello@oaklandcarpenter.com</a></li>
          </ul>
        </Section>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-amber-900 mb-1">Important reminder</h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Always verify a contractor&apos;s license directly with the CSLB at cslb.ca.gov/CheckALicense before signing any contract. Oakland Carpenter is not responsible for the work performed by any listed carpenter.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <section>
        <h2 className="text-lg font-semibold text-foreground mb-3">{title}</h2>
        <div className="text-sm sm:text-base text-foreground/85 leading-relaxed space-y-3 [&>ul]:mt-3 [&>ul]:space-y-1.5 [&>ul]:list-disc [&>ul]:pl-5 [&>li]:leading-relaxed [&>li]:marker:text-primary [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground">
          {children}
        </div>
      </section>
    </Reveal>
  );
}
