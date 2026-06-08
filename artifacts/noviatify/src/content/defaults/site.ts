export const site = {
  brand: {
    name: "Noviatify",
    slogan: "Business formation, made effortless.",
    logoUrl: "",
    faviconUrl: "",
    // Tidio live-chat public key (from your Tidio project URL,
    // e.g. code.tidio.co/<KEY>.js). Empty = chat disabled.
    tidioKey: "",
  },
  nav: {
    home: "Home",
    howItWorks: "How It Works",
    services: "Services",
    about: "About Us",
    pricing: "Pricing",
    pricingHref: "/pricing",
    login: "Login",
    loginHref: "/login",
    startCta: "Start Now",
    startHref: "/start",
    viewAllServices: "View All Services →",
    viewAllServicesHref: "/services",
    serviceLinks: [
      { label: "Get a Registered Agent", href: "/services/registered-agent" },
      { label: "Submit an Annual Report", href: "/services/annual-report" },
      { label: "Foreign Qualification", href: "/services/foreign-qualification" },
      { label: "Get a Certificate of Good Standing", href: "/services/good-standing" },
      { label: "Change Of Registered Agent", href: "/services/change-agent" },
      { label: "Company Name Change", href: "/services/name-change" },
      { label: "File for an S Corporation", href: "/services/s-corporation" },
    ],
    aboutLinks: [
      { label: "About Noviatify", href: "/about" },
      { label: "Noviatify Partnerships", href: "/about/partnerships" },
      { label: "Read the Blog", href: "/about/blog" },
      { label: "Contact Us", href: "/about/contact" },
    ],
    mobileLinks: [
      { label: "Home", href: "/" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Services", href: "/services" },
      { label: "About Us", href: "/about" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  footer: {
    copyright: "© 2023. Noviatify All Rights Reserved.",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
  genericShared: {
    seeHowHref: "/how-it-works",
    whyTitle: "Why Thousands Choose Noviatify",
    whySubtitle:
      "From first-time founders to serial entrepreneurs, Noviatify delivers the speed, accuracy, and support you need.",
    features: [
      {
        title: "Lightning-Fast Filing",
        desc: "Most formations are completed within 24–72 hours. Expedited options available for same-day processing.",
      },
      {
        title: "100% Compliance Guarantee",
        desc: "Every filing is reviewed by our compliance team before submission. We stand behind every document we file.",
      },
      {
        title: "Expert Support",
        desc: "Our business formation specialists are available to answer questions throughout your entire process.",
      },
      {
        title: "All 50 States",
        desc: "Noviatify operates in every U.S. state. Form your business wherever your goals take you.",
      },
    ],
    stepsTitle: "Get Started in 3 Simple Steps",
    steps: [
      {
        num: "1",
        label: "Choose Your Entity",
        desc: "Pick the business structure that fits your goals and the state where you want to form.",
      },
      {
        num: "2",
        label: "Complete the Form",
        desc: "Answer a few simple questions online. No legal jargon — just plain, clear prompts.",
      },
      {
        num: "3",
        label: "We File For You",
        desc: "Noviatify submits everything to the state and delivers your formation documents by email.",
      },
    ],
    testimonialsTitle: "Trusted by Business Owners",
    testimonialsSubtitle: "Real reviews from real Noviatify customers",
    testimonials: [
      {
        name: "Marcus W.",
        role: "Founder, SaaS startup",
        body: "Noviatify made the whole process effortless. I had my LLC up and running in less than two days. Worth every penny.",
        stars: 5,
      },
      {
        name: "Priya S.",
        role: "E-commerce entrepreneur",
        body: "I was nervous about doing this on my own but Noviatify walked me through everything. Highly recommend.",
        stars: 5,
      },
      {
        name: "Daniel R.",
        role: "Freelance consultant",
        body: "Switched my registered agent to Noviatify and the transition was seamless. Their team is responsive and professional.",
        stars: 5,
      },
    ],
    faqTitle: "Common Questions",
    faqs: [
      {
        q: "How long does it take to get started?",
        a: "You can complete your application in under 5 minutes. Most filings are processed within 24–72 hours after submission.",
      },
      {
        q: "Are there any hidden fees?",
        a: "Never. Noviatify is fully transparent about all costs, including state filing fees, before you complete your application.",
      },
      {
        q: "What if I need help during the process?",
        a: "Our support team is available to assist you at any step. Reach out via chat or email and we typically respond within a few hours.",
      },
    ],
    ctaTitle: "Ready to make it official?",
    ctaSubtitle:
      "Join 1,000+ business owners who trusted Noviatify to get their company off the ground — fast and stress-free.",
    trustBar: ["No hidden fees", "All 50 states", "24–72 hr filing", "1,000+ businesses formed"],
    seeHow: "See how it works",
  },
  genericPages: {
    "/about/partnerships": {
      title: "Noviatify Partnerships",
      subtitle: "Partnerships",
      description:
        "Partner with Noviatify to offer world-class business formation services to your clients or community. Reach out to discuss partnership opportunities.",
      cta: { label: "Contact Us About Partnerships", href: "/about/contact" },
    },
    "/about/blog": {
      title: "Noviatify Blog",
      subtitle: "Blog",
      description:
        "Stay up to date with the latest guides, tips, and news for entrepreneurs and business owners.",
      cta: { label: "Start Now — It's Free", href: "/start" },
    },
    "/about/contact": {
      title: "Contact Noviatify",
      subtitle: "Get in Touch",
      description:
        "Have a question? Our team of business formation experts is ready to help. Reach out and we'll respond within one business day.",
      cta: { label: "Start a Formation Now", href: "/start" },
    },
    "/services/llc": {
      title: "Form an LLC",
      subtitle: "Limited Liability Company",
      description:
        "Start your LLC today. Noviatify handles state filing, registered agent, and all paperwork — fast, free, and stress-free.",
      cta: { label: "Form Your LLC Now", href: "/start" },
    },
    "/services/c-corporation": {
      title: "Form a C Corporation",
      subtitle: "C Corporation",
      description:
        "The ideal structure for startups seeking venture capital. Noviatify files your C Corp in days.",
      cta: { label: "Form Your C Corp Now", href: "/start" },
    },
    "/services/ltd": {
      title: "Form an LTD",
      subtitle: "Limited Company",
      description:
        "A globally recognized structure for international entrepreneurs. Noviatify makes cross-border business easy.",
      cta: { label: "Form Your LTD Now", href: "/start" },
    },
    "/services/s-corporation": {
      title: "File for an S Corporation",
      subtitle: "S Corp Election",
      description:
        "Elect S Corp status with the IRS and optimize your tax structure. Noviatify prepares and files IRS Form 2553 for you.",
      cta: { label: "File for S Corp", href: "/start" },
    },
    "/services/registered-agent": {
      title: "Get a Registered Agent",
      subtitle: "Registered Agent Service",
      description:
        "A professional registered agent keeps your business compliant and your personal address private. Available in all 50 states.",
      cta: { label: "Get a Registered Agent", href: "/start" },
    },
    "/services/annual-report": {
      title: "Submit an Annual Report",
      subtitle: "Annual Report Filing",
      description:
        "Never miss a deadline. Noviatify tracks your filing dates and submits annual reports with the state on your behalf.",
      cta: { label: "File Your Annual Report", href: "/start" },
    },
    "/services/foreign-qualification": {
      title: "Foreign Qualification",
      subtitle: "Expand to New States",
      description:
        "Register your existing company to operate legally in a new state. Noviatify handles all paperwork for foreign qualification.",
      cta: { label: "Get Foreign Qualified", href: "/start" },
    },
    "/services/good-standing": {
      title: "Certificate of Good Standing",
      subtitle: "Good Standing Certificate",
      description:
        "Obtain official proof that your business is active and compliant — required for loans, leases, and bank accounts.",
      cta: { label: "Get Your Certificate", href: "/start" },
    },
    "/services/change-agent": {
      title: "Change Your Registered Agent",
      subtitle: "Agent Change Filing",
      description:
        "Switch your registered agent quickly and keep your state records up to date. Noviatify handles all transition paperwork.",
      cta: { label: "Change Your Agent", href: "/start" },
    },
    "/services/name-change": {
      title: "Company Name Change",
      subtitle: "Business Name Amendment",
      description:
        "Rebranding your company? Noviatify files the state amendment to legally update your business name.",
      cta: { label: "Change Your Company Name", href: "/start" },
    },
    "/pricing": {
      title: "Pricing",
      subtitle: "Transparent & Simple",
      description:
        "Noviatify is built on transparency. No hidden fees — all state filing costs are clearly disclosed before you complete your application. Business formation starts at $0 + state fees.",
      cta: { label: "Start Now — It's Free", href: "/start" },
    },
    "/order-status": {
      title: "Check Order Status",
      subtitle: "Order Tracking",
      description:
        "Track the status of your business formation or compliance filing. Log in to your Noviatify dashboard to see real-time updates.",
      cta: { label: "Log In to Dashboard", href: "/login" },
    },
    "/research": {
      title: "Business Research Tool",
      subtitle: "Research Tool",
      description:
        "Use our state-by-state business name search and formation guide to research your options before filing.",
      cta: { label: "Start Your Research", href: "/start" },
    },
    "/start": {
      title: "Start Your Business",
      subtitle: "Get Started",
      description:
        "You're one step away from having a registered company. Complete your formation in minutes.",
      cta: { label: "Begin My Application", href: "/" },
    },
    "/login": {
      title: "Log In to Noviatify",
      subtitle: "Account Access",
      description:
        "Access your Noviatify dashboard to track filings, manage compliance, and update your business information.",
      cta: { label: "Back to Home", href: "/" },
    },
  },
  legalPages: {
    "/privacy": {
      subtitle: "Your Privacy",
      title: "Privacy Policy",
      lastUpdated: "Last updated: June 8, 2026",
      intro:
        "Noviatify is committed to protecting your personal information. This Privacy Policy explains what we collect, how we use it, and the choices you have. We never sell your data.",
      sections: [
        {
          heading: "1. Information We Collect",
          body:
            "We collect information you provide directly — such as your name, email address, business details, and payment information — when you create an account or place an order. We also automatically collect limited technical data, like your IP address, browser type, and pages visited, to keep our service secure and working properly.",
        },
        {
          heading: "2. How We Use Your Information",
          body:
            "We use your information to provide and improve our formation and compliance services, process payments, prepare and file documents on your behalf, communicate with you about your orders, and meet our legal obligations. We do not use your data for purposes you would not reasonably expect.",
        },
        {
          heading: "3. How We Share Information",
          body:
            "We share information only as needed to deliver our services — for example, with government agencies to file your documents, and with trusted service providers who process payments or host our systems under strict confidentiality. We never sell your personal information to third parties.",
        },
        {
          heading: "4. Data Security",
          body:
            "We use industry-standard safeguards to protect your information, including encryption in transit and access controls. No method of transmission or storage is completely secure, but we work continuously to protect your data against unauthorized access, loss, or misuse.",
        },
        {
          heading: "5. Your Rights & Choices",
          body:
            "Depending on where you live, you may have the right to access, correct, or delete your personal information, or to object to certain processing. You can also opt out of marketing emails at any time. To exercise any of these rights, contact us using the details below.",
        },
        {
          heading: "6. Cookies & Tracking",
          body:
            "We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how our site is used. You can control cookies through your browser settings, though some features may not work properly if they are disabled.",
        },
        {
          heading: "7. Changes to This Policy",
          body:
            "We may update this Privacy Policy from time to time. When we do, we will revise the date above and, where appropriate, notify you. Your continued use of Noviatify after changes take effect means you accept the updated policy.",
        },
      ],
      contactHeading: "Contact Us",
      contactBody:
        "If you have questions about this Privacy Policy or how we handle your data, please reach out to our team and we will be happy to help.",
      contactCtaLabel: "Contact Support",
      contactCtaHref: "/about/contact",
    },
    "/terms": {
      subtitle: "Terms & Conditions",
      title: "Terms of Service",
      lastUpdated: "Last updated: June 8, 2026",
      intro:
        "These Terms of Service govern your use of Noviatify and the services we provide. By creating an account or placing an order, you agree to these terms. Please read them carefully.",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body:
            "By accessing or using Noviatify, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you should not use our services. If you are using Noviatify on behalf of a business, you represent that you are authorized to bind that business.",
        },
        {
          heading: "2. Our Services",
          body:
            "Noviatify provides business formation, registered agent, compliance, and related filing services. We prepare and submit documents based on the information you provide. You are responsible for ensuring that the information you give us is accurate, complete, and up to date.",
        },
        {
          heading: "3. Not Legal or Tax Advice",
          body:
            "Noviatify is not a law firm or an accounting firm, and we do not provide legal, tax, or financial advice. Our services are for informational and filing purposes only. For advice specific to your situation, you should consult a qualified attorney or accountant.",
        },
        {
          heading: "4. Fees & Payments",
          body:
            "You agree to pay all fees associated with the services you order, including any applicable government and state filing fees. Fees are described at checkout and are generally non-refundable once a filing has been submitted. We may change our pricing for future orders at any time.",
        },
        {
          heading: "5. Your Responsibilities",
          body:
            "You agree to use Noviatify only for lawful purposes, to keep your account credentials secure, and to provide accurate information. You are responsible for all activity that occurs under your account and for maintaining your business's ongoing legal and compliance obligations.",
        },
        {
          heading: "6. Intellectual Property",
          body:
            "All content, branding, and software on Noviatify are owned by us or our licensors and are protected by applicable laws. You may not copy, modify, distribute, or reverse-engineer any part of our service without our prior written permission.",
        },
        {
          heading: "7. Limitation of Liability",
          body:
            "To the fullest extent permitted by law, Noviatify is not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability for any claim is limited to the amount you paid us for the service giving rise to the claim.",
        },
        {
          heading: "8. Termination",
          body:
            "We may suspend or terminate your access to Noviatify if you violate these terms or use our services in a way that could cause harm or legal exposure. You may stop using our services at any time. Certain provisions survive termination, including payment obligations and limitations of liability.",
        },
        {
          heading: "9. Changes to These Terms",
          body:
            "We may update these Terms of Service from time to time. When we do, we will revise the date above. Your continued use of Noviatify after changes take effect constitutes acceptance of the updated terms.",
        },
      ],
      contactHeading: "Questions About These Terms?",
      contactBody:
        "If anything in these terms is unclear, our team is here to help. Reach out and we will walk you through it.",
      contactCtaLabel: "Contact Support",
      contactCtaHref: "/about/contact",
    },
  },
};
