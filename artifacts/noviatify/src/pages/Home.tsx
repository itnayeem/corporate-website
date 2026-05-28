import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Star, Shield, Zap, Award, Users,
  Building2, Globe, Briefcase, ChevronRight, Play
} from "lucide-react";
import logoPath from "@assets/noviatify-logo.png";
import Navbar from "@/components/Navbar";

/* ── helpers ────────────────────────────────────────────────── */
function useCountUp(target: number, dur: number, active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    let t0: number | null = null;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (dur * 1000), 1);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, dur]);
  return n;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Particle field ─────────────────────────────────────────── */
function Particles({ count = 28 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    dur: Math.random() * 10 + 8,
    delay: Math.random() * -12,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ── Typing text ────────────────────────────────────────────── */
function TypedText({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [char, setChar] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    if (!deleting && char < word.length) {
      const t = setTimeout(() => setChar(c => c + 1), 80);
      return () => clearTimeout(t);
    }
    if (!deleting && char === word.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && char > 0) {
      const t = setTimeout(() => setChar(c => c - 1), 45);
      return () => clearTimeout(t);
    }
    if (deleting && char === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % words.length);
    }
  }, [char, deleting, idx, words]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
      {words[idx].slice(0, char)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-0.5 h-[0.85em] bg-blue-400 ml-0.5 align-middle"
      />
    </span>
  );
}

/* ── data ───────────────────────────────────────────────────── */
const services = [
  { title: "Registered Agent", full: "Get a Registered Agent", href: "/services/registered-agent", icon: Shield },
  { title: "Annual Report", full: "Submit an Annual Report", href: "/services/annual-report", icon: Briefcase },
  { title: "Foreign Qualification", full: "Foreign Qualification", href: "/services/foreign-qualification", icon: Globe },
  { title: "Good Standing", full: "Get a Certificate of Good Standing", href: "/services/good-standing", icon: CheckCircle2 },
  { title: "Change Agent", full: "Change Of Registered Agent", href: "/services/change-agent", icon: Users },
  { title: "Name Change", full: "Company Name Change", href: "/services/name-change", icon: Building2 },
  { title: "S Corporation", full: "File for an S Corporation", href: "/services/s-corporation", icon: Award },
];

const entities = [
  {
    name: "LLC",
    sub: "Limited Liability Company",
    desc: "Flexible ownership and personal liability protection. The most popular choice for small businesses across the US.",
    features: ["Personal liability protection", "Pass-through taxation", "Flexible management", "Easy to maintain"],
    href: "/services/llc",
    badge: "Most Popular",
    gradient: "from-blue-500 to-blue-700",
  },
  {
    name: "C Corp",
    sub: "C Corporation",
    desc: "Ideal for startups seeking venture capital, issuing equity, and scaling without limits on shareholders.",
    features: ["Unlimited shareholders", "VC investment ready", "Stock options for employees", "Strong investor appeal"],
    href: "/services/c-corporation",
    badge: "Best for Startups",
    gradient: "from-indigo-500 to-indigo-700",
  },
  {
    name: "LTD",
    sub: "Limited Company",
    desc: "Built for international entrepreneurs who need a recognized, credible structure to operate across borders.",
    features: ["International credibility", "Cross-border operations", "Liability protection", "Global market access"],
    href: "/services/ltd",
    badge: "Global Reach",
    gradient: "from-violet-500 to-violet-700",
  },
];

const steps = [
  { num: "01", title: "Pick The Right Entity For You", desc: "Choose LLC, C Corporation, or LTD based on your goals. Our guides and experts help you decide fast." },
  { num: "02", title: "Complete a Simple Online Form", desc: "Answer a few clear questions about your business in under 5 minutes. No legal jargon." },
  { num: "03", title: "We Handle Everything Else", desc: "Noviatify files all documents with the state. You get confirmation and get back to building." },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Founder, TechFlow LLC", initials: "SM", content: "The absolute fastest way I've ever formed a company. The UI is gorgeous, the process is clear, and the support team actually answered my questions." },
  { name: "Marcus T.", role: "CEO, GreenLeaf Capital", initials: "MT", content: "I needed a C Corporation for my startup to attract investors. Noviatify handled everything flawlessly. Their registered agent service has kept us compliant." },
  { name: "David R.", role: "3x Founder", initials: "DR", content: "I've used Noviatify for three different formations now. Every single time it's faster and smoother than expected. This is the gold standard." },
  { name: "Elena M.", role: "Owner, Maison Designs", initials: "EM", content: "As an international founder I needed an LTD. Noviatify guided me every step of the way and handled all state filings. Couldn't be more satisfied." },
];

const stats = [
  { label: "Businesses Served", value: "1,000+", num: 1000 },
  { label: "States Covered", value: "50", num: 50 },
  { label: "Years of Excellence", value: "4+", num: 4 },
  { label: "Satisfaction Rate", value: "99%", num: 99 },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const countVal = useCountUp(900, 2.2, statsInView);

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060d2b]">
        {/* Gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#080f35]" />
        <motion.div style={{ y: springY }} className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-500/15 blur-[90px]" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-cyan-400/10 blur-[80px]" />
        </motion.div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <Particles count={30} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20 lg:pt-0 lg:pb-0 lg:min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center w-full lg:py-28">

            {/* Left text */}
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 mb-7 backdrop-blur-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                Hi, Let's work together
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.07] tracking-tight mb-6"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                Quick, Cost-Free,{" "}
                <TypedText words={["Award-Winning", "Fast & Simple", "Trusted by 1000+"]} />{" "}
                Business Formation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-white/65 mb-10 max-w-xl leading-relaxed"
              >
                Since 2020, join more than 1,000 business owners using Noviatify to start and grow their companies with total confidence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.52 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/start">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 20px 60px rgba(37,117,252,0.5)" }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-primary text-white font-bold px-8 py-4 rounded-full text-base shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    Start Now — It's Free
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
                <Link href="/how-it-works">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/16 border border-white/20 text-white font-medium px-6 py-4 rounded-full transition-all backdrop-blur-sm text-base"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    More reliable, confirmed reviews
                  </motion.button>
                </Link>
              </motion.div>

              {/* Social proof mini */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-4 mt-8"
              >
                <div className="flex -space-x-2.5">
                  {["SM", "MT", "DR", "EM"].map((init, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#060d2b] bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-white/60 text-xs">Trusted by 1,000+ founders</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right — animated dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.93 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              {/* Main card */}
              <div className="bg-white/8 border border-white/15 rounded-3xl p-6 backdrop-blur-md shadow-2xl">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  {["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"].map((c, i) => (
                    <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                  ))}
                  <div className="flex-1 h-5 bg-white/5 rounded-full mx-2 flex items-center px-3">
                    <span className="text-white/30 text-xs">noviatify.io/dashboard</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Active LLCs", val: "847", trend: "+12%" },
                    { label: "Filings Today", val: "23", trend: "+5%" },
                    { label: "Success Rate", val: "99%", trend: "All time" },
                  ].map(s => (
                    <div key={s.label} className="bg-white/6 border border-white/10 rounded-xl p-3">
                      <div className="text-white/40 text-xs mb-1">{s.label}</div>
                      <div className="text-white font-black text-xl">{s.val}</div>
                      <div className="text-green-400 text-xs mt-0.5">{s.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Filing list */}
                <div className="space-y-2.5">
                  {[
                    { name: "LLC Formation — California", status: "Completed", color: "text-green-400" },
                    { name: "C Corp Filing — Delaware", status: "In Progress", color: "text-blue-400" },
                    { name: "Registered Agent — Texas", status: "Completed", color: "text-green-400" },
                    { name: "Annual Report — New York", status: "Scheduled", color: "text-yellow-400" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.12 }}
                      className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl p-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/90 text-sm font-medium truncate">{item.name}</p>
                        <p className={`text-xs font-semibold ${item.color}`}>{item.status}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl"
              >
                Award Winning
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl"
              >
                Since 2020
              </motion.div>
              <motion.div
                animate={{ x: [-6, 6, -6], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 -right-8 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg"
              >
                Forbes Featured
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 90V48C180 10 360 0 540 18C720 36 900 72 1080 72C1260 72 1350 42 1440 30V90H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 max-w-3xl mx-auto leading-snug">
              More than{" "}
              <motion.span
                className="text-primary"
                animate={statsInView ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {countVal}+
              </motion.span>{" "}
              businesses believe in our services and think they will be the greatest in the world.
            </p>
          </FadeUp>

          {/* Press logos */}
          <FadeUp delay={0.1}>
            <p className="text-center text-xs text-gray-400 font-bold uppercase tracking-widest mb-5">Featured in</p>
            <div className="flex flex-wrap justify-center gap-6 mb-14">
              {[
                { name: "Forbes", style: "font-black text-2xl italic font-serif" },
                { name: "Entrepreneur 360", style: "font-bold text-base tracking-tight" },
                { name: "Going From Broke", style: "font-bold text-base uppercase italic" },
                { name: "Stevie Awards", style: "font-bold text-base" },
              ].map((p) => (
                <motion.div
                  key={p.name}
                  whileHover={{ scale: 1.07, opacity: 1 }}
                  className="px-7 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-700 hover:border-blue-100 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <span className={p.style}>{p.name}</span>
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.12)" }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 text-center shadow-sm transition-all duration-300"
                >
                  <div className="text-4xl font-extrabold text-primary mb-1">{s.value}</div>
                  <div className="text-sm text-gray-500 font-medium">{s.label}</div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTITY TYPES ─────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Entity Types</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mt-3 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Choose the right structure for your vision
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Not sure which to pick? Our experts make it simple to understand and effortless to form.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {entities.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(37,117,252,0.15)" }}
                  className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:border-blue-200 transition-all duration-400 cursor-pointer h-full flex flex-col"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${e.gradient}`} />
                  <div className="flex items-center justify-between mb-5">
                    <span className="bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full">{e.badge}</span>
                    <motion.div whileHover={{ rotate: 15 }} className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{e.name}</h3>
                  <p className="text-primary font-semibold text-sm mb-3">{e.sub}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{e.desc}</p>
                  <ul className="space-y-2 mb-7">
                    {e.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={e.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Form a {e.name}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[#060d2b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060d2b] via-[#0a1240] to-[#060d2b]" />
        <Particles count={18} />
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[130px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Process</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Begin Your Business in 3 Straightforward Steps
            </h2>
            <p className="text-white/55 text-lg max-w-2xl mx-auto">
              From brilliant plan to laid-out business — Noviatify has every tool and service you need, all in one place.
            </p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-14 left-[22%] right-[22%] h-px bg-gradient-to-r from-blue-600/0 via-blue-500/60 to-blue-600/0" />

            {steps.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.2}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="relative text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/50 group-hover:shadow-blue-500/40 transition-shadow"
                  >
                    <span className="text-white font-black text-2xl">{s.num}</span>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto">{s.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.6} className="text-center mt-14">
            <Link href="/how-it-works">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(37,117,252,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-blue-900/40 transition-all inline-flex items-center gap-2 group"
              >
                Learn More About the Process
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeUp className="max-w-2xl">
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Services</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Comprehensive compliance services
              </h2>
              <p className="text-gray-500 text-lg">Everything you need to keep your business in good standing, all in one place.</p>
            </FadeUp>
            <FadeUp>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-all text-sm"
                >
                  View all services
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {services.map((svc, i) => (
              <FadeUp key={svc.title} delay={i * 0.06}>
                <Link href={svc.href}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.12)" }}
                    className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                        <svc.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold text-gray-800 text-sm group-hover:text-primary transition-colors leading-tight">{svc.full}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <span className="text-primary text-sm font-bold uppercase tracking-widest">Why Noviatify</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3 mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Why ambitious founders choose Noviatify
              </h2>
              <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                We built our platform to eliminate every friction point of starting a business. No hidden fees, no legal jargon, no waiting weeks for simple filings.
              </p>
              <div className="space-y-5">
                {[
                  { title: "Award-winning service", sub: "Recognized by Forbes, Entrepreneur 360, and Stevie Awards", icon: Award, color: "text-yellow-500", bg: "bg-yellow-50" },
                  { title: "Fast processing", sub: "Most formations completed in 24–72 hours", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
                  { title: "Expert support", sub: "Real humans available to answer your questions", icon: Shield, color: "text-green-500", bg: "bg-green-50" },
                  { title: "1,000+ businesses served", sub: "Trusted by entrepreneurs across all 50 states", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-base">{item.title}</h4>
                      <p className="text-gray-500 text-sm mt-0.5">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Testimonials stack */}
            <div className="space-y-4">
              {testimonials.slice(0, 3).map((t, i) => (
                <FadeUp key={t.name} delay={0.1 + i * 0.15}>
                  <motion.div
                    whileHover={{ x: 8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm transition-all duration-300"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {Array(5).fill(0).map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed italic mb-4">"{t.content}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{t.initials}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <span className="text-primary text-sm font-bold uppercase tracking-widest">Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Trusted by founders everywhere
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(37,117,252,0.12)" }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-blue-100 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array(5).fill(0).map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic mb-5 flex-1">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{t.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-28 bg-[#060d2b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <Particles count={20} />
        <motion.div
          className="absolute inset-0"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 15, repeat: Infinity }}
          style={{ backgroundImage: "radial-gradient(ellipse at 30% 50%, rgba(37,117,252,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(99,102,241,0.2) 0%, transparent 60%)" }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Ready to make it official?
            </h2>
            <p className="text-white/65 text-xl mb-10 max-w-2xl mx-auto">
              Join 1,000+ businesses who started their journey with Noviatify. It takes less than 5 minutes.
            </p>
            <motion.div
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Link href="/start">
                <motion.button
                  whileHover={{ scale: 1.06, boxShadow: "0 0 70px rgba(255,255,255,0.25)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary font-extrabold text-lg px-14 py-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-3"
                >
                  Start Your Business Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <p className="text-white/35 text-sm mt-5">No credit card required. Setup in minutes.</p>
          </FadeUp>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-[#040918] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
            {/* Brand */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-5">
                <img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-90" />
              </Link>
              <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
                Quick, cost-free, award-winning business formation. We help entrepreneurs start and run their companies with confidence since 2020.
              </p>
              <div className="flex gap-3">
                {[
                  { name: "Facebook", href: "https://facebook.com" },
                  { name: "Twitter", href: "https://twitter.com" },
                  { name: "LinkedIn", href: "https://linkedin.com" },
                  { name: "YouTube", href: "https://youtube.com" },
                  { name: "WhatsApp", href: "https://whatsapp.com" },
                ].map(s => (
                  <motion.a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, backgroundColor: "hsl(221 93% 58%)" }}
                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-colors"
                    title={s.name}
                  >
                    <span className="text-xs font-bold text-white/70">{s.name[0]}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Entity Types */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Entity Types</h4>
              <ul className="space-y-3">
                {[
                  { label: "LLC", href: "/services/llc" },
                  { label: "C Corporation", href: "/services/c-corporation" },
                  { label: "LTD", href: "/services/ltd" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/45 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "/" },
                  { label: "Check Order Status", href: "/order-status" },
                  { label: "Research Tool", href: "/research" },
                  { label: "Pricing", href: "/pricing" },
                  { label: "Read the Blog", href: "/about/blog" },
                  { label: "About Us", href: "/about" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/45 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-5">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "Contact Us", href: "/about/contact" },
                  { label: "Noviatify Partnerships", href: "/about/partnerships" },
                  { label: "Privacy Policy", href: "/privacy" },
                  { label: "Terms Of Service", href: "/terms" },
                ].map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-white/45 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
            <p className="text-white/30 text-sm">Award-winning service since 2020</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
