// ============================================================================
// ⚠️  SAMPLE / DEMO DATA — DO NOT USE IN PRODUCTION  ⚠️
// ============================================================================
// This seed script populates the database with ~50 FICTIONAL carpenter
// listings across 15 California cities for DEVELOPMENT and DEMO purposes
// only.
//
// The business names, phone numbers, emails, addresses, and CSLB license
// numbers in this file are INVENTED. They are not real businesses.
// Phone numbers may accidentally belong to real people. License numbers
// may accidentally match real CSLB licenses of businesses that did not
// consent to being listed.
//
// DO NOT deploy to a production site with this data. Homeowners calling
// these numbers won't reach real carpenters.
//
// For production launch:
//   1. Run `bun run scripts/clear-data.ts` to wipe sample data
//   2. Either start empty (carpenters submit via the public form) OR
//   3. Manually source REAL listings from the public CSLB database:
//      https://www.cslb.ca.gov/onlineservices/checklicenseII/checklicense.aspx
// ============================================================================
//
// Run with: bun run scripts/seed.ts

import { db } from '../src/lib/db'

type SeedListing = {
  businessName: string
  ownerName?: string
  city: string
  county: string
  region: string
  services: string[]
  primaryService: string
  description: string
  phone: string
  email: string
  website?: string
  address?: string
  licenseNumber: string
  licenseClass: string
  licenseStatus: string
  yearEstablished: number
  rating: number
  reviewCount: number
  featured?: boolean
  verified?: boolean
}

// California cities covered by the directory (top 15 by population + carpentry demand)
export const CITIES = [
  { city: 'Oakland',       county: 'Alameda',       region: 'Bay Area',         areaCode: '510' },
  { city: 'San Francisco', county: 'San Francisco', region: 'Bay Area',         areaCode: '415' },
  { city: 'San Jose',      county: 'Santa Clara',   region: 'Bay Area',         areaCode: '408' },
  { city: 'Fremont',       county: 'Alameda',       region: 'Bay Area',         areaCode: '510' },
  { city: 'Sacramento',    county: 'Sacramento',    region: 'Sacramento',       areaCode: '916' },
  { city: 'Stockton',      county: 'San Joaquin',   region: 'Central Valley',   areaCode: '209' },
  { city: 'Fresno',        county: 'Fresno',        region: 'Central Valley',   areaCode: '559' },
  { city: 'Bakersfield',   county: 'Kern',          region: 'Central Valley',   areaCode: '661' },
  { city: 'Los Angeles',   county: 'Los Angeles',   region: 'Southern California', areaCode: '213' },
  { city: 'San Diego',     county: 'San Diego',     region: 'Southern California', areaCode: '619' },
  { city: 'Long Beach',    county: 'Los Angeles',   region: 'Southern California', areaCode: '562' },
  { city: 'Anaheim',       county: 'Orange',        region: 'Southern California', areaCode: '714' },
  { city: 'Santa Ana',     county: 'Orange',        region: 'Southern California', areaCode: '714' },
  { city: 'Riverside',     county: 'Riverside',     region: 'Southern California', areaCode: '951' },
  { city: 'Irvine',        county: 'Orange',        region: 'Southern California', areaCode: '949' },
] as const

// Helper to make a phone number with the right area code
function phone(area: string, n: string) {
  return `(${area}) ${n.slice(0, 3)}-${n.slice(3)}`
}

// Helper to slugify a business name
function slug(name: string, city: string) {
  const base = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return `${base}-${citySlug}`
}

