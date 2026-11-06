// SEO content articles for the Resources section.
// Each article targets specific keywords and provides genuinely useful
// information for California homeowners looking to hire carpenters.

export type Article = {
  slug: string
  title: string
  description: string
  keywords: string[]
  category: "Hiring Guide" | "Cost Guide" | "Permits & Legal" | "License Guide"
  readTime: string
  lastUpdated: string
  content: ArticleSection[]
  faq?: { question: string; answer: string }[]
}

export type ArticleSection = {
  heading: string
  body: string[]
  list?: string[]
}

export const ARTICLES: Article[] = [
  {
    slug: "how-to-hire-carpenter-california",
    title: "How to Hire a Licensed Carpenter in California",
    description:
      "Step-by-step guide to hiring a licensed carpenter in California. Verify CSLB licenses, get multiple bids, check insurance, and sign a proper contract before any work starts.",
    keywords: [
      "hire carpenter California",
      "CSLB license verification",
      "carpenter near me",
      "licensed contractor California",
      "how to hire a contractor",
    ],
    category: "Hiring Guide",
    readTime: "8 min read",
    lastUpdated: "November 2026",
    content: [
      {
        heading: "Why licensing matters in California",
        body: [
          "In California, any home improvement project valued at $1,000 or more (labor plus materials) requires a contractor licensed by the California Contractors State License Board (CSLB). This threshold increased from $500 to $1,000 on January 1, 2025 under Assembly Bill 2622.",
          "Hiring an unlicensed contractor for a project above this threshold is illegal and leaves you with no recourse if the work is poor or incomplete. Unlicensed workers cannot pull permits, cannot legally advertise for projects over $1,000, and their work isn't covered by the CSLB's dispute resolution process.",
          "For carpentry specifically, you're typically looking for either a Class B (General Building) contractor or a Class C-6 (Cabinet and Millwork) specialty contractor, depending on the scope of work.",
        ],
      },
      {
        heading: "Step 1: Verify the CSLB license",
        body: [
          "Before hiring any carpenter, look up their CSLB license number on the official CSLB website at cslb.ca.gov/CheckALicense. The license search shows you:",
        ],
        list: [
          "License number and classification (B, C-5, C-6, etc.)",
          "Business name and DBA (Doing Business As)",
          "License status (Active, Inactive, Expired, Suspended)",
          "Expiration date",
          "Bond information (contractors must post a $25,000 surety bond)",
          "Workers' compensation insurance status",
          "Disciplinary actions or complaints on file",
          "Owner name and license issue date",
        ],
      },
      {
        heading: "Step 2: Get at least three written bids",
        body: [
          "Never accept a single bid. Get at least three written estimates from licensed carpenters. A legitimate bid should include:",
          "Be wary of bids that are dramatically lower than the others — this often signals a contractor who cuts corners, uses inferior materials, or plans to add change orders later.",
        ],
        list: [
          "Detailed scope of work (what's included and what's not)",
          "Material specifications (wood species, grade, brand)",
          "Labor cost breakdown",
          "Payment schedule (never pay more than 10% or $1,000 upfront, whichever is less)",
          "Estimated start and completion dates",
          "Warranty information",
          "Permit responsibilities (who pulls the permit)",
        ],
      },
      {
        heading: "Step 3: Check insurance and bonds",
        body: [
          "Every licensed California contractor must carry a $25,000 surety bond. But that's the minimum — for larger projects, ask about additional coverage:",
          "Ask for certificates of insurance directly from the contractor's insurance company, not photocopies. A legitimate contractor will happily provide these.",
        ],
        list: [
          "General liability insurance (minimum $1 million recommended)",
          "Workers' compensation insurance (required if they have employees)",
          "Commercial auto insurance (if they'll be driving materials to your site)",
        ],
      },
      {
        heading: "Step 4: Sign a proper contract",
        body: [
          "California law requires written contracts for any home improvement project over $500. The contract must include specific elements under the Home Improvement Act:",
          "Never sign a contract with blank spaces. Never pay in cash. Never let work start without a signed contract — verbal agreements are nearly impossible to enforce.",
        ],
        list: [
          "Contractor's name, address, license number, and phone",
          "Description of work and materials (including brand, model, color)",
          "Total contract price and payment schedule",
          "Start date and estimated completion date",
          "Notice of cancellation (you have 3 business days to cancel without penalty)",
          "Permit and inspection responsibilities",
          "Warranty terms (implied 1-year warranty under California law)",
        ],
      },
      {
        heading: "Step 5: Manage the project",
        body: [
          "Once work begins, stay involved. Schedule regular check-ins, document progress with photos, and address concerns early. Don't make the final payment until:",
          "Keep records of everything — contracts, change orders, payment receipts, correspondence, photos. If a dispute arises, you'll need documentation to file a complaint with the CSLB.",
        ],
        list: [
          "All work is complete per the contract",
          "All required inspections have passed",
          "Lien releases are provided by the contractor and any subcontractors",
          "You've received written warranty documentation",
        ],
      },
    ],
    faq: [
      {
        question: "What if my project is under $1,000?",
        answer: "Projects under $1,000 (labor + materials) don't legally require a licensed contractor under AB 2622. However, you still want someone experienced and insured. A carpenter doing small jobs without a license is often called a 'handyman' — verify they carry liability insurance even if they're not CSLB-licensed.",
      },
      {
        question: "Can I pull the permit myself to save money?",
        answer: "California allows homeowners to pull permits as an 'Owner-Builder,' but you become responsible for the work meeting code. If you hire an unlicensed worker under an Owner-Builder permit, you may be held liable for injuries or code violations. For anything structural (decks over 30 inches high, framing changes, etc.), use a licensed contractor.",
      },
      {
        question: "How do I file a complaint against a contractor?",
        answer: "File a complaint with the CSLB at cslb.ca.gov or call 1-800-321-CSLB. You'll need the contractor's license number, the contract, and documentation of the issue. The CSLB can order the contractor to fix the work, refund money, or suspend/revoke their license.",
      },
    ],
  },
  {
    slug: "custom-cabinets-cost-california",
    title: "Custom Cabinets Cost in California (2026 Guide)",
    description:
      "How much do custom cabinets cost in California in 2026? Pricing breakdown for kitchens, bathrooms, and built-ins in the Bay Area, Los Angeles, San Diego, and Sacramento.",
    keywords: [
      "custom cabinets cost",
      "custom kitchen cabinets California",
      "cabinet pricing Bay Area",
      "how much do cabinets cost",
      "cabinet maker prices",
    ],
    category: "Cost Guide",
    readTime: "6 min read",
    lastUpdated: "November 2026",
    content: [
      {
        heading: "Average cost of custom cabinets in California",
        body: [
          "Custom cabinetry pricing varies widely based on materials, finishes, hardware, complexity, and your location within California. Based on 2026 estimates from Bay Area and Southern California cabinet shops:",
          "These prices are for the cabinetry only — installation, countertops, plumbing, electrical, and demolition are separate.",
        ],
        list: [
          "Standard custom kitchen (10x10 feet): $20,000 – $45,000",
          "High-end custom kitchen (premium hardwoods, soft-close, integrated lighting): $45,000 – $80,000+",
          "Custom bathroom vanity: $3,000 – $12,000",
          "Built-in bookshelves / entertainment center: $5,000 – $25,000",
          "Custom closet systems: $3,000 – $15,000",
          "Mudroom built-ins: $4,000 – $12,000",
        ],
      },
      {
        heading: "Factors that affect cabinet cost",
        body: [
          "Several variables drive the final price of your custom cabinets:",
        ],
        list: [
          "Wood species: Oak and maple start around $200/linear foot. Cherry and walnut run $300–500/linear foot. Exotic hardwoods (ipe, zebrawood) can exceed $800/linear foot.",
          "Door style: Shaker (flat recessed panel) is the most affordable. Raised panel, arched, and mitered doors add 15–30% to the cost.",
          "Finish: Stained is cheapest. Painted requires extra primer coats and adds 10–15%. Glazed, distressed, or specialty finishes add 20–40%.",
          "Hardware: Basic hinges and knobs are included. Soft-close hinges add $15–30 per door. Premium pulls and knobs run $10–50 each.",
          "Cabinet construction: Face-frame (traditional) is cheaper than frameless (European-style). Inset doors (where the door sits flush inside the frame) add 25–40% due to precision requirements.",
          "Interior accessories: Pull-out shelves, lazy Susans, drawer dividers, spice racks, and trash pullouts each add $100–500.",
        ],
      },
      {
        heading: "Regional pricing differences in California",
        body: [
          "Cabinet costs vary significantly across California regions due to labor and overhead differences:",
          "In high-cost markets like San Francisco and Silicon Valley, cabinet shops often charge a 20–35% premium over the state average. In the Central Valley and Inland Empire, prices are closer to the national average.",
        ],
        list: [
          "Bay Area (SF, Oakland, San Jose): Highest — 20-35% above state average",
          "Los Angeles / Orange County: High — 10-25% above state average",
          "San Diego: Moderate-high — 5-15% above state average",
          "Sacramento: Near state average",
          "Central Valley (Fresno, Bakersfield, Stockton): Below state average",
          "Inland Empire (Riverside, San Bernardino): Below state average",
        ],
      },
      {
        heading: "Stock vs. Semi-Custom vs. Custom",
        body: [
          "Understanding the three tiers of cabinetry helps you make the right choice for your budget:",
        ],
        list: [
          "Stock cabinets: Mass-produced in standard sizes (typically 3-inch increments). Limited finishes and door styles. $100–300/linear foot. Available in 1–3 weeks.",
          "Semi-custom: Stock boxes with some modification options (depth, height, finish). $200–500/linear foot. 4–8 week lead time.",
          "Custom: Built to your exact specifications, any size, any configuration, any wood species. $400–1,200+/linear foot. 6–12 week lead time.",
        ],
      },
      {
        heading: "Getting an accurate quote",
        body: [
          "Cabinet makers need specific information to give you an accurate quote. When you contact a carpenter through Oakland Carpenter, have ready:",
          "Be clear about your budget upfront — a good cabinet maker will tell you if your budget is realistic and suggest alternatives that meet your needs.",
        ],
        list: [
          "Room dimensions (length, width, ceiling height)",
          "Photos of the current space",
          "Number and type of cabinets needed (base, wall, tall, corner)",
          "Preferred door style and wood species (or ask for recommendations)",
          "Hardware preferences (knobs vs pulls, finish)",
          "Appliance dimensions (for built-in panels and clearances)",
          "Timeline constraints",
        ],
      },
    ],
    faq: [
      {
        question: "Are custom cabinets worth the extra cost over stock cabinets?",
        answer: "If your kitchen has unusual dimensions, you want a specific wood or finish not available in stock lines, or you plan to stay in the home 10+ years, custom cabinets are worth it. They last 30–50 years (vs 15–25 for stock) and add resale value. For a starter home you'll sell in 5 years, semi-custom is usually the sweet spot.",
      },
      {
        question: "Why is there such a wide price range between cabinet makers?",
        answer: "Price reflects materials, construction quality, finish process, and the shop's overhead. A one-person shop working from a garage has lower overhead than a 20-person shop with a showroom. Both can produce quality work — but get references and see examples of finished projects before deciding.",
      },
    ],
  },
  {
    slug: "deck-building-permit-california",
    title: "Deck Building Permits in California — What You Need to Know",
    description:
      "Do you need a permit to build a deck in California? Permit requirements by city, setbacks, height limits, and what happens if you skip the permit.",
    keywords: [
      "deck permit California",
      "deck building permit",
      "do I need a permit to build a deck",
      "deck permit Oakland",
      "deck permit Los Angeles",
    ],
    category: "Permits & Legal",
    readTime: "7 min read",
    lastUpdated: "November 2026",
    content: [
      {
        heading: "When is a deck permit required in California?",
        body: [
          "Permit requirements for decks vary by city and county in California, but most jurisdictions follow similar rules based on the California Residential Code. In general, you need a building permit for a deck if:",
        ],
        list: [
          "The deck is attached to the house (even if just a ledger board)",
          "The deck is more than 30 inches above grade at any point",
          "The deck is over 200 square feet (some cities use 120 sq ft)",
          "The deck will serve as an exit from the house",
          "The deck includes a roof, pergola, or overhead structure",
          "The deck includes built-in seating, planters, or hot tubs",
        ],
      },
      {
        heading: "Oakland deck permit requirements",
        body: [
          "In Oakland, decks require a Building Permit. Design Review may also be required depending on your zoning. The Oakland Building Bureau uses these thresholds:",
          "Even if your deck falls under the square footage threshold, you still need a permit if it's attached to the house or 30+ inches above grade. Oakland requires a Site Plan, foundation plan, and framing plan for deck permits.",
        ],
        list: [
          "Decks 30 inches or more above grade: permit required if 250 sq ft or larger",
          "Decks under 30 inches: permit required if attached to the house OR over 200 sq ft",
          "Freestanding decks under 30 inches high and under 200 sq ft: no permit required",
          "All decks need to meet setback requirements (typically 5 ft from side property lines, 15 ft from rear)",
        ],
      },
      {
        heading: "Los Angeles deck permit requirements",
        body: [
          "The Los Angeles Department of Building and Safety (LADBS) requires a permit for any deck that is:",
          "LA also has specific requirements for hillside properties (Basilone/Hillside Ordinance) that add restrictions on grading, drainage, and structural design.",
        ],
        list: [
          "Attached to a residential structure",
          "More than 30 inches above grade",
          "Over 200 square feet in area",
          "Located on a balcony, loggia, or covered porch",
        ],
      },
      {
        heading: "What happens if you skip the permit",
        body: [
          "Building a deck without a required permit can cause serious problems:",
          "If you're caught, you'll typically pay double the original permit fee as a penalty, plus the cost of any required inspections and corrections.",
        ],
        list: [
          "Code enforcement can issue stop-work orders and fines (often $100–$1,000/day in California cities)",
          "When you sell the house, buyers' inspectors will flag the unpermitted deck — you may have to remove it or pay for retroactive permits",
          "Homeowner's insurance may deny claims for damage caused by an unpermitted structure",
          "If the deck collapses and injures someone, you can be held personally liable",
          "Mortgage lenders may refuse to finance a property with unpermitted structures",
        ],
      },
      {
        heading: "What to include in your deck permit application",
        body: [
          "Most California cities require similar documentation for a deck permit:",
          "Your contractor (if licensed) usually pulls the permit for you. If you're an Owner-Builder, you take on personal liability for code compliance.",
        ],
        list: [
          "Site plan showing property lines, setbacks, and deck location",
          "Foundation plan (footings, posts, post-to-beam connections)",
          "Framing plan (joist size, spacing, beam size, ledger board attachment)",
          "Cross-section drawings showing height above grade and railing details",
          "Material specifications (pressure-treated wood, composite, hardwood)",
          "Structural calculations if the deck is unusually large or high",
        ],
      },
      {
        heading: "Inspection timeline",
        body: [
          "Most deck projects require 3 inspections:",
          "Don't skip inspections — if the inspector finds issues, you can fix them before they're buried under the next phase. A failed final inspection means you can't legally use the deck.",
        ],
        list: [
          "Footing inspection: after holes are dug, before concrete is poured",
          "Framing inspection: after joists and beams are in place, before decking boards go on",
          "Final inspection: after the deck is complete, including railings and stairs",
        ],
      },
    ],
    faq: [
      {
        question: "How long does it take to get a deck permit in California?",
        answer: "Permit turnaround varies by city and season. Oakland and LA typically take 2–6 weeks for deck permits. Smaller cities may take 1–2 weeks. Expedited review is sometimes available for an additional fee. Plan ahead — don't schedule your contractor until the permit is approved.",
      },
      {
        question: "Can I build a deck myself without a contractor?",
        answer: "Yes, as an Owner-Builder you can pull the permit and build the deck yourself. But you must personally do or directly supervise the work, and you're responsible for code compliance. Many cities require you to sign a statement acknowledging you can't hire an unlicensed worker under an Owner-Builder permit.",
      },
      {
        question: "Do composite decks (Trex, TimberTech) require permits?",
        answer: "Yes — permit requirements are based on the deck's size, height, and attachment, not the material. Composite decking has the same code requirements as wood. In fact, some composite manufacturers require specific fastener spacing and joist spans that your plans must show.",
      },
    ],
  },
  {
    slug: "california-contractor-license-classes",
    title: "California Contractor License Classes Explained (B, C-5, C-6)",
    description:
      "What do CSLB license classes mean? Understand Class B (General Building), C-5 (Flooring), C-6 (Cabinet & Millwork), and which license your carpentry project requires.",
    keywords: [
      "CSLB license classes",
      "Class B contractor",
      "C-6 cabinet license",
      "C-5 flooring license",
      "California contractor license types",
    ],
    category: "License Guide",
    readTime: "5 min read",
    lastUpdated: "November 2026",
    content: [
      {
        heading: "How CSLB license classifications work",
        body: [
          "The California Contractors State License Board (CSLB) issues licenses in three categories:",
          "Each license requires the contractor to pass a trade-specific exam and demonstrate 4+ years of journey-level experience. The license class determines what work a contractor can legally perform.",
        ],
        list: [
          "Class A — General Engineering Contractor (roads, bridges, large infrastructure)",
          "Class B — General Building Contractor (residential and commercial structures)",
          "Class C — Specialty Contractor (42 subclassifications for specific trades)",
        ],
      },
      {
        heading: "Class B — General Building Contractor",
        body: [
          "A Class B license allows a contractor to work on any structure requiring at least two unrelated building trades. This is the most common license for residential carpenters who do framing, decks, additions, and remodels.",
          "A Class B contractor can:",
          "Class B is the right license for carpenters who handle whole-home remodels, additions, deck construction, framing, and other structural work.",
        ],
        list: [
          "Frame structures (walls, floors, roofs)",
          "Build decks, pergolas, and outdoor structures",
          "Install doors and windows",
          "Do whole-home remodeling",
          "Pull building permits for residential projects",
          "Coordinate subcontractors (plumbers, electricians) on a remodel",
        ],
      },
      {
        heading: "Class C-6 — Cabinet and Millwork Contractor",
        body: [
          "The C-6 classification is specifically for cabinet and millwork installation. A C-6 contractor specializes in:",
          "A C-6 contractor is the right choice for kitchen cabinet installation, custom built-ins, and finish carpentry. They typically don't do framing or structural work — for that, you need a Class B contractor.",
        ],
        list: [
          "Custom cabinet fabrication and installation",
          "Millwork (moldings, trim, casing, baseboards)",
          "Built-in furniture (bookcases, entertainment centers)",
          "Wood paneling and wainscoting",
          "Custom doors (interior and exterior wood doors)",
          "Staircases and stair parts",
        ],
      },
      {
        heading: "Class C-5 — Flooring and Floor Covering Contractor",
        body: [
          "The C-5 license covers installation of all types of flooring, including hardwood. If your carpentry project involves wood flooring installation, a C-5 or Class B contractor is appropriate.",
          "Note: many cabinet shops (C-6) also do wood flooring, but technically a C-5 or Class B license is required. In practice, CSLB allows a contractor to perform work outside their classification if it's incidental to their primary trade (less than 10% of the project cost).",
        ],
        list: [
          "Hardwood flooring (solid and engineered)",
          "Laminate and wood-look flooring",
          "Subfloor preparation",
          "Floor leveling and patching",
          "Underlayment installation",
          "Floor refinishing (sanding and resealing)",
        ],
      },
      {
        heading: "Other relevant C-class licenses",
        body: [
          "Other specialty licenses you might encounter for carpentry-adjacent work:",
        ],
        list: [
          "C-61/D-06 — Concrete (for deck footings, foundations)",
          "C-61/D-09 — Siding (for exterior wood siding)",
          "C-61/D-23 — Sandblasting (for refinishing)",
          "C-61/D-34 — Prefabricated structures (for modular components)",
        ],
      },
      {
        heading: "Which license should your carpenter have?",
        body: [
          "Match the license to the project scope:",
          "Always verify the license is appropriate for the work — a C-6 cabinet shop can't legally frame your addition, even if they offer to. Mixing trades without the right license can void your permits and insurance coverage.",
        ],
        list: [
          "Whole-home remodel, addition, or deck → Class B (General Building)",
          "Kitchen cabinets, built-ins, trim, millwork → C-6 (Cabinet & Millwork)",
          "Hardwood floor installation → C-5 (Flooring) or Class B",
          "Custom furniture → No license required if it's not installed (freestanding furniture is manufacturing, not contracting)",
          "Door/window installation only → Class B or C-6",
        ],
      },
    ],
    faq: [
      {
        question: "Can a Class B contractor install cabinets?",
        answer: "Yes. A Class B contractor can perform any building trade work including cabinet installation. However, a C-6 specialist often has more experience and better equipment for cabinet-specific work. For a kitchen remodel involving framing, drywall, electrical, and plumbing, a Class B contractor can coordinate everything; a C-6 shop typically only does the cabinets.",
      },
      {
        question: "How do I check what license class my contractor has?",
        answer: "Look up the license number on cslb.ca.gov/CheckALicense. The license detail page shows the classification (B, C-5, C-6, etc.) and any additional classifications the contractor holds. Some contractors hold multiple licenses (e.g., both B and C-6).",
      },
      {
        question: "What if a contractor says they're 'licensed' but won't give the number?",
        answer: "Walk away. Legitimate contractors display their license number on business cards, trucks, contracts, and advertising (it's required by law). If they won't provide the number, they're either unlicensed or their license is suspended. Either way, you have no protection if something goes wrong.",
      },
    ],
  },
];

// Helper: get an article by slug
export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

// Helper: get related articles (same category, excluding current)
export function getRelatedArticles(currentSlug: string, limit = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return [];
  return ARTICLES
    .filter((a) => a.slug !== currentSlug)
    .sort((a, b) => {
      // Prefer same category
      const aSame = a.category === current.category ? 0 : 1;
      const bSame = b.category === current.category ? 0 : 1;
      return aSame - bSame;
    })
    .slice(0, limit);
}
