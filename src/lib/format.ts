// Formatting helpers used across directory components.

export function formatStars(rating: number): string {
  // Round to nearest 0.5 for star display purposes
  const rounded = Math.round(rating * 2) / 2
  return rounded.toFixed(1)
}

export function starString(rating: number): string {
  // Returns a 5-char star string like "★★★★½"
  const rounded = Math.round(rating * 2) / 2
  const full = Math.floor(rounded)
  const half = rounded - full >= 0.5
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0))
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function servicesArray(services: string | null | undefined): string[] {
  if (!services) return []
  return services
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
}

export function formatPhone(phone: string): string {
  // Already formatted in seed data, but normalize just in case
  return phone
}

export function yearsInBusiness(yearEstablished?: number | null): string | null {
  if (!yearEstablished) return null
  const currentYear = new Date().getFullYear()
  const years = currentYear - yearEstablished
  if (years <= 0) return "New business"
  if (years === 1) return "1 year in business"
  return `${years} years in business`
}

export function licenseLabel(licenseClass?: string | null): string {
  if (!licenseClass) return ""
  const map: Record<string, string> = {
    B: "Class B — General Building",
    "C-5": "Class C-5 — Flooring",
    "C-6": "Class C-6 — Cabinet & Millwork",
  }
  return map[licenseClass] ?? `Class ${licenseClass}`
}
