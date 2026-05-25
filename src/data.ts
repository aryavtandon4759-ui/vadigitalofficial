import { DemoWebsite, ServiceItem } from "./types";

export const SERVICES: ServiceItem[] = [
  {
    id: "web-design",
    title: "Premium Website Design",
    description: "Ultra-fast, hand-crafted single-page and multi-page websites designed for high retention and maximum performance. No bloated builders.",
    iconName: "Monitor",
  },
  {
    id: "google-business",
    title: "Google Maps Mastery",
    description: "Claim, optimize, and index your local Google Business profiles to rank #1 in near-me searches and local Map packs.",
    iconName: "MapPin",
  },
  {
    id: "seo-setup",
    title: "Advanced Local SEO Audit",
    description: "Structured schema layouts, localized citation building, and key search rankings targets to keep your brand ahead of your competitors.",
    iconName: "Search",
  },
  {
    id: "booking",
    title: "Custom Booking Systems",
    description: "Integrate frictionless self-scheduling calendars, automated follow-ups, and customer pipeline management directly into your site.",
    iconName: "CalendarRange",
  },
  {
    id: "ai-chat",
    title: "24/7 AI Sales & Support Agents",
    description: "Sovereign conversational AI widgets that engage potential leads in English, Hindi & Hinglish, capturing bookings while you sleep.",
    iconName: "MessageSquareText",
  },
];

export const DEMO_WEBSITES: DemoWebsite[] = [
  {
    id: "gym",
    name: "Gym sample site",
    category: "Fitness & Conditioning Studio",
    tagline: "Forge Athlete-Level Strength",
    description: "High-performance hybrid training workspace offering intense coach bookings, custom program schedules, and vibrant high-contrast visual galleries.",
    thumbnailUrl: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800",
    accentClass: "from-blue-600 to-indigo-500",
    url: "https://gymsample1.vadigitalweb.workers.dev/",
    features: ["Class Schedule Planner", "Interactive Muscle Calculators", "Coach Schedulers"],
    mockPages: {}
  },
  {
    id: "real-estate",
    name: "Real estate sample site",
    category: "High-End Property Brokerage",
    tagline: "Commanding Architectural Masterpieces",
    description: "Cinematic real estate portal featuring high-altitude villas, detailed floor spec diagnostics, and elite personalized direct scheduling screens.",
    thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    accentClass: "from-slate-700 to-zinc-900",
    url: "https://realestatesample.vadigitalweb.workers.dev/",
    features: ["Premium Interactive Grid", "Asset Verification Protocol", "Live VIP Walkthrough Call Setup"],
    mockPages: {}
  },
  {
    id: "furniture-shop",
    name: "Furniture shop sample site",
    category: "Boutique Design Showroom",
    tagline: "Timeless Comfort for Modern Spaces",
    description: "Minimalist, visually rich furniture e-catalog showcase displaying hand-carved wood, organic cotton upholstery, and custom architectural accessories.",
    thumbnailUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    accentClass: "from-amber-600 to-yellow-500",
    url: "https://furnitureshopsample1.vadigitalweb.workers.dev/",
    features: ["Curated Structural Catalog", "In-Showroom VIP Slots Booking", "Acoustic Room Consultation"],
    mockPages: {}
  },
  {
    id: "eye-clinic",
    name: "Eye clinic sample site",
    category: "Medical Eye Clinic",
    tagline: "World-Class Vision, Trusted Care",
    description: "Elegant, medical-grade web design showcasing laser vision correction, pediatric refraction checkups, and instant appointment confirmation.",
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    accentClass: "from-sky-500 to-cyan-400",
    url: "https://eyeclinic2.vadigitalweb.workers.dev/",
    features: ["Patient Intake Flow", "Ophthalmic Services List", "2-Way Doctor Calendar Booking"],
    mockPages: {}
  }
];
