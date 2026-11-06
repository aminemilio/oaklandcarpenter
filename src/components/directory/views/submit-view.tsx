"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle2, Send, AlertCircle, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { buildQuery } from "../types";
import type { ServiceInfo, CityInfo } from "../types";
import { TOOLS_IMAGE } from "@/lib/images";

const SERVICE_OPTIONS = [
  "General Carpentry",
  "Custom Cabinets",
  "Deck Building",
  "Framing",
  "Finish Carpentry",
  "Door & Window Installation",
  "Furniture Making",
  "Trim & Molding",
  "Wood Flooring",
  "Cabinet Repair",
];

const LICENSE_CLASS_OPTIONS = [
  { value: "B", label: "Class B — General Building Contractor" },
  { value: "C-5", label: "Class C-5 — Flooring and Floor Covering" },
  { value: "C-6", label: "Class C-6 — Cabinet and Millwork" },
  { value: "C-61", label: "Class C-61 — Limited Specialty" },
  { value: "none", label: "Not yet licensed / Exempt" },
];

export function SubmitView({ initialCity = "" }: { initialCity?: string }) {
  const router = useRouter();
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [cities, setCities] = useState<CityInfo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string; message: string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  // Form state
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [city, setCity] = useState(initialCity);
  const [county, setCounty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [primaryService, setPrimaryService] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseClass, setLicenseClass] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [agreeVerify, setAgreeVerify] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Auto-fill county when city is selected from the known list
  useEffect(() => {
    if (!city) return;
    const found = cities.find((c) => c.city === city);
    if (found) setCounty(found.county);
  }, [city, cities]);

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

  const toggleService = (s: string) => {
    setSelectedServices((cur) =>
      cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]
    );
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!businessName.trim()) e.businessName = "Business name is required";
    if (!city.trim()) e.city = "City is required";
    if (!phone.trim()) e.phone = "Phone is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!primaryService) e.primaryService = "Pick a primary service";
    if (selectedServices.length === 0) e.services = "Pick at least one service";
    if (!agreeVerify) e.agreeVerify = "Please confirm you understand the verification process";
    if (!agreeTerms) e.agreeTerms = "Please accept the terms";
    if (yearEstablished) {
      const y = parseInt(yearEstablished, 10);
      if (isNaN(y) || y < 1800 || y > new Date().getFullYear())
        e.yearEstablished = "Enter a valid year";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate()) {
      setFormError("Please fix the highlighted fields and try again.");
      return;
    }
    setSubmitting(true);
    try {
      const body = {
        businessName: businessName.trim(),
        ownerName: ownerName.trim() || undefined,
        city: city.trim(),
        county: county.trim() || undefined,
        phone: phone.trim(),
        email: email.trim(),
        website: website.trim() || undefined,
        address: address.trim() || undefined,
        primaryService,
        services: selectedServices.join(", "),
        description: description.trim() || undefined,
        licenseNumber: licenseNumber.trim() || undefined,
        licenseClass: licenseClass && licenseClass !== "none" ? licenseClass : undefined,
        yearEstablished: yearEstablished ? parseInt(yearEstablished, 10) : undefined,
      };
      const r = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const j = await r.json();
      if (!r.ok) {
        setFormError(j.error ?? "Submission failed. Please try again.");
        return;
      }
      setSuccess({ id: j.id, message: j.message });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Submission received!</h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Thanks for listing your carpentry business. {success.message}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Submission reference: <span className="font-mono">{success.id}</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button onClick={() => router.push("/")}>Back to home</Button>
            <Button
              variant="outline"
              onClick={() => {
                setSuccess(null);
                setBusinessName("");
                setOwnerName("");
                setPhone("");
                setEmail("");
                setWebsite("");
                setAddress("");
                setDescription("");
                setLicenseNumber("");
                setYearEstablished("");
                setSelectedServices([]);
                setPrimaryService("");
              }}
            >
              Submit another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero strip */}
      <section className="relative h-48 sm:h-56 overflow-hidden">
        <img src={TOOLS_IMAGE} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="relative h-full mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-6">
          <Link href="/" className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white mb-3 w-fit">
            <ChevronLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1 text-xs font-medium text-white mb-3 w-fit">
            <Hammer className="h-3 w-3 text-amber-400" /> Free to list
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            List your carpentry business
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <p className="text-sm text-muted-foreground max-w-2xl mb-8">
        Fill out the form below to add your carpentry business to the California directory. Basic listings are free forever. We&apos;ll review your submission within 3 business days and verify your CSLB license against the public CSLB database.
      </p>

      <form onSubmit={onSubmit} className="space-y-8">
        {formError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Business info */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Business information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="businessName">Business name <span className="text-destructive">*</span></Label>
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Redwood Craft Carpentry"
                aria-invalid={!!errors.businessName}
              />
              {errors.businessName && <p className="text-xs text-destructive">{errors.businessName}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ownerName">Owner / contact name</Label>
              <Input
                id="ownerName"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Oakland"
                list="ca-cities"
                aria-invalid={!!errors.city}
              />
              <datalist id="ca-cities">
                {cities.map((c) => (
                  <option key={c.city} value={c.city} />
                ))}
              </datalist>
              {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="county">County</Label>
              <Input
                id="county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="e.g. Alameda"
              />
              <p className="text-xs text-muted-foreground">Auto-filled for known cities.</p>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone <span className="text-destructive">*</span></Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(510) 555-1234"
                type="tel"
                aria-invalid={!!errors.phone}
              />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                type="email"
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="yearEstablished">Year established</Label>
              <Input
                id="yearEstablished"
                value={yearEstablished}
                onChange={(e) => setYearEstablished(e.target.value)}
                placeholder="e.g. 2014"
                inputMode="numeric"
                aria-invalid={!!errors.yearEstablished}
              />
              {errors.yearEstablished && <p className="text-xs text-destructive">{errors.yearEstablished}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="address">Workshop / office address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, Oakland, CA 94601"
            />
            <p className="text-xs text-muted-foreground">Optional — shown on your listing page if provided.</p>
          </div>
        </section>

        {/* Services */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Services</h2>
          <div className="space-y-1.5">
            <Label htmlFor="primaryService">Primary service <span className="text-destructive">*</span></Label>
            <Select value={primaryService} onValueChange={setPrimaryService}>
              <SelectTrigger id="primaryService" aria-invalid={!!errors.primaryService}>
                <SelectValue placeholder="Pick the service you most want to be found for" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.primaryService && <p className="text-xs text-destructive">{errors.primaryService}</p>}
          </div>

          <div className="space-y-2">
            <Label>All services you offer <span className="text-destructive">*</span></Label>
            <p className="text-xs text-muted-foreground">Check everything that applies. Visitors can find you via any of these.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {SERVICE_OPTIONS.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-2 rounded-md border border-border p-2.5 cursor-pointer hover:bg-accent/50 text-sm"
                >
                  <Checkbox
                    checked={selectedServices.includes(s)}
                    onCheckedChange={() => toggleService(s)}
                  />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="text-xs text-destructive">{errors.services}</p>}
          </div>
        </section>

        {/* License */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Contractor license</h2>
          <p className="text-xs text-muted-foreground">
            In California, any project valued at $1,000+ (labor + materials) requires a CSLB contractor license (AB 2622, effective Jan 1, 2025). Provide your license info so we can verify it.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="licenseNumber">CSLB license number</Label>
              <Input
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                placeholder="e.g. 1048291"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="licenseClass">License class</Label>
              <Select value={licenseClass} onValueChange={setLicenseClass}>
                <SelectTrigger id="licenseClass">
                  <SelectValue placeholder="Pick a class (if licensed)" />
                </SelectTrigger>
                <SelectContent>
                  {LICENSE_CLASS_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">About your business</h2>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell homeowners what makes your carpentry business different. Specialties, materials, years of experience, anything that helps you stand out. 2-4 sentences is ideal."
              rows={5}
            />
            <p className="text-xs text-muted-foreground">{description.length} / 600 characters</p>
          </div>
        </section>

        {/* Consents */}
        <section className="space-y-3 rounded-md border border-border p-4 bg-secondary/30">
          <label className="flex items-start gap-3 text-sm">
            <Checkbox
              checked={agreeVerify}
              onCheckedChange={(v) => setAgreeVerify(v === true)}
              className="mt-0.5"
            />
            <span className="text-foreground/90">
              I understand that Oakland Carpenter will verify my CSLB license number against the public CSLB database, and that my listing will only show the &quot;Verified&quot; badge after this check passes. License status can change — I agree to re-verify if asked.
            </span>
          </label>
          {errors.agreeVerify && <p className="text-xs text-destructive ml-7">{errors.agreeVerify}</p>}

          <label className="flex items-start gap-3 text-sm">
            <Checkbox
              checked={agreeTerms}
              onCheckedChange={(v) => setAgreeTerms(v === true)}
              className="mt-0.5"
            />
            <span className="text-foreground/90">
              I confirm the information above is accurate, I am authorized to list this business, and I agree to the directory&apos;s <Link href={`/${buildQuery({ view: "about" })}`} className="text-primary hover:underline">terms &amp; verification policy</Link>.
            </span>
          </label>
          {errors.agreeTerms && <p className="text-xs text-destructive ml-7">{errors.agreeTerms}</p>}
        </section>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={submitting} size="lg">
            <Send className="h-4 w-4 mr-2" />
            {submitting ? "Submitting…" : "Submit listing"}
          </Button>
          <span className="text-xs text-muted-foreground">Free · No payment required · Reviewed in 3 business days</span>
        </div>
      </form>
      </div>
    </div>
  );
}