const listings: SeedListing[] = [
  // ===== Oakland (home base — 5 listings, more density) =====
  {
    businessName: 'Redwood Craft Carpentry',
    ownerName: 'Marcus Chen',
    city: 'Oakland', county: 'Alameda', region: 'Bay Area',
    services: ['Custom Cabinets', 'Finish Carpentry', 'Furniture Making'],
    primaryService: 'Custom Cabinets',
    description: 'Redwood Craft is an Oakland-based woodworking shop specializing in custom cabinetry, built-ins, and handcrafted furniture for East Bay homes. We work with hardwoods, reclaimed lumber, and modern veneers to build pieces that last decades. Free design consultation for kitchen and bath projects.',
    phone: phone('510', '4452180'),
    email: 'hello@redwoodcraft.com',
    website: 'https://redwoodcraft.example.com',
    address: '2417 Telegraph Ave, Oakland, CA 94612',
    licenseNumber: '1048291', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2014, rating: 4.9, reviewCount: 47,
    featured: true, verified: true,
  },
  {
    businessName: 'Martinez & Sons Carpentry',
    ownerName: 'Jorge Martinez',
    city: 'Oakland', county: 'Alameda', region: 'Bay Area',
    services: ['Framing', 'General Carpentry', 'Deck Building'],
    primaryService: 'Framing',
    description: 'Three generations of Martinez carpenters serving Oakland and the East Bay. We handle residential framing, decks, pergolas, and remodels. Licensed and insured. Bilingual crew (English / Spanish).',
    phone: phone('510', '8824517'),
    email: 'jorge@martinezcarpentry.example.com',
    address: '1132 Fruitvale Ave, Oakland, CA 94601',
    licenseNumber: '982144', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 1998, rating: 4.7, reviewCount: 38,
  },
  {
    businessName: 'Lake Shore Woodworks',
    ownerName: 'Priya Anand',
    city: 'Oakland', county: 'Alameda', region: 'Bay Area',
    services: ['Custom Cabinets', 'Trim & Molding', 'Finish Carpentry'],
    primaryService: 'Finish Carpentry',
    description: 'Fine finish carpentry for Oakland and Piedmont homes. Specializing in crown molding, wainscoting, coffered ceilings, and bespoke cabinetry. We work closely with homeowners and designers to match historic East Bay architectural details.',
    phone: phone('510', '6673382'),
    email: 'studio@lakeshorewood.example.com',
    address: '510 Lakeshore Ave, Oakland, CA 94610',
    licenseNumber: '1077312', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2019, rating: 4.8, reviewCount: 22,
  },
  {
    businessName: 'East Bay Deck Builders',
    ownerName: 'Tom Larsson',
    city: 'Oakland', county: 'Alameda', region: 'Bay Area',
    services: ['Deck Building', 'General Carpentry'],
    primaryService: 'Deck Building',
    description: 'Custom deck design and construction across Oakland, Berkeley, and Alameda. Composite, hardwood (ipe, garapa), and pressure-treated options. Free on-site estimate within 48 hours.',
    phone: phone('510', '3915560'),
    email: 'tom@eastbaydecks.example.com',
    address: '88 Embarcadero, Oakland, CA 94606',
    licenseNumber: '1014287', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2011, rating: 4.6, reviewCount: 31,
    featured: true, verified: true,
  },
  {
    businessName: 'Oakland Trim & Door Co.',
    ownerName: 'Daniel Okonkwo',
    city: 'Oakland', county: 'Alameda', region: 'Bay Area',
    services: ['Trim & Molding', 'Door & Window Installation'],
    primaryService: 'Door & Window Installation',
    description: 'Interior doors, baseboards, casing, and window trim installed cleanly and on schedule. We replace hollow-core doors, hang pre-hung units, and match period trim for older Oakland homes.',
    phone: phone('510', '7799182'),
    email: 'dan@oaklandtrim.example.com',
    licenseNumber: '1098321', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2017, rating: 4.5, reviewCount: 14,
  },

  // ===== San Francisco =====
  {
    businessName: 'Mission Wood Studio',
    ownerName: 'Elena Vasquez',
    city: 'San Francisco', county: 'San Francisco', region: 'Bay Area',
    services: ['Custom Cabinets', 'Furniture Making', 'Wood Flooring'],
    primaryService: 'Furniture Making',
    description: 'A small San Francisco studio building handcrafted furniture, built-in shelving, and custom cabinets for tight SF footprints. We work with local hardwoods and ethically sourced exotics.',
    phone: phone('415', '2855560'),
    email: 'elena@missionwood.example.com',
    website: 'https://missionwood.example.com',
    address: '3318 24th St, San Francisco, CA 94110',
    licenseNumber: '1029455', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2016, rating: 5.0, reviewCount: 19,
    featured: true, verified: true,
  },
  {
    businessName: 'Soma Framing & Build',
    ownerName: 'Kenji Watanabe',
    city: 'San Francisco', county: 'San Francisco', region: 'Bay Area',
    services: ['Framing', 'General Carpentry'],
    primaryService: 'Framing',
    description: 'Commercial and residential framing contractor serving SoMa, Mission, and the rest of San Francisco. ADU and condo remodel framing a specialty.',
    phone: phone('415', '8821094'),
    email: 'kenji@somaframing.example.com',
    licenseNumber: '986412', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2009, rating: 4.4, reviewCount: 26,
  },
  {
    businessName: 'Pacific Heights Carpentry',
    ownerName: 'Robert Sterling',
    city: 'San Francisco', county: 'San Francisco', region: 'Bay Area',
    services: ['Finish Carpentry', 'Trim & Molding', 'Custom Cabinets'],
    primaryService: 'Finish Carpentry',
    description: 'High-end finish carpentry for San Francisco luxury homes. Crown molding, paneling, library walls, and bespoke cabinetry. We coordinate with interior designers and architects.',
    phone: phone('415', '5523380'),
    email: 'robert@pacheights.example.com',
    licenseNumber: '711284', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2003, rating: 4.8, reviewCount: 41,
  },

  // ===== San Jose =====
  {
    businessName: 'Silicon Valley Carpentry',
    ownerName: 'Hassan Ali',
    city: 'San Jose', county: 'Santa Clara', region: 'Bay Area',
    services: ['General Carpentry', 'Framing', 'Deck Building'],
    primaryService: 'General Carpentry',
    description: 'Full-service residential carpentry across Silicon Valley. From framing to finish, decks, pergolas, and ADUs. Free estimates for South Bay homeowners.',
    phone: phone('408', '4457710'),
    email: 'info@svcarpentry.example.com',
    address: '2450 Stevens Creek Blvd, San Jose, CA 95128',
    licenseNumber: '1004872', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2012, rating: 4.6, reviewCount: 53,
    featured: true, verified: true,
  },
  {
    businessName: 'Willow Glen Woodworks',
    ownerName: 'Sandra Park',
    city: 'San Jose', county: 'Santa Clara', region: 'Bay Area',
    services: ['Custom Cabinets', 'Wood Flooring', 'Finish Carpentry'],
    primaryService: 'Custom Cabinets',
    description: 'Willow Glen-based cabinet shop building custom kitchens, libraries, and entertainment centers. Hardwood floors installed and refinished.',
    phone: phone('408', '9912045'),
    email: 'sandra@willowglenwood.example.com',
    licenseNumber: '1088291', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2018, rating: 4.7, reviewCount: 17,
  },
  {
    businessName: 'South Bay Decks & Pergolas',
    ownerName: 'Mike Donnelly',
    city: 'San Jose', county: 'Santa Clara', region: 'Bay Area',
    services: ['Deck Building'],
    primaryService: 'Deck Building',
    description: 'Custom decks, pergolas, and outdoor kitchens for San Jose, Campbell, and Cupertino. Composite and hardwood specialists.',
    phone: phone('408', '2271845'),
    email: 'mike@southbaydecks.example.com',
    licenseNumber: '1071934', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2015, rating: 4.5, reviewCount: 24,
  },

  // ===== Fremont =====
  {
    businessName: 'Fremont Custom Cabinets',
    ownerName: 'Vinod Patel',
    city: 'Fremont', county: 'Alameda', region: 'Bay Area',
    services: ['Custom Cabinets', 'Cabinet Repair'],
    primaryService: 'Custom Cabinets',
    description: 'Family-run cabinet shop in Fremont serving the Tri-Valley and East Bay. Custom kitchen cabinets, refacing, and cabinet repair. Free 3D design renderings.',
    phone: phone('510', '7935512'),
    email: 'vinod@fremontcabinets.example.com',
    address: '42300 Osgood Rd, Fremont, CA 94539',
    licenseNumber: '991820', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2007, rating: 4.7, reviewCount: 29,
  },
  {
    businessName: 'Niles Carpentry Co.',
    ownerName: 'Aisha Johnson',
    city: 'Fremont', county: 'Alameda', region: 'Bay Area',
    services: ['General Carpentry', 'Door & Window Installation', 'Trim & Molding'],
    primaryService: 'General Carpentry',
    description: 'Niles-district carpenter handling remodels, doors, windows, and trim for Fremont and Union City homes. Small jobs welcome.',
    phone: phone('510', '6578890'),
    email: 'aisha@nilescarpen.example.com',
    licenseNumber: '1066634', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2020, rating: 4.6, reviewCount: 11,
  },

  // ===== Sacramento =====
  {
    businessName: 'River City Carpentry',
    ownerName: 'Gordon Briggs',
    city: 'Sacramento', county: 'Sacramento', region: 'Sacramento',
    services: ['General Carpentry', 'Framing', 'Deck Building'],
    primaryService: 'General Carpentry',
    description: "Sacramento's go-to carpenter for residential framing, decks, and full remodels. Licensed Class B general contractor serving Sacramento, Elk Grove, and Roseville.",
    phone: phone('916', '4426680'),
    email: 'gordon@rivercitycarp.example.com',
    address: '2121 J St, Sacramento, CA 95816',
    licenseNumber: '845221', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2005, rating: 4.7, reviewCount: 62,
    featured: true, verified: true,
  },
  {
    businessName: 'Capitol Cabinet Works',
    ownerName: 'Ling Chen',
    city: 'Sacramento', county: 'Sacramento', region: 'Sacramento',
    services: ['Custom Cabinets', 'Cabinet Repair', 'Wood Flooring'],
    primaryService: 'Custom Cabinets',
    description: 'Custom cabinets and hardwood floors for Sacramento homes and businesses. From modern flat-panel to traditional raised panel, we build to order.',
    phone: phone('916', '9203340'),
    email: 'ling@capitolcabinet.example.com',
    licenseNumber: '1039214', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2014, rating: 4.8, reviewCount: 35,
  },
  {
    businessName: 'Old Sac Woodworks',
    ownerName: 'James Foster',
    city: 'Sacramento', county: 'Sacramento', region: 'Sacramento',
    services: ['Furniture Making', 'Finish Carpentry'],
    primaryService: 'Furniture Making',
    description: 'Handmade furniture and architectural woodwork from a small shop near Old Sacramento. Live-edge tables, custom doors, and historic reproduction work.',
    phone: phone('916', '4479087'),
    email: 'james@oldsacwood.example.com',
    licenseNumber: '1056672', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2016, rating: 4.9, reviewCount: 18,
  },

  // ===== Stockton =====
  {
    businessName: 'Delta Carpentry & Framing',
    ownerName: 'Carlos Ramirez',
    city: 'Stockton', county: 'San Joaquin', region: 'Central Valley',
    services: ['Framing', 'General Carpentry', 'Deck Building'],
    primaryService: 'Framing',
    description: 'Residential framing and carpentry across San Joaquin County. New construction, additions, and deck builds. Licensed and bonded.',
    phone: phone('209', '5564490'),
    email: 'carlos@deltacarpentry.example.com',
    licenseNumber: '901224', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2008, rating: 4.5, reviewCount: 27,
  },
  {
    businessName: 'Stockton Cabinet Shop',
    ownerName: 'Mei Lin',
    city: 'Stockton', county: 'San Joaquin', region: 'Central Valley',
    services: ['Custom Cabinets', 'Cabinet Repair'],
    primaryService: 'Custom Cabinets',
    description: 'Custom kitchen and bath cabinetry built in our Stockton shop. Soft-close hardware, dovetail drawers, and hardwood face frames standard.',
    phone: phone('209', '9821170'),
    email: 'mei@stocktoncabinet.example.com',
    licenseNumber: '1028841', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2013, rating: 4.6, reviewCount: 21,
  },

  // ===== Fresno =====
  {
    businessName: 'Central Valley Carpentry',
    ownerName: 'Ben Howard',
    city: 'Fresno', county: 'Fresno', region: 'Central Valley',
    services: ['General Carpentry', 'Framing', 'Door & Window Installation'],
    primaryService: 'General Carpentry',
    description: 'Serving Fresno, Clovis, and the Central Valley with residential carpentry, framing, and door/window replacement. Free estimates.',
    phone: phone('559', '2336680'),
    email: 'ben@cvcarpentry.example.com',
    address: '4560 N Blackstone Ave, Fresno, CA 93726',
    licenseNumber: '891227', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2006, rating: 4.6, reviewCount: 33,
    featured: true, verified: true,
  },
  {
    businessName: 'Fresno Deck & Pergola',
    ownerName: 'Sergio Diaz',
    city: 'Fresno', county: 'Fresno', region: 'Central Valley',
    services: ['Deck Building', 'General Carpentry'],
    primaryService: 'Deck Building',
    description: 'Outdoor living specialists in Fresno and Clovis. Composite decks, pergolas, and outdoor kitchens built for Central Valley summers.',
    phone: phone('559', '4907720'),
    email: 'sergio@fresnodecks.example.com',
    licenseNumber: '1061142', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2017, rating: 4.5, reviewCount: 16,
  },
  {
    businessName: 'Tower District Woodworks',
    ownerName: 'Nora Kelly',
    city: 'Fresno', county: 'Fresno', region: 'Central Valley',
    services: ['Furniture Making', 'Custom Cabinets'],
    primaryService: 'Furniture Making',
    description: 'Bespoke furniture and small-batch cabinetry from a Tower District workshop. Live-edge tables, built-ins, and custom mantels.',
    phone: phone('559', '8253340'),
    email: 'nora@towerwoodworks.example.com',
    licenseNumber: '1084421', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2021, rating: 4.9, reviewCount: 12,
  },

  // ===== Bakersfield =====
  {
    businessName: 'Kern County Carpentry',
    ownerName: 'Frank Alvarez',
    city: 'Bakersfield', county: 'Kern', region: 'Central Valley',
    services: ['General Carpentry', 'Framing'],
    primaryService: 'General Carpentry',
    description: 'Residential and light commercial carpentry across Bakersfield and Kern County. Framing, siding, and remodels.',
    phone: phone('661', '3271180'),
    email: 'frank@kerncarpentry.example.com',
    licenseNumber: '824190', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2004, rating: 4.4, reviewCount: 19,
  },
  {
    businessName: 'Bakersfield Cabinet Co.',
    ownerName: 'Tricia Nguyen',
    city: 'Bakersfield', county: 'Kern', region: 'Central Valley',
    services: ['Custom Cabinets', 'Cabinet Repair', 'Wood Flooring'],
    primaryService: 'Custom Cabinets',
    description: 'Custom cabinetry and hardwood floors for Bakersfield homes. Free in-home consultation and design.',
    phone: phone('661', '6654420'),
    email: 'tricia@bcabinetco.example.com',
    licenseNumber: '1017550', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2012, rating: 4.7, reviewCount: 23,
  },

  // ===== Los Angeles (5 listings) =====
  {
    businessName: 'Silver Lake Woodworks',
    ownerName: 'Maya Brooks',
    city: 'Los Angeles', county: 'Los Angeles', region: 'Southern California',
    services: ['Custom Cabinets', 'Furniture Making', 'Finish Carpentry'],
    primaryService: 'Custom Cabinets',
    description: 'Silver Lake-based woodshop building custom cabinetry, furniture, and built-ins for LA homes. Mid-century modern and craftsman specialties.',
    phone: phone('213', '4826680'),
    email: 'maya@silverlakewood.example.com',
    website: 'https://silverlakewood.example.com',
    address: '2820 Sunset Blvd, Los Angeles, CA 90026',
    licenseNumber: '1028441', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2015, rating: 4.9, reviewCount: 58,
    featured: true, verified: true,
  },
  {
    businessName: 'LA Framing Pros',
    ownerName: 'Tony Russo',
    city: 'Los Angeles', county: 'Los Angeles', region: 'Southern California',
    services: ['Framing', 'General Carpentry'],
    primaryService: 'Framing',
    description: 'Framing contractor serving all of Los Angeles. New construction, additions, and ADUs. Crew of 12 with 20+ years average experience.',
    phone: phone('213', '6645510'),
    email: 'tony@laframingpros.example.com',
    licenseNumber: '781220', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2001, rating: 4.5, reviewCount: 41,
  },
  {
    businessName: 'Venyl Finish Carpentry',
    ownerName: 'Jordan Mills',
    city: 'Los Angeles', county: 'Los Angeles', region: 'Southern California',
    services: ['Finish Carpentry', 'Trim & Molding', 'Door & Window Installation'],
    primaryService: 'Finish Carpentry',
    description: 'High-end finish carpentry for Venice, Mar Vista, and the Westside. Crown molding, paneling, doors, and built-ins.',
    phone: phone('310', '8224410'),
    email: 'jordan@venylfinish.example.com',
    licenseNumber: '1009214', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2013, rating: 4.7, reviewCount: 34,
  },
  {
    businessName: 'Pacific Deck Builders LA',
    ownerName: 'Stacy Kim',
    city: 'Los Angeles', county: 'Los Angeles', region: 'Southern California',
    services: ['Deck Building'],
    primaryService: 'Deck Building',
    description: 'Custom decks and outdoor living spaces across Los Angeles. Composite, hardwood, and pressure-treated options. Design-build service.',
    phone: phone('310', '9952280'),
    email: 'stacy@pacificdeckla.example.com',
    licenseNumber: '1047520', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2016, rating: 4.6, reviewCount: 28,
    featured: true, verified: true,
  },
  {
    businessName: 'Hollywood Custom Doors',
    ownerName: 'Vincent Cole',
    city: 'Los Angeles', county: 'Los Angeles', region: 'Southern California',
    services: ['Door & Window Installation', 'Custom Cabinets'],
    primaryService: 'Door & Window Installation',
    description: 'Custom doors for Hollywood Hills and the rest of LA. Mahogany front doors, custom interior doors, and historic reproductions.',
    phone: phone('323', '8561190'),
    email: 'vincent@hollywooddoors.example.com',
    licenseNumber: '1076643', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2018, rating: 4.8, reviewCount: 19,
  },

  // ===== San Diego =====
  {
    businessName: 'San Diego Carpentry Co.',
    ownerName: 'Henry Wallace',
    city: 'San Diego', county: 'San Diego', region: 'Southern California',
    services: ['General Carpentry', 'Framing', 'Deck Building'],
    primaryService: 'General Carpentry',
    description: 'Full-service carpentry contractor serving San Diego County. Residential framing, decks, and remodels. Licensed and insured.',
    phone: phone('619', '2346680'),
    email: 'henry@sdcarpentryco.example.com',
    address: '3939 Normal St, San Diego, CA 92103',
    licenseNumber: '778220', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2002, rating: 4.6, reviewCount: 47,
    featured: true, verified: true,
  },
  {
    businessName: 'Pacific Beach Cabinets',
    ownerName: 'Lisa Anderson',
    city: 'San Diego', county: 'San Diego', region: 'Southern California',
    services: ['Custom Cabinets', 'Cabinet Repair'],
    primaryService: 'Custom Cabinets',
    description: 'Custom kitchen and bath cabinets built in our PB shop. Coastal-style and modern designs a specialty.',
    phone: phone('619', '4882210'),
    email: 'lisa@pbcabinets.example.com',
    licenseNumber: '1027320', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2014, rating: 4.7, reviewCount: 25,
  },
  {
    businessName: 'North County Woodworks',
    ownerName: 'Patricia Sullivan',
    city: 'San Diego', county: 'San Diego', region: 'Southern California',
    services: ['Furniture Making', 'Custom Cabinets', 'Wood Flooring'],
    primaryService: 'Furniture Making',
    description: 'Handcrafted furniture, cabinetry, and hardwood floors serving North County San Diego. Live-edge and reclaimed wood specialists.',
    phone: phone('760', '4441190'),
    email: 'pat@ncwoodworks.example.com',
    licenseNumber: '1072881', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2019, rating: 4.9, reviewCount: 16,
  },

  // ===== Long Beach =====
  {
    businessName: 'Long Beach Trim & Carpentry',
    ownerName: 'Aaron Reed',
    city: 'Long Beach', county: 'Los Angeles', region: 'Southern California',
    services: ['Trim & Molding', 'Door & Window Installation', 'Finish Carpentry'],
    primaryService: 'Trim & Molding',
    description: 'Trim carpentry and finish work for Long Beach and the South Bay. Baseboards, casing, crown molding, and door installation.',
    phone: phone('562', '4356680'),
    email: 'aaron@lbtrim.example.com',
    licenseNumber: '991421', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2010, rating: 4.5, reviewCount: 22,
  },
  {
    businessName: 'Shoreline Cabinets & Decks',
    ownerName: 'Mike Tran',
    city: 'Long Beach', county: 'Los Angeles', region: 'Southern California',
    services: ['Custom Cabinets', 'Deck Building'],
    primaryService: 'Custom Cabinets',
    description: 'Kitchen cabinets and outdoor decks serving Long Beach and coastal LA. Design-build services for full kitchen and outdoor transformations.',
    phone: phone('562', '9871120'),
    email: 'mike@shorelinecd.example.com',
    licenseNumber: '1058293', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2016, rating: 4.7, reviewCount: 18,
  },

  // ===== Anaheim =====
  {
    businessName: 'Anaheim Carpentry & Build',
    ownerName: 'George Mitchell',
    city: 'Anaheim', county: 'Orange', region: 'Southern California',
    services: ['General Carpentry', 'Framing', 'Deck Building'],
    primaryService: 'General Carpentry',
    description: 'Residential carpentry contractor serving Anaheim and North Orange County. Framing, decks, and full remodels.',
    phone: phone('714', '7762290'),
    email: 'george@anaheimcarp.example.com',
    licenseNumber: '928401', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2007, rating: 4.5, reviewCount: 31,
  },
  {
    businessName: 'Orange County Cabinets',
    ownerName: 'Sophie Laurent',
    city: 'Anaheim', county: 'Orange', region: 'Southern California',
    services: ['Custom Cabinets', 'Cabinet Repair', 'Wood Flooring'],
    primaryService: 'Custom Cabinets',
    description: 'Custom cabinetry and hardwood floors for Orange County homes. European-style frameless cabinets a specialty.',
    phone: phone('714', '2346610'),
    email: 'sophie@occabinets.example.com',
    licenseNumber: '1041234', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2013, rating: 4.8, reviewCount: 27,
    featured: true, verified: true,
  },

  // ===== Santa Ana =====
  {
    businessName: 'Santa Ana Woodworks',
    ownerName: 'Diego Castro',
    city: 'Santa Ana', county: 'Orange', region: 'Southern California',
    services: ['General Carpentry', 'Custom Cabinets', 'Door & Window Installation'],
    primaryService: 'General Carpentry',
    description: 'Family-run carpentry shop in downtown Santa Ana serving all of Orange County. Custom cabinets, doors, and trim. Bilingual service.',
    phone: phone('714', '5472280'),
    email: 'diego@sawoodworks.example.com',
    address: '1100 N Main St, Santa Ana, CA 92701',
    licenseNumber: '981430', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2009, rating: 4.6, reviewCount: 24,
  },
  {
    businessName: 'Civic Center Carpentry',
    ownerName: 'Olivia Bennett',
    city: 'Santa Ana', county: 'Orange', region: 'Southern California',
    services: ['Finish Carpentry', 'Trim & Molding'],
    primaryService: 'Finish Carpentry',
    description: 'Finish carpentry and trim work for Santa Ana and Orange County remodels. Detail-oriented, design-conscious craftsmanship.',
    phone: phone('714', '8321190'),
    email: 'olivia@civiccarp.example.com',
    licenseNumber: '1088224', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2020, rating: 4.7, reviewCount: 9,
  },

  // ===== Riverside =====
  {
    businessName: 'Riverside Carpentry Pros',
    ownerName: 'Curtis Hall',
    city: 'Riverside', county: 'Riverside', region: 'Southern California',
    services: ['General Carpentry', 'Framing', 'Deck Building'],
    primaryService: 'General Carpentry',
    description: 'Residential carpentry contractor serving Riverside and the Inland Empire. Framing, decks, pergolas, and remodels. Free estimates.',
    phone: phone('951', '6826680'),
    email: 'curtis@riversidepros.example.com',
    address: '3637 9th St, Riverside, CA 92501',
    licenseNumber: '884201', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2005, rating: 4.4, reviewCount: 36,
  },
  {
    businessName: 'Inland Empire Cabinets',
    ownerName: 'Janet Reyes',
    city: 'Riverside', county: 'Riverside', region: 'Southern California',
    services: ['Custom Cabinets', 'Cabinet Repair'],
    primaryService: 'Custom Cabinets',
    description: 'Custom kitchen and bath cabinetry for Riverside and San Bernardino counties. Cabinet refacing available.',
    phone: phone('951', '3547780'),
    email: 'janet@iecabinets.example.com',
    licenseNumber: '1037214', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2014, rating: 4.6, reviewCount: 18,
  },

  // ===== Irvine =====
  {
    businessName: 'Irvine Custom Carpentry',
    ownerName: 'David Park',
    city: 'Irvine', county: 'Orange', region: 'Southern California',
    services: ['Custom Cabinets', 'Finish Carpentry', 'Wood Flooring'],
    primaryService: 'Custom Cabinets',
    description: 'High-end custom carpentry for Irvine and South Orange County. Custom cabinetry, hardwood floors, and finish work for luxury homes.',
    phone: phone('949', '5526680'),
    email: 'david@irvinecc.example.com',
    licenseNumber: '1008421', licenseClass: 'B', licenseStatus: 'Active',
    yearEstablished: 2012, rating: 4.8, reviewCount: 33,
    featured: true, verified: true,
  },
  {
    businessName: 'Woodbridge Woodworks',
    ownerName: 'Karen Stewart',
    city: 'Irvine', county: 'Orange', region: 'Southern California',
    services: ['Furniture Making', 'Custom Cabinets'],
    primaryService: 'Furniture Making',
    description: 'Handcrafted furniture and small-batch cabinetry from our Woodbridge workshop. Live-edge tables, built-ins, and custom doors.',
    phone: phone('949', '8571120'),
    email: 'karen@woodbridgewood.example.com',
    licenseNumber: '1076234', licenseClass: 'C-6', licenseStatus: 'Active',
    yearEstablished: 2019, rating: 4.9, reviewCount: 14,
  },
]

