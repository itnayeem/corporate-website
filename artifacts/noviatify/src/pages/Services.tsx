import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Briefcase, Globe, CheckCircle2, Users, Building2, Award, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoPath from "@assets/noviatify-logo.png";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const entities = [
  {
    name: "LLC",
    full: "Limited Liability Company",
    href: "/services/llc",
    desc: "Flexible ownership, pass-through taxation, and strong personal liability protection. The most popular choice for small businesses.",
    icon: Building2,
    gradient: "from-blue-500 to-blue-700",
    badge: "Most Popular",
    price: "From $0 + state fees",
    features: ["Personal liability protection", "Pass-through taxation", "Flexible management structure", "No board of directors required", "Easy to maintain"],
  },
  {
    name: "C Corporation",
    full: "C Corporation",
    href: "/services/c-corporation",
    desc: "Ideal for startups seeking venture capital. Issue multiple share classes, attract investors, and scale without limits.",
    icon: Briefcase,
    gradient: "from-indigo-500 to-indigo-700",
    badge: "Best for Startups",
    price: "From $0 + state fees",
    features: ["Unlimited shareholders", "Multiple share classes", "VC & angel investment ready", "Employee stock options (ESOP)", "Strong investor credibility"],
  },
  {
    name: "LTD",
    full: "Limited Company",
    href: "/services/ltd",
    desc: "A globally recognized structure built for international entrepreneurs who need credibility and liability protection across borders.",
    icon: Globe,
    gradient: "from-violet-500 to-violet-700",
    badge: "Global Reach",
    price: "From $0 + state fees",
    features: ["International credibility", "Personal liability protection", "Cross-border operations", "Professional image worldwide", "Global market access"],
  },
];

const services = [
  {
    title: "Get a Registered Agent",
    href: "/services/registered-agent",
    icon: Shield,
    color: "bg-blue-50 text-blue-600",
    desc: "A professional registered agent keeps your business compliant and your personal address private. Noviatify provides registered agent service in all 50 states.",
    includes: ["Official document receipt", "Privacy protection", "State compliance monitoring", "Instant notifications", "Digital document storage"],
  },
  {
    title: "Submit an Annual Report",
    href: "/services/annual-report",
    icon: FileText,
    color: "bg-indigo-50 text-indigo-600",
    desc: "Never miss an annual report deadline. We track your filing dates and handle submission with the state on your behalf.",
    includes: ["Deadline tracking", "State form preparation", "On-time submission", "Confirmation receipt", "Multi-state support"],
  },
  {
    title: "Foreign Qualification",
    href: "/services/foreign-qualification",
    icon: Globe,
    color: "bg-cyan-50 text-cyan-600",
    desc: "Doing business in a new state? Foreign qualification registers your existing company to operate legally outside its home state.",
    includes: ["All 50 state filings", "Document preparation", "Registered agent included", "Certificate of authority", "Ongoing compliance support"],
  },
  {
    title: "Get a Certificate of Good Standing",
    href: "/services/good-standing",
    icon: CheckCircle2,
    color: "bg-green-50 text-green-600",
    desc: "A Certificate of Good Standing proves your business is active and compliant. Often required for loans, leases, and opening bank accounts.",
    includes: ["Official state certificate", "Fast processing (24–72 hrs)", "Digital + physical copy", "All states supported", "Lender-ready format"],
  },
  {
    title: "Change Of Registered Agent",
    href: "/services/change-agent",
    icon: Users,
    color: "bg-yellow-50 text-yellow-600",
    desc: "Switch your registered agent quickly and keep your records current. Noviatify handles all state paperwork for the transition.",
    includes: ["State filing preparation", "Agent transfer coordination", "Same-day processing option", "All states supported", "Confirmation documentation"],
  },
  {
    title: "Company Name Change",
    href: "/services/name-change",
    icon: Building2,
    color: "bg-orange-50 text-orange-600",
    desc: "Rebranding? Legally update your business name with proper state amendment filings handled entirely by Noviatify.",
    includes: ["Articles of amendment filing", "Name availability search", "State fee coverage", "Updated certificate", "Digital record update"],
  },
  {
    title: "File for an S Corporation",
    href: "/services/s-corporation",
    icon: Award,
    color: "bg-purple-50 text-purple-600",
    desc: "Elect S Corp status with the IRS to reduce self-employment taxes and optimize your business tax structure.",
    includes: ["IRS Form 2553 preparation", "State S Corp election", "Deadline management", "Payroll guidance", "Tax savings analysis"],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">Our Services</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Everything your business needs
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-8 leading-relaxed">
              From formation to ongoing compliance, Noviatify covers every aspect of keeping your company running smoothly across all 50 states.
            </p>
            <Link href="/start">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group">
                Start Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Entity types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Business Formation</h2>
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">Start with the right entity type. Every structure has unique advantages — we help you pick the right one.</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8">
            {entities.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(37,117,252,0.15)" }}
                  className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-blue-200 transition-all duration-400 h-full flex flex-col"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${e.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <span className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">{e.badge}</span>
                  <h3 className="text-3xl font-black text-gray-900 mb-1">{e.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{e.full}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{e.desc}</p>
                  <p className="text-xs text-gray-400 font-semibold mb-3 uppercase tracking-wider">Includes</p>
                  <ul className="space-y-1.5 mb-7">
                    {e.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 mb-4">{e.price}</p>
                  <Link href={e.href}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 flex items-center justify-center gap-2">
                      Form a {e.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance services */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Compliance & Ongoing Services</h2>
            <p className="text-gray-500 text-lg mt-3 max-w-2xl mx-auto">Keep your business healthy and compliant long after formation.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.08}>
                <Link href={svc.href}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.10)" }}
                    className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <svc.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mb-2">{svc.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{svc.desc}</p>
                    <ul className="space-y-1 mb-4">
                      {svc.includes.slice(0, 3).map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                    <span className="text-primary text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                      Learn more <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Need help choosing?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Our team of experts can guide you to the right service for your situation. Reach out anytime.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary font-extrabold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/about/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-full hover:border-white transition-colors inline-flex items-center gap-2">
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040918] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" /></Link>
          <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
          <div className="flex gap-5 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/about/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
