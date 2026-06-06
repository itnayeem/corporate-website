export interface SitePage {
  label: string;
  path: string;
}

export interface SitePageGroup {
  group: string;
  pages: SitePage[];
}

/**
 * Directory of every public page on the site, shown to the admin so they can
 * find and open any page to edit it. Keep in sync with the routes in App.tsx.
 */
export const sitePages: SitePageGroup[] = [
  {
    group: "Main pages",
    pages: [
      { label: "Home", path: "/" },
      { label: "How It Works", path: "/how-it-works" },
      { label: "Services", path: "/services" },
      { label: "Pricing", path: "/pricing" },
      { label: "About Us", path: "/about" },
    ],
  },
  {
    group: "Service pages",
    pages: [
      { label: "LLC", path: "/services/llc" },
      { label: "C Corporation", path: "/services/c-corporation" },
      { label: "LTD", path: "/services/ltd" },
      { label: "S Corporation", path: "/services/s-corporation" },
      { label: "Registered Agent", path: "/services/registered-agent" },
      { label: "Annual Report", path: "/services/annual-report" },
      { label: "Foreign Qualification", path: "/services/foreign-qualification" },
      { label: "Certificate of Good Standing", path: "/services/good-standing" },
      { label: "Change of Registered Agent", path: "/services/change-agent" },
      { label: "Company Name Change", path: "/services/name-change" },
    ],
  },
  {
    group: "About pages",
    pages: [
      { label: "Partnerships", path: "/about/partnerships" },
      { label: "Blog", path: "/about/blog" },
      { label: "Contact Us", path: "/about/contact" },
    ],
  },
  {
    group: "Other pages",
    pages: [
      { label: "Order Status", path: "/order-status" },
      { label: "Research", path: "/research" },
      { label: "Start", path: "/start" },
      { label: "Login", path: "/login" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms", path: "/terms" },
    ],
  },
];
