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
  maintenance: {
    // When true, public visitors see the maintenance page instead of the site.
    // The admin (logged in) always bypasses it and sees the real site.
    enabled: false,
    title: "We'll be right back",
    message:
      "Noviatify is currently undergoing scheduled maintenance. We're working to improve your experience and will be back online shortly. Thank you for your patience.",
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
      whyTitle: "Why Partner With Noviatify",
      whySubtitle:
        "Bring trusted business formation services to your clients and community. Our partner program is built to grow with you.",
      features: [
        { title: "Generous Revenue Share", desc: "Earn for every client you refer, with transparent, recurring payouts." },
        { title: "Co-Branded Experience", desc: "Offer formation services under a smooth, professional experience your clients trust." },
        { title: "Dedicated Partner Support", desc: "Work with a real partnership team that helps you succeed." },
        { title: "Easy Integration", desc: "Simple referral links and tools make it effortless to get started." },
      ],
      stepsTitle: "How the Partner Program Works",
      steps: [
        { num: "1", label: "Reach Out", desc: "Tell us about your business and audience." },
        { num: "2", label: "Get Set Up", desc: "We onboard you with referral tools and resources." },
        { num: "3", label: "Start Earning", desc: "Refer clients and earn as they form their businesses." },
      ],
      faqTitle: "Partnership Questions, Answered",
      faqs: [
        { q: "Who is the partner program for?", a: "Accountants, attorneys, consultants, agencies, and creators who serve entrepreneurs and small businesses." },
        { q: "How do I get paid?", a: "We offer transparent, recurring payouts for the clients you refer. Details are shared during onboarding." },
        { q: "Is there a cost to join?", a: "No. Joining the Noviatify partner program is free." },
      ],
      ctaTitle: "Let's grow together",
      ctaSubtitle: "Partner with Noviatify and bring trusted formation services to the people you serve.",
    },
    "/about/blog": {
      title: "Noviatify Blog",
      subtitle: "Blog",
      description:
        "Stay up to date with the latest guides, tips, and news for entrepreneurs and business owners.",
      cta: { label: "Start Now — It's Free", href: "/start" },
      whyTitle: "Guides for Founders, From Noviatify",
      whySubtitle:
        "Practical articles on forming, running, and growing your business — written in plain language.",
      features: [
        { title: "Formation Guides", desc: "Step-by-step walkthroughs for LLCs, corporations, and more." },
        { title: "Compliance Tips", desc: "Stay on top of annual reports, registered agents, and state deadlines." },
        { title: "Tax Basics", desc: "Understand pass-through taxation, S Corp elections, and what they mean for you." },
        { title: "Growth Advice", desc: "Insights on expanding to new states and scaling your company." },
      ],
      faqTitle: "About the Blog",
      faqs: [
        { q: "How often do you publish?", a: "We add new guides regularly. Check back often or start a formation whenever you're ready." },
        { q: "Can I suggest a topic?", a: "Absolutely. Reach out through our contact page with what you'd like us to cover." },
        { q: "Do the articles replace legal advice?", a: "No. Our content is educational. For advice specific to your situation, consult a professional." },
      ],
      ctaTitle: "Ready to put it into action?",
      ctaSubtitle: "When you're ready to form your business, Noviatify makes it fast and simple.",
    },
    "/about/contact": {
      title: "Contact Noviatify",
      subtitle: "Get in Touch",
      description:
        "Have a question? Our team of business formation experts is ready to help. Reach out and we'll respond within one business day.",
      cta: { label: "Start a Formation Now", href: "/start" },
      whyTitle: "How Noviatify Can Help",
      whySubtitle:
        "Whatever stage you're at, our team is here to answer questions and point you in the right direction.",
      features: [
        { title: "Friendly Expert Support", desc: "Talk to real business formation specialists, not bots." },
        { title: "Fast Responses", desc: "We typically reply within one business day." },
        { title: "Help at Every Step", desc: "From choosing an entity to filing compliance documents, we've got you." },
        { title: "No Pressure", desc: "Ask anything — there's no obligation to buy." },
      ],
      faqTitle: "Before You Reach Out",
      faqs: [
        { q: "How quickly will I hear back?", a: "We typically respond within one business day, often sooner." },
        { q: "Can you help me choose the right entity?", a: "Yes. Tell us about your goals and we'll help you understand your options." },
        { q: "Do you offer phone support?", a: "Reach us by chat or email and we'll make sure you get the help you need." },
      ],
      ctaTitle: "Have a question? We're here.",
      ctaSubtitle: "Reach out to the Noviatify team and we'll help you take the next step.",
    },
    "/services/llc": {
      title: "Form an LLC",
      subtitle: "Limited Liability Company",
      description:
        "Start your LLC today. Noviatify handles state filing, registered agent, and all paperwork — fast, free, and stress-free.",
      cta: { label: "Form Your LLC Now", href: "/start" },
      whyTitle: "Why Form Your LLC With Noviatify",
      whySubtitle:
        "An LLC gives you liability protection and tax flexibility without the complexity of a corporation. We handle every step.",
      features: [
        {
          title: "Personal Asset Protection",
          desc: "An LLC separates your personal assets from business debts and lawsuits, so your home and savings stay protected.",
        },
        {
          title: "Pass-Through Taxation",
          desc: "Profits flow straight to your personal return, avoiding the double taxation that corporations face.",
        },
        {
          title: "Registered Agent Included",
          desc: "Every LLC formation comes with a registered agent to receive legal mail and keep you compliant.",
        },
        {
          title: "Filed in 24–72 Hours",
          desc: "We prepare and submit your Articles of Organization fast, with same-day options in most states.",
        },
      ],
      stepsTitle: "How We Form Your LLC",
      steps: [
        { num: "1", label: "Pick Your State", desc: "Choose where to form your LLC. We'll flag the filing fees and rules for that state." },
        { num: "2", label: "Tell Us About Your LLC", desc: "Share your company name and members. We turn it into a state-ready filing." },
        { num: "3", label: "We File & Deliver", desc: "We submit your Articles of Organization and email your approved documents." },
      ],
      faqTitle: "LLC Questions, Answered",
      faqs: [
        { q: "How much does it cost to form an LLC?", a: "Noviatify's service starts at $0 — you only pay the state filing fee, which we show you upfront before you submit." },
        { q: "Do I need an operating agreement?", a: "It's not required in every state, but it's strongly recommended. We can help you put one in place." },
        { q: "Can I form an LLC in a different state than where I live?", a: "Yes. Many owners form in their home state, but we can file in any of the 50 states you choose." },
      ],
      ctaTitle: "Ready to launch your LLC?",
      ctaSubtitle:
        "Join thousands of founders who started their LLC with Noviatify — fast, accurate, and stress-free.",
    },
    "/services/c-corporation": {
      title: "Form a C Corporation",
      subtitle: "C Corporation",
      description:
        "The ideal structure for startups seeking venture capital. Noviatify files your C Corp in days.",
      cta: { label: "Form Your C Corp Now", href: "/start" },
      whyTitle: "Why Form a C Corporation With Noviatify",
      whySubtitle:
        "The C Corp is the gold standard for startups raising capital and issuing stock. We make incorporation simple.",
      features: [
        { title: "Built for Investors", desc: "C Corps can issue multiple classes of stock — the structure venture capitalists and angel investors expect." },
        { title: "Unlimited Growth Potential", desc: "Add unlimited shareholders and easily bring on new investors as you scale." },
        { title: "Stock Options for Your Team", desc: "Attract and retain talent with equity and employee stock option plans." },
        { title: "Filed Fast & Correctly", desc: "We prepare your Articles of Incorporation and file with the state in days." },
      ],
      stepsTitle: "How We Incorporate Your C Corp",
      steps: [
        { num: "1", label: "Choose Your State", desc: "Delaware is popular for startups, but we'll file wherever fits your plans." },
        { num: "2", label: "Set Up Your Corporation", desc: "Tell us your share structure and directors. We handle the paperwork." },
        { num: "3", label: "We Incorporate You", desc: "We file your Articles of Incorporation and deliver your formation documents." },
      ],
      faqTitle: "C Corporation Questions, Answered",
      faqs: [
        { q: "Why choose a C Corp over an LLC?", a: "If you plan to raise venture capital, issue stock, or eventually go public, a C Corp is usually the right structure." },
        { q: "What is double taxation?", a: "C Corps pay tax on profits, and shareholders pay tax on dividends. Many startups reinvest profits, which softens this." },
        { q: "Should I incorporate in Delaware?", a: "Delaware offers business-friendly laws investors know well. We can file there or in your home state." },
      ],
      ctaTitle: "Ready to incorporate?",
      ctaSubtitle: "Form the C Corporation investors trust — Noviatify files it fast and correctly.",
    },
    "/services/ltd": {
      title: "Form an LTD",
      subtitle: "Limited Company",
      description:
        "A globally recognized structure for international entrepreneurs. Noviatify makes cross-border business easy.",
      cta: { label: "Form Your LTD Now", href: "/start" },
      whyTitle: "Why Form an LTD With Noviatify",
      whySubtitle:
        "A limited company is a globally recognized structure ideal for international founders. We make cross-border formation easy.",
      features: [
        { title: "Globally Recognized", desc: "The LTD structure is trusted by banks, partners, and customers around the world." },
        { title: "Limited Liability", desc: "Owners' personal assets are protected from the company's debts and obligations." },
        { title: "Credibility With Partners", desc: "An incorporated company signals legitimacy to suppliers, clients, and investors." },
        { title: "Guided End to End", desc: "We walk international founders through every requirement, start to finish." },
      ],
      stepsTitle: "How We Register Your LTD",
      steps: [
        { num: "1", label: "Choose Your Jurisdiction", desc: "Tell us where you want to incorporate and we'll outline the requirements." },
        { num: "2", label: "Provide Company Details", desc: "Share your directors and shareholders. We prepare the filing." },
        { num: "3", label: "We Register Your Company", desc: "We submit your incorporation and deliver your official documents." },
      ],
      faqTitle: "LTD Questions, Answered",
      faqs: [
        { q: "Who should form an LTD?", a: "It's a great fit for international entrepreneurs who want a recognized, limited-liability structure." },
        { q: "Can I form an LTD if I'm not a U.S. resident?", a: "Yes. We regularly help non-residents incorporate and will guide you through what's needed." },
        { q: "How long does it take?", a: "Timelines vary by jurisdiction, but we move as fast as the registry allows and keep you updated." },
      ],
      ctaTitle: "Ready to go global?",
      ctaSubtitle: "Form your limited company with Noviatify and do business with confidence anywhere.",
    },
    "/services/s-corporation": {
      title: "File for an S Corporation",
      subtitle: "S Corp Election",
      description:
        "Elect S Corp status with the IRS and optimize your tax structure. Noviatify prepares and files IRS Form 2553 for you.",
      cta: { label: "File for S Corp", href: "/start" },
      whyTitle: "Why Elect S Corp Status With Noviatify",
      whySubtitle:
        "An S Corp election can lower your self-employment taxes. We prepare and file IRS Form 2553 for you.",
      features: [
        { title: "Save on Self-Employment Tax", desc: "Pay yourself a reasonable salary and take the rest as distributions, reducing payroll taxes." },
        { title: "Pass-Through Taxation", desc: "Profits and losses pass to your personal return, avoiding corporate double taxation." },
        { title: "We File Form 2553", desc: "We complete and submit the IRS election so you don't have to navigate it alone." },
        { title: "Deadline Tracking", desc: "S Corp elections are time-sensitive. We make sure yours is filed on time." },
      ],
      stepsTitle: "How We File Your S Corp Election",
      steps: [
        { num: "1", label: "Confirm Eligibility", desc: "We check that your business qualifies for S Corp status." },
        { num: "2", label: "Prepare Form 2553", desc: "We complete the IRS election using your business details." },
        { num: "3", label: "We File With the IRS", desc: "We submit your election and confirm once it's accepted." },
      ],
      faqTitle: "S Corporation Questions, Answered",
      faqs: [
        { q: "Is an S Corp a business type or a tax election?", a: "It's a tax election. Your LLC or corporation keeps its structure but is taxed as an S Corp." },
        { q: "When is the deadline to elect S Corp status?", a: "Generally within 2 months and 15 days of the start of the tax year you want it to apply. We'll confirm your dates." },
        { q: "Will an S Corp save me money?", a: "It can for profitable businesses, by reducing self-employment tax. We recommend confirming with your accountant." },
      ],
      ctaTitle: "Ready to elect S Corp status?",
      ctaSubtitle: "Let Noviatify prepare and file your IRS Form 2553 — accurately and on time.",
    },
    "/services/registered-agent": {
      title: "Get a Registered Agent",
      subtitle: "Registered Agent Service",
      description:
        "A professional registered agent keeps your business compliant and your personal address private. Available in all 50 states.",
      cta: { label: "Get a Registered Agent", href: "/start" },
      whyTitle: "Why Choose Noviatify as Your Registered Agent",
      whySubtitle:
        "Every business needs a registered agent in its state. We keep you compliant and your address private.",
      features: [
        { title: "Privacy Protection", desc: "Use our address instead of your own, keeping your home address off public records." },
        { title: "Never Miss Legal Mail", desc: "We receive and forward your legal documents and state notices the moment they arrive." },
        { title: "Compliance Reminders", desc: "We track your state deadlines and alert you before anything is due." },
        { title: "Available in All 50 States", desc: "Need an agent in multiple states? We've got you covered nationwide." },
      ],
      stepsTitle: "How Our Registered Agent Service Works",
      steps: [
        { num: "1", label: "Tell Us Your State", desc: "Let us know where your business is registered." },
        { num: "2", label: "We Become Your Agent", desc: "We file the appointment and start receiving documents on your behalf." },
        { num: "3", label: "Stay Compliant", desc: "We forward everything you receive and remind you of upcoming deadlines." },
      ],
      faqTitle: "Registered Agent Questions, Answered",
      faqs: [
        { q: "What does a registered agent do?", a: "A registered agent receives legal documents and official state mail on behalf of your business during business hours." },
        { q: "Can I be my own registered agent?", a: "You can, but your address becomes public and you must be available during business hours. Our service avoids both issues." },
        { q: "What happens if I don't have one?", a: "Your business can fall out of good standing or miss a lawsuit notice. A reliable agent keeps you protected." },
      ],
      ctaTitle: "Ready for a reliable registered agent?",
      ctaSubtitle: "Keep your business compliant and your address private with Noviatify.",
    },
    "/services/annual-report": {
      title: "Submit an Annual Report",
      subtitle: "Annual Report Filing",
      description:
        "Never miss a deadline. Noviatify tracks your filing dates and submits annual reports with the state on your behalf.",
      cta: { label: "File Your Annual Report", href: "/start" },
      whyTitle: "Why File Your Annual Report With Noviatify",
      whySubtitle:
        "Most states require an annual or biennial report to stay active. We track the deadlines and file for you.",
      features: [
        { title: "Never Miss a Deadline", desc: "We monitor your state's filing dates so your business stays in good standing." },
        { title: "We Prepare & Submit", desc: "We complete the report with your current information and file it with the state." },
        { title: "Avoid Late Penalties", desc: "Missed reports lead to fines and dissolution. We keep you ahead of the dates." },
        { title: "Stay in Good Standing", desc: "Keep your business active and eligible for loans, contracts, and renewals." },
      ],
      stepsTitle: "How We Handle Your Annual Report",
      steps: [
        { num: "1", label: "Share Your Business Info", desc: "Confirm your current company details with us." },
        { num: "2", label: "We Prepare the Report", desc: "We complete your annual report accurately for your state." },
        { num: "3", label: "We File It On Time", desc: "We submit before the deadline and send you confirmation." },
      ],
      faqTitle: "Annual Report Questions, Answered",
      faqs: [
        { q: "What is an annual report?", a: "It's a periodic filing that updates the state on your business's basic information and keeps it active." },
        { q: "What happens if I miss the deadline?", a: "States charge late fees and can eventually dissolve your business. We help you avoid that entirely." },
        { q: "How often do I need to file?", a: "It depends on your state — some require it annually, others biennially. We track your specific schedule." },
      ],
      ctaTitle: "Ready to stay compliant?",
      ctaSubtitle: "Let Noviatify track your deadlines and file your annual report — on time, every time.",
    },
    "/services/foreign-qualification": {
      title: "Foreign Qualification",
      subtitle: "Expand to New States",
      description:
        "Register your existing company to operate legally in a new state. Noviatify handles all paperwork for foreign qualification.",
      cta: { label: "Get Foreign Qualified", href: "/start" },
      whyTitle: "Why Foreign Qualify With Noviatify",
      whySubtitle:
        "Expanding into a new state? Foreign qualification lets your existing company operate there legally. We handle the paperwork.",
      features: [
        { title: "Operate Legally Anywhere", desc: "Register to do business in any new state without forming a brand-new company." },
        { title: "Certificate of Good Standing", desc: "We obtain the documents your new state requires from your home state." },
        { title: "Registered Agent Included", desc: "We can serve as your agent in the new state to keep you compliant." },
        { title: "Handled End to End", desc: "From paperwork to filing, we manage the entire qualification process." },
      ],
      stepsTitle: "How We Foreign Qualify Your Business",
      steps: [
        { num: "1", label: "Tell Us Where You're Expanding", desc: "Let us know your home state and the new state." },
        { num: "2", label: "We Gather the Documents", desc: "We obtain your good standing certificate and prepare the filing." },
        { num: "3", label: "We Qualify Your Business", desc: "We submit the application so you can operate legally in the new state." },
      ],
      faqTitle: "Foreign Qualification Questions, Answered",
      faqs: [
        { q: "What is foreign qualification?", a: "It's the process of registering an existing business to operate in a state other than where it was formed." },
        { q: "Do I need it for an online business?", a: "If you have a physical presence, employees, or significant operations in another state, you likely do. We can help you assess." },
        { q: "How is it different from forming a new company?", a: "You keep your original company — qualification simply gives it legal authority to operate in the new state." },
      ],
      ctaTitle: "Ready to expand to a new state?",
      ctaSubtitle: "Let Noviatify handle your foreign qualification so you can grow with confidence.",
    },
    "/services/good-standing": {
      title: "Certificate of Good Standing",
      subtitle: "Good Standing Certificate",
      description:
        "Obtain official proof that your business is active and compliant — required for loans, leases, and bank accounts.",
      cta: { label: "Get Your Certificate", href: "/start" },
      whyTitle: "Why Get Your Certificate Through Noviatify",
      whySubtitle:
        "A certificate of good standing proves your business is active and compliant. We obtain it from the state for you.",
      features: [
        { title: "Required for Big Moments", desc: "Banks, lenders, and landlords often require it to open accounts, secure loans, or sign leases." },
        { title: "Official State Proof", desc: "It's the state's confirmation that your business is current and in good standing." },
        { title: "Fast Turnaround", desc: "We request your certificate quickly so you're not waiting when you need it." },
        { title: "Any State, Any Time", desc: "Need certificates in multiple states? We obtain them all." },
      ],
      stepsTitle: "How We Get Your Certificate",
      steps: [
        { num: "1", label: "Tell Us Your Business", desc: "Share your company name and state." },
        { num: "2", label: "We Request the Certificate", desc: "We file the request with the state on your behalf." },
        { num: "3", label: "You Receive It Fast", desc: "We deliver your official certificate of good standing." },
      ],
      faqTitle: "Good Standing Questions, Answered",
      faqs: [
        { q: "What is a certificate of good standing?", a: "It's an official document from the state confirming your business is registered, active, and up to date on filings." },
        { q: "When will I need one?", a: "Commonly when opening a business bank account, applying for financing, expanding to a new state, or signing major contracts." },
        { q: "How long is it valid?", a: "Validity varies, and many institutions want a recent one — usually within 30 to 90 days. We can reissue as needed." },
      ],
      ctaTitle: "Need proof your business is in good standing?",
      ctaSubtitle: "Get your official certificate quickly with Noviatify.",
    },
    "/services/change-agent": {
      title: "Change Your Registered Agent",
      subtitle: "Agent Change Filing",
      description:
        "Switch your registered agent quickly and keep your state records up to date. Noviatify handles all transition paperwork.",
      cta: { label: "Change Your Agent", href: "/start" },
      whyTitle: "Why Change Your Registered Agent With Noviatify",
      whySubtitle:
        "Switching registered agents is simple with us. We file the change and keep your state records accurate.",
      features: [
        { title: "Seamless Transition", desc: "We handle the entire switch so there's no gap in receiving your legal mail." },
        { title: "We File the Change", desc: "We prepare and submit the change-of-agent form with your state." },
        { title: "Privacy & Reliability", desc: "Use our address and count on us to forward documents and track deadlines." },
        { title: "Available in All 50 States", desc: "Change your agent in any state where your business is registered." },
      ],
      stepsTitle: "How We Change Your Registered Agent",
      steps: [
        { num: "1", label: "Tell Us Your Current Details", desc: "Share your business and current registered agent information." },
        { num: "2", label: "We Prepare the Change", desc: "We complete the state's change-of-agent filing." },
        { num: "3", label: "We File & Take Over", desc: "We submit the change and begin acting as your new agent." },
      ],
      faqTitle: "Changing Your Agent: Questions, Answered",
      faqs: [
        { q: "Why would I change my registered agent?", a: "Common reasons include poor service, moving states, rising fees, or wanting reliable forwarding and privacy." },
        { q: "Will changing agents disrupt my business?", a: "No. We manage the transition so you keep receiving important documents without interruption." },
        { q: "Is there a state fee to change agents?", a: "Some states charge a small fee. We'll show you any cost upfront before filing." },
      ],
      ctaTitle: "Ready to switch registered agents?",
      ctaSubtitle: "Make the change effortless with Noviatify — we handle the paperwork and the handoff.",
    },
    "/services/name-change": {
      title: "Company Name Change",
      subtitle: "Business Name Amendment",
      description:
        "Rebranding your company? Noviatify files the state amendment to legally update your business name.",
      cta: { label: "Change Your Company Name", href: "/start" },
      whyTitle: "Why Change Your Company Name With Noviatify",
      whySubtitle:
        "Rebranding? We file the state amendment that legally updates your registered business name.",
      features: [
        { title: "Legally Update Your Name", desc: "We file the Articles of Amendment so your new name is official with the state." },
        { title: "Keep Your History Intact", desc: "Change your name without forming a new company or losing your business records." },
        { title: "Done Right the First Time", desc: "We prepare the amendment correctly to avoid rejections and delays." },
        { title: "Guidance on Next Steps", desc: "We'll point you to what else to update, like the IRS and your bank." },
      ],
      stepsTitle: "How We Change Your Company Name",
      steps: [
        { num: "1", label: "Tell Us Your New Name", desc: "Share your current and desired business name." },
        { num: "2", label: "We Prepare the Amendment", desc: "We complete the Articles of Amendment for your state." },
        { num: "3", label: "We File the Change", desc: "We submit it and deliver confirmation of your new official name." },
      ],
      faqTitle: "Name Change Questions, Answered",
      faqs: [
        { q: "How do I legally change my business name?", a: "You file an amendment with the state where your business is registered. We prepare and submit it for you." },
        { q: "Will I get a new EIN?", a: "Usually no — a name change typically keeps your existing EIN. You'll just notify the IRS of the update." },
        { q: "What else should I update?", a: "After the state approves, update your bank, licenses, contracts, and the IRS. We'll guide you through it." },
      ],
      ctaTitle: "Ready to make your new name official?",
      ctaSubtitle: "Let Noviatify file your business name change with the state.",
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
      whyTitle: "Track Your Filing With Confidence",
      whySubtitle: "Log in to see real-time updates on your formation and compliance filings.",
      features: [
        { title: "Real-Time Updates", desc: "See exactly where your filing stands, from submission to state approval." },
        { title: "All Your Documents", desc: "Access your formation and compliance documents in one place." },
        { title: "Deadline Alerts", desc: "Stay ahead of upcoming compliance dates from your dashboard." },
        { title: "Secure Access", desc: "Your business information is protected and available only to you." },
      ],
      stepsTitle: "How to Check Your Status",
      steps: [
        { num: "1", label: "Log In", desc: "Sign in to your Noviatify dashboard." },
        { num: "2", label: "Open Your Order", desc: "Select the filing you want to check." },
        { num: "3", label: "See Live Status", desc: "View real-time progress and any documents ready for you." },
      ],
      faqTitle: "Order Status Questions, Answered",
      faqs: [
        { q: "How do I check my order status?", a: "Just log in to your Noviatify dashboard to see real-time updates on every filing." },
        { q: "How long do filings take?", a: "Most formations are processed within 24–72 hours after submission, depending on the state." },
        { q: "I can't find my order — what now?", a: "Reach out to our support team and we'll locate it for you right away." },
      ],
      ctaTitle: "Need to check on a filing?",
      ctaSubtitle: "Log in to your dashboard for real-time status on every order.",
    },
    "/research": {
      title: "Business Research Tool",
      subtitle: "Research Tool",
      description:
        "Use our state-by-state business name search and formation guide to research your options before filing.",
      cta: { label: "Start Your Research", href: "/start" },
      whyTitle: "Research Before You File",
      whySubtitle:
        "Check name availability and compare your options state by state before you form your business.",
      features: [
        { title: "Business Name Search", desc: "See if your desired name is available in your target state." },
        { title: "State-by-State Guidance", desc: "Compare filing fees, requirements, and timelines across states." },
        { title: "Entity Comparison", desc: "Understand the differences between LLCs, C Corps, and S Corps." },
        { title: "Plan With Confidence", desc: "Make informed decisions before you spend a dollar on filing." },
      ],
      stepsTitle: "How to Research Your Options",
      steps: [
        { num: "1", label: "Search Your Name", desc: "Enter your desired business name and state." },
        { num: "2", label: "Review Your Options", desc: "Compare availability, fees, and requirements." },
        { num: "3", label: "File When Ready", desc: "Move straight into formation when you've decided." },
      ],
      faqTitle: "Research Questions, Answered",
      faqs: [
        { q: "Is the research tool free?", a: "Yes. Researching your name and options costs nothing — you only pay when you file." },
        { q: "Does an available name reserve it?", a: "Availability is a snapshot in time. Filing is what secures your name, and we can do that fast." },
        { q: "Which entity should I choose?", a: "It depends on your goals. Our comparisons and team can help you decide." },
      ],
      ctaTitle: "Done researching?",
      ctaSubtitle: "Turn your research into a registered business with Noviatify.",
    },
    "/start": {
      title: "Start Your Business",
      subtitle: "Get Started",
      description:
        "You're one step away from having a registered company. Complete your formation in minutes.",
      cta: { label: "Begin My Application", href: "/" },
      whyTitle: "Why Start With Noviatify",
      whySubtitle: "You're one step from a registered company. Here's what you get when you start today.",
      features: [
        { title: "$0 to Start", desc: "Begin your formation for free — you only pay the state filing fee." },
        { title: "Done in Minutes", desc: "Answer a few simple questions and we take it from there." },
        { title: "Filed in 24–72 Hours", desc: "We submit fast, with same-day options in most states." },
        { title: "Support the Whole Way", desc: "Our specialists are with you from start to approval." },
      ],
      faqTitle: "Getting Started: Questions, Answered",
      faqs: [
        { q: "How long does it take to apply?", a: "You can complete your application in under 5 minutes." },
        { q: "What does it cost?", a: "Our service starts at $0 — you only pay your state's filing fee, shown upfront." },
        { q: "What happens after I apply?", a: "We prepare and file your documents, then email you once they're approved." },
      ],
      ctaTitle: "Let's make it official",
      ctaSubtitle: "Start your business with Noviatify today — fast, free, and stress-free.",
    },
    "/login": {
      title: "Log In to Noviatify",
      subtitle: "Account Access",
      description:
        "Access your Noviatify dashboard to track filings, manage compliance, and update your business information.",
      cta: { label: "Back to Home", href: "/" },
      whyTitle: "Your Noviatify Dashboard",
      whySubtitle: "Sign in to manage your business, track filings, and stay compliant.",
      features: [
        { title: "Track Your Filings", desc: "See real-time status on every formation and compliance order." },
        { title: "Manage Compliance", desc: "Keep registered agent, reports, and deadlines in one place." },
        { title: "Access Documents", desc: "Download your formation and compliance documents anytime." },
        { title: "Update Your Info", desc: "Keep your business details current with a few clicks." },
      ],
      faqTitle: "Account Questions, Answered",
      faqs: [
        { q: "I forgot my password — what do I do?", a: "Use the password reset option on the login screen, or contact support and we'll help you back in." },
        { q: "Can I manage multiple businesses?", a: "Yes. Your dashboard lets you manage all the businesses under your account." },
        { q: "Is my information secure?", a: "We protect your account with industry-standard safeguards and access controls." },
      ],
      ctaTitle: "New to Noviatify?",
      ctaSubtitle: "Start your business in minutes — no account needed to begin.",
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
