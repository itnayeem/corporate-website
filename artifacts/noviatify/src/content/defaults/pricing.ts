export const pricing = {
  hero: {
    eyebrow: "Pricing",
    title: "Simple, transparent pricing",
    subtitle:
      "Choose the formation package that fits your business. No hidden fees, no surprises — just pay the state fee and we handle the rest.",
  },
  packagesSection: {
    title: "Formation Packages",
    subtitle: "Everything you need to launch your company and stay compliant.",
    includesLabel: "What's included",
  },
  packages: [
    {
      name: "Starter",
      price: "$0",
      period: "+ state fee",
      description: "Everything you need to officially form your company.",
      badge: "",
      highlighted: false,
      features: [
        "Company name availability check",
        "Articles of Organization filing",
        "Online order tracking",
        "Lifetime customer support",
      ],
      ctaLabel: "Get Started",
      ctaHref: "https://start.noviatify.io",
    },
    {
      name: "Pro",
      price: "$199",
      period: "/ year",
      description: "Stay compliant and look professional from day one.",
      badge: "Most Popular",
      highlighted: true,
      features: [
        "Everything in Starter",
        "Registered Agent service",
        "EIN / Tax ID filing",
        "Custom Operating Agreement",
        "Compliance & deadline reminders",
      ],
      ctaLabel: "Choose Pro",
      ctaHref: "https://start.noviatify.io",
    },
    {
      name: "Premium",
      price: "$299",
      period: "/ year",
      description: "The complete done-for-you formation experience.",
      badge: "",
      highlighted: false,
      features: [
        "Everything in Pro",
        "Expedited 24-hour filing",
        "Business banking resolution",
        "Custom company kit & seal",
        "Priority phone support",
      ],
      ctaLabel: "Choose Premium",
      ctaHref: "https://start.noviatify.io",
    },
  ],
  cta: {
    title: "Not sure which package is right?",
    subtitle:
      "Start your formation in minutes — you can always upgrade later as your business grows.",
    primary: { label: "Start Your Business", href: "https://start.noviatify.io" },
    secondary: { label: "Talk to an Expert", href: "/about/contact" },
  },
};
