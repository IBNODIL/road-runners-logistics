export const img = (id: string) => `/img/${id}`;

/** Coloured logo (dark text) for light backgrounds; white variant for dark hero backgrounds. */
export const LOGO = img("7HJL1Ok64PZjSODsrtHX6g420U.png");
export const LOGO_LIGHT = img("qvT2G6NI27Sd7svIj5gXCoPAiFI.png");

export const services = [
  { slug: "road-freight", title: "Truck Freight", img: "REvJ9qimdoodf8EFmRmyNVFg.png", text: "Reliable truck freight across city, regional and international routes — with flexible transport that fits your schedule.", icon: "truck" },
  { slug: "sovutgichli-yuk", title: "Refrigerated Freight", img: "3pVXYmhs9gF56OEjGsAuWY5mJ6U.png", text: "We deliver food, pharmaceuticals and other temperature-sensitive cargo safely in refrigerated trucks at exactly the right temperature.", icon: "snow" },
  { slug: "yirik-gabaritli-yuk", title: "Oversized Cargo", img: "EuPIE8Zbe0zklXSq4yM4jznf0o.png", text: "We safely transport heavy machinery, construction materials and oversized loads on open flatbed trailers.", icon: "box" },
  { slug: "warehouse-services", title: "Warehousing", img: "hY8MGAdkyziTY6C3PoEkA2THLg.jpg", text: "Secure storage, inventory handling, and distribution support designed to keep your products where they need to be.", icon: "warehouse" },
  { slug: "customs-clearance", title: "Customs Clearance", img: "ZwlwpMOAaYEXNn1ToBqROp1IyO0.png", text: "Clear documentation and experienced support to help your shipments move through customs with fewer delays.", icon: "doc" },
  { slug: "supply-chain", title: "Logistics Management", img: "iJoI819hSEeTakFN0h77x8ldbR8.png", text: "End-to-end logistics planning that connects transportation, storage, distribution, and delivery into one coordinated operation.", icon: "cycle" },
];

export const industries = [
  { slug: "automotive", title: "Automotive", img: "Zyu0nymNN5GPdrJZ1vmWstEa4.jpg" },
  { slug: "manufacturing", title: "Manufacturing", img: "ksX3dgeJt9IBRtwVbdsdFMwAk.jpg" },
  { slug: "retail", title: "Retail", img: "r4N5pkNbgZhzhU1kP5eHhaW5b0.jpg" },
  { slug: "healthcare", title: "Healthcare", img: "eI35rlhzMdL1op68ko49c675go0.jpg" },
  { slug: "technology", title: "Technology", img: "lKt7OpRChWyDIVFHFRdtrK8ff4.jpg" },
  { slug: "construction", title: "Construction", img: "YGHjduK32BgrsJoXBZnUPIIzFg.jpg" },
  { slug: "food-beverage", title: "Food & Beverage", img: "WhaNfuUKI4LVhU4lOfQllQ1QeuA.jpg" },
  { slug: "ecommerce", title: "Ecommerce", img: "svu2dLUwG0V6II5Olk8zjojj5ww.jpg" },
  { slug: "energy-utilities", title: "Energy & Utilities", img: "Qo6W1mTeHP3v8oObi8g81XC3qaY.jpg" },
];

export const posts = [
  { slug: "time-critical-freight-delivery", cat: "Transportation", title: "Time-Critical Freight Delivery", img: "6DtdDpWhYSFRPUGevO3A5aTHQY.png", text: "Reliable planning keeps time-sensitive shipments moving smoothly and arriving exactly when expected." },
  { slug: "dedicated-project-managers", cat: "Logistics", title: "Dedicated Project Managers", img: "u5l2QXpeQxL4FrrdwYvGjI7114.png", text: "Simplifying complex shipments via clear communication, proactive planning, and coordination." },
  { slug: "connecting-global-supply-chains", cat: "Supply Chain", title: "Connecting Global Supply Chains", img: "P8byKSjsrwC2OE5oVxatevIodmI.png", text: "Coordinated international logistics for efficient movement of goods across borders and diverse markets." },
  { slug: "simplifying-complex-logistics-routes", cat: "Logistics", title: "Simplifying Complex Logistics Routes", img: "2EnTjuDzq1FOx3IVTPFV7D3RSRE.jpg", text: "Smart planning that turns challenging operations into efficient, reliable delivery solutions." },
  { slug: "real-time-visibility-peace", cat: "Technology", title: "Real-Time Visibility Peace", img: "qCKkSVZYSyMfuhOeqYDQU3alc.jpg", text: "Track shipments, anticipate issues, and make informed decisions with full transparency." },
  { slug: "24-7-emergency-response", cat: "Technology", title: "24/7 Emergency Response", img: "KSlWuq777vd8m50f7DBsaQMEc.jpg", text: "Rapid, responsive teams that handle disruptions and protect your critical deadlines." },
];

export const contact = {
  email: "Boisov@gmail.com",
  hours: "8:00 AM – 4:00 PM",
  address: "Tīnūžu iela 1A-25, Riga, LV-1021, Latvia",
  map: "https://maps.google.com/?q=Tinuzu+iela+1A,+Riga,+LV-1021,+Latvia",
};

export const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", menu: "services" as const },
  { label: "Industries", href: "/industries", menu: "industries" as const },
  { label: "Routes", href: "/global-network" },
  { label: "Contact", href: "/contact" },
];
