// Central registry of all photography used across the directory.
// All images are from Pexels (https://www.pexels.com) — free for personal
// and commercial use under the Pexels License. No attribution required.
//
// Each service category has a POOL of images. When a listing needs an image,
// we pick from the pool based on a hash of the business name — so two
// cabinet makers don't get the same photo.

// Helper: build a Pexels direct image URL from the photo ID.
// Pattern: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg
function px(id: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200`
}

// ─── Image pools by category ──────────────────────────────────────────────

// Modern kitchens with custom wooden cabinets (7 unique photos)
const CABINET_IMAGES = [
  px(34925526), // Stylish kitchen with wooden cabinets, Berlin
  px(39733050), // Sleek modern kitchen, dark countertops
  px(39404259), // Bright modern kitchen, brass fixtures
  px(37567706), // Sleek kitchen, stainless steel appliances
  px(6436792),  // Contemporary wooden kitchen
  px(18285876), // Modern kitchen with wooden cabinets and island
  px(8092436),  // Luxury traditional kitchen, brown and white cabinets
]

// Outdoor decks and patios (2 unique photos)
const DECK_IMAGES = [
  px(35361401), // Luxurious patio with wooden deck and seating
  px(29887396), // Cozy wooden patio with table and chairs
]

// House framing under construction (4 unique — California-specific!)
const FRAMING_IMAGES = [
  px(39367476), // Framing in Sacramento, CA
  px(32992819), // House framing in Elk Grove, CA
  px(39151698), // House frame in sunlight, Elk Grove CA
  px(33404353), // House framing in Texas
]

// Wooden staircases / finish carpentry showcase (5 unique photos)
const STAIRCASE_IMAGES = [
  px(20091608), // Modern interior with wooden staircase
  px(38975398), // Modern minimalist with wooden staircase
  px(38975403), // Floating staircase with piano
  px(36777516), // Wooden stairs with green walls
  px(35505497), // Modern home with elegant staircase
]

// Living rooms with hardwood floors (4 unique photos)
const FLOORING_IMAGES = [
  px(40440084), // Spacious renovated living room with hardwood floors
  px(35430055), // Spacious modern living room with hardwood floors
  px(40440071), // Bright living room with hardwood floors
  px(35430098), // Spacious minimalist living room with wooden floors
]

// Carpentry tools / workshop (2 unique photos)
const WORKSHOP_IMAGES = [
  px(28231731), // Tools scattered on a wooden workbench
  px(37663438), // Carpentry tools in a workshop setting
]

// Resin / epoxy / live edge tables — modern furniture making (3 unique photos)
const RESIN_TABLE_IMAGES = [
  px(6046817),  // Turquoise acrylic/resin spill on wooden structure — artistic resin look
  px(8251484),  // Brown wooden round table close-up, modern minimalist background
  px(6186518),  // Stylish wooden table corner, rustic finish, modern metal legs
]

// Modern accent walls / wood paneling interiors (3 unique photos)
const ACCENT_WALL_IMAGES = [
  px(40233862), // Modern bathroom with wooden slat accent wall, geometric lighting
  px(6908560),  // Modern living room with wood accent wall and leather couch
  px(36025792), // Modern bedroom with green accent wall, wooden floors
]

// Modern home office / custom desks (4 unique photos)
const HOME_OFFICE_IMAGES = [
  px(29304264), // Modern home office with wooden desk and bookshelves
  px(1957477),  // Modern home office with wooden desk and ergonomic chair
  px(16446855), // Minimalist home office with wooden desk
  px(30047570), // Modern minimalist home office desk setup
]

// ─── Public image exports ─────────────────────────────────────────────────

// Hero image — bright modern kitchen, professional quality
export const HERO_IMAGE = px(39404259)

// Tools/workshop image — for CTA strips and submit page hero
export const TOOLS_IMAGE = px(28231731)

// Finished home image — for CTA sections (modern living room with accent wall)
export const FINISHED_HOME_IMAGE = px(6908560)

// Pricing page hero (furniture/staircase showcase)
export const STAIRCASE_IMAGE = px(38975403)

// ─── Service-to-pool mapping ──────────────────────────────────────────────

const SERVICE_POOLS: Record<string, string[]> = {
  "Custom Cabinets": CABINET_IMAGES,
  "Cabinet Repair": [...CABINET_IMAGES.slice(1), CABINET_IMAGES[0]], // rotated
  "Deck Building": DECK_IMAGES,
  "Framing": FRAMING_IMAGES,
  "Finish Carpentry": [...STAIRCASE_IMAGES, ...ACCENT_WALL_IMAGES],
  "Trim & Molding": [...ACCENT_WALL_IMAGES, STAIRCASE_IMAGES[3], STAIRCASE_IMAGES[4]],
  "Furniture Making": [...RESIN_TABLE_IMAGES, ...HOME_OFFICE_IMAGES, STAIRCASE_IMAGES[2]],
  "Wood Flooring": [...FLOORING_IMAGES, ACCENT_WALL_IMAGES[2]],
  "Door & Window Installation": [CABINET_IMAGES[4], CABINET_IMAGES[3], ...ACCENT_WALL_IMAGES],
  "General Carpentry": [...WORKSHOP_IMAGES, ...HOME_OFFICE_IMAGES],
}

// Pick an image from the service pool based on a hash of a unique seed
// (business name + city). Same listing always gets the same image; different
// listings get different images.
export function imageForService(
  primaryService: string,
  businessName?: string,
  city?: string
): string {
  const pool = SERVICE_POOLS[primaryService] ?? WORKSHOP_IMAGES
  if (!businessName || pool.length === 1) return pool[0]
  const seed = `${businessName}|${city ?? ""}`
  // FNV-1a hash for even distribution
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return pool[(h >>> 0) % pool.length]
}

// Pick a city hero image — deterministic per city, pulls from all pools
// so adjacent cities get different images.
export function imageForCity(city: string): string {
  const pool = [
    ...CABINET_IMAGES,
    ...FLOORING_IMAGES,
    ...STAIRCASE_IMAGES,
    ...DECK_IMAGES,
    ...ACCENT_WALL_IMAGES,
    ...RESIN_TABLE_IMAGES,
    ...HOME_OFFICE_IMAGES,
  ]
  let h = 0
  for (let i = 0; i < city.length; i++) {
    h = (h * 31 + city.charCodeAt(i)) >>> 0
  }
  return pool[h % pool.length]
}

// All image IDs used (for verification / future download)
export const ALL_PEXELS_IDS = [
  34925526, 39733050, 39404259, 37567706, 6436792, 18285876, 8092436,
  35361401, 29887396,
  39367476, 32992819, 39151698, 33404353,
  20091608, 38975398, 38975403, 36777516, 35505497,
  40440084, 35430055, 40440071, 35430098,
  28231731, 37663438,
  6046817, 8251484, 6186518,
  40233862, 6908560, 36025792,
  29304264, 1957477, 16446855, 30047570,
]
