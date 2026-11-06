// Shared types for directory data (kept in sync with Prisma schema).
// These match what the API returns so the frontend can use them directly.

export type Listing = {
  id: string
  businessName: string
  slug: string
  ownerName: string | null
  city: string
  county: string
  region: string
  services: string
  primaryService: string
  description: string
  phone: string
  email: string | null
  website: string | null
  address: string | null
  licenseNumber: string | null
  licenseClass: string | null
  licenseStatus: string | null
  yearEstablished: number | null
  rating: number
  reviewCount: number
  imageUrl: string | null
  featured: boolean
  featuredUntil: string | null
  verified: boolean
  status: string
  createdAt: string
  updatedAt: string
}

export type CityInfo = {
  city: string
  county: string
  region: string
  listingCount: number
  featuredCount: number
}

export type ServiceInfo = {
  name: string
  count: number
}

export type ListingsResponse = {
  listings: Listing[]
  total: number
  limit: number
  offset: number
}

export type CitiesResponse = {
  cities: CityInfo[]
  byRegion: Record<string, CityInfo[]>
  totalCities: number
  totalListings: number
}

export type ServicesResponse = {
  services: ServiceInfo[]
  totalServices: number
}

// Navigation is done via URL search params on the single / route.
// All views are rendered client-side based on these params.
export function viewFromParams(sp: URLSearchParams) {
  const view = sp.get("view") ?? "home"
  return {
    view,
    city: sp.get("city") ?? undefined,
    id: sp.get("id") ?? undefined,
    slug: sp.get("slug") ?? undefined,
    q: sp.get("q") ?? undefined,
    service: sp.get("service") ?? undefined,
    region: sp.get("region") ?? undefined,
  }
}

// Build a URL query string from a partial params object.
export function buildQuery(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") sp.set(k, v)
  }
  const s = sp.toString()
  return s ? `?${s}` : ""
}