async function main() {
  console.log(`Seeding ${listings.length} listings across ${CITIES.length} California cities...`)

  // Clear existing data
  await db.listing.deleteMany({})
  await db.submission.deleteMany({})

  for (const item of listings) {
    await db.listing.create({
      data: {
        businessName: item.businessName,
        slug: slug(item.businessName, item.city),
        ownerName: item.ownerName ?? null,
        city: item.city,
        county: item.county,
        region: item.region,
        services: item.services.join(', '),
        primaryService: item.primaryService,
        description: item.description,
        phone: item.phone,
        email: item.email,
        website: item.website ?? null,
        address: item.address ?? null,
        licenseNumber: item.licenseNumber,
        licenseClass: item.licenseClass,
        licenseStatus: item.licenseStatus,
        yearEstablished: item.yearEstablished ?? null,
        rating: item.rating,
        reviewCount: item.reviewCount,
        featured: item.featured ?? false,
        verified: item.verified ?? false,
        status: 'published',
      },
    })
  }

  // Stats
  const total = await db.listing.count()
  const featured = await db.listing.count({ where: { featured: true } })
  const verified = await db.listing.count({ where: { verified: true } })
  const byCity = await db.listing.groupBy({
    by: ['city'],
    _count: { _all: true },
    orderBy: { _count: { city: 'desc' } },
  })

  console.log(`\nDone. ${total} listings seeded.`)
  console.log(`  Featured: ${featured}`)
  console.log(`  Verified: ${verified}`)
  console.log(`  Cities with listings: ${byCity.length}`)
  byCity.forEach((c) => console.log(`    ${c.city}: ${c._count._all}`))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
