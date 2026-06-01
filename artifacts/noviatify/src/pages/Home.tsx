import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Star, Shield, Zap, Award, Users,
  Building2, Globe, Briefcase, ChevronRight, Play
} from "lucide-react";
import logoPath from "@assets/noviatify-logo.png";
import Navbar from "@/components/Navbar";
import { useContent } from "@/content/ContentContext";
import { Editable } from "@/components/admin/Editable";

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
    return undefined;
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

/* ── meta (icons / gradient tokens kept in code) ────────────── */
const serviceIcons = [Shield, Briefcase, Globe, CheckCircle2, Users, Building2, Award];
const entityGradients = ["from-blue-500 to-blue-700", "from-indigo-500 to-indigo-700", "from-violet-500 to-violet-700"];
const pressStyles = [
  "font-black text-2xl italic font-serif",
  "font-bold text-base tracking-tight",
  "font-bold text-base uppercase italic",
  "font-bold text-base",
];
const whyIcons = [
  { icon: Award, color: "text-yellow-500", bg: "bg-yellow-50" },
  { icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Shield, color: "text-green-500", bg: "bg-green-50" },
  { icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
];

export default function Home() {
  const content = useContent();
  const c = content.home;
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const springY = useSpring(heroY, { stiffness: 100, damping: 30 });

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const countVal = useCountUp(900, 2.2, statsInView);

  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
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
                <Editable as="span" path="home.hero.badge" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.07] tracking-tight mb-6"
                style={{ fontFamily: "'Inter Tight', sans-serif" }}
              >
                <Editable as="span" path="home.hero.titlePrefix" />{" "}
                <TypedText words={c.hero.typedWords} />{" "}
                <Editable as="span" path="home.hero.titleSuffix" />
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg text-white/65 mb-10 max-w-xl leading-relaxed"
              >
                <Editable as="span" path="home.hero.description" multiline />
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
                    <Editable as="span" path="home.hero.primaryCta" />
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
                    <Editable as="span" path="home.hero.secondaryCta" />
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
                  {c.hero.avatars.map((init, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#060d2b] bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {init}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-0.5">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <Editable as="p" className="text-white/60 text-xs" path="home.hero.socialProof" />
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
                    <Editable as="span" className="text-white/30 text-xs" path="home.dashboard.url" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {c.dashboard.stats.map((s, i) => (
                    <div key={s.label} className="bg-white/6 border border-white/10 rounded-xl p-3">
                      <Editable as="div" className="text-white/40 text-xs mb-1" path={`home.dashboard.stats.${i}.label`} />
                      <Editable as="div" className="text-white font-black text-xl" path={`home.dashboard.stats.${i}.val`} />
                      <Editable as="div" className="text-green-400 text-xs mt-0.5" path={`home.dashboard.stats.${i}.trend`} />
                    </div>
                  ))}
                </div>

                {/* Filing list */}
                <div className="space-y-2.5">
                  {c.dashboard.filings.map((item, i) => (
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
                        <Editable as="p" className="text-white/90 text-sm font-medium truncate" path={`home.dashboard.filings.${i}.name`} />
                        <Editable as="p" className={`text-xs font-semibold ${item.color}`} path={`home.dashboard.filings.${i}.status`} />
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
                <Editable as="span" path="home.dashboard.badges.award" />
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 bg-gradient-to-r from-primary to-indigo-600 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl"
              >
                <Editable as="span" path="home.dashboard.badges.since" />
              </motion.div>
              <motion.div
                animate={{ x: [-6, 6, -6], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 -right-8 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-xl shadow-lg"
              >
                <Editable as="span" path="home.dashboard.badges.forbes" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 90" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 90V48C180 10 360 0 540 18C720 36 900 72 1080 72C1260 72 1350 42 1440 30V90H0Z" fill="#060d2b" />
          </svg>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────── */}
      <section ref={statsRef} className="py-16 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-3xl mx-auto leading-snug">
              <Editable as="span" path="home.socialProof.headingPrefix" />{" "}
              <motion.span
                className="text-primary"
                animate={statsInView ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {countVal}+
              </motion.span>{" "}
              <Editable as="span" path="home.socialProof.headingSuffix" multiline />
            </p>
          </FadeUp>

          {/* Press logos */}
          <FadeUp delay={0.1}>
            <Editable as="p" className="text-center text-xs text-white/40 font-bold uppercase tracking-widest mb-5" path="home.socialProof.featuredInLabel" />
            <div className="flex flex-wrap justify-center gap-6 mb-14">
              {c.socialProof.press.map((name, i) => (
                <motion.div
                  key={name}
                  whileHover={{ scale: 1.07, opacity: 1 }}
                  className="px-7 py-4 bg-white/[0.03] border border-white/5 rounded-2xl text-white/40 hover:text-white/80 hover:border-white/10 hover:shadow-md transition-all duration-300 cursor-default"
                >
                  <Editable as="span" className={pressStyles[i % pressStyles.length]} path={`home.socialProof.press.${i}`} />
                </motion.div>
              ))}
            </div>
          </FadeUp>

          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {c.socialProof.stats.map((s, i) => (
              <FadeUp key={s.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.12)" }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 text-center shadow-sm transition-all duration-300"
                >
                  <Editable as="div" className="text-4xl font-extrabold text-primary mb-1" path={`home.socialProof.stats.${i}.value`} />
                  <Editable as="div" className="text-sm text-white/55 font-medium" path={`home.socialProof.stats.${i}.label`} />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTITY TYPES ─────────────────────────────────────── */}
      <section className="py-24 bg-[#0a1330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <Editable as="span" className="text-primary text-sm font-bold uppercase tracking-widest" path="home.entities.label" />
            <Editable as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.entities.title" />
            <Editable as="p" className="text-white/55 text-lg max-w-2xl mx-auto" path="home.entities.subtitle" multiline />
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-8">
            {c.entities.items.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(37,117,252,0.15)" }}
                  className="group relative bg-white/[0.04] border border-white/10 rounded-3xl p-8 shadow-sm hover:border-blue-200 transition-all duration-400 cursor-pointer h-full flex flex-col"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${entityGradients[i % entityGradients.length]}`} />
                  <div className="flex items-center justify-between mb-5">
                    <Editable as="span" className="bg-white/5 text-primary text-xs font-bold px-3 py-1 rounded-full" path={`home.entities.items.${i}.badge`} />
                    <motion.div whileHover={{ rotate: 15 }} className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  <Editable as="h3" className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Inter Tight', sans-serif" }} path={`home.entities.items.${i}.name`} />
                  <Editable as="p" className="text-primary font-semibold text-sm mb-3" path={`home.entities.items.${i}.sub`} />
                  <Editable as="p" className="text-white/55 text-sm leading-relaxed mb-6 flex-1" path={`home.entities.items.${i}.desc`} multiline />
                  <ul className="space-y-2 mb-7">
                    {e.features.map((f, fi) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <Editable as="span" path={`home.entities.items.${i}.features.${fi}`} />
                      </li>
                    ))}
                  </ul>
                  <Link href={e.href}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Editable as="span" path="home.entities.ctaPrefix" />{" "}
                      <Editable as="span" path={`home.entities.items.${i}.name`} />
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
            <Editable as="span" className="text-blue-400 text-sm font-bold uppercase tracking-widest" path="home.howItWorks.label" />
            <Editable as="h2" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-3 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.howItWorks.title" />
            <Editable as="p" className="text-white/55 text-lg max-w-2xl mx-auto" path="home.howItWorks.subtitle" multiline />
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-14 left-[22%] right-[22%] h-px bg-gradient-to-r from-blue-600/0 via-blue-500/60 to-blue-600/0" />

            {c.howItWorks.steps.map((s, i) => (
              <FadeUp key={s.num} delay={i * 0.2}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="relative text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-blue-900/50 group-hover:shadow-blue-500/40 transition-shadow"
                  >
                    <Editable as="span" className="text-white font-black text-2xl" path={`home.howItWorks.steps.${i}.num`} />
                  </motion.div>
                  <Editable as="h3" className="text-xl font-bold text-white mb-3" path={`home.howItWorks.steps.${i}.title`} />
                  <Editable as="p" className="text-white/55 text-sm leading-relaxed max-w-xs mx-auto" path={`home.howItWorks.steps.${i}.desc`} multiline />
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
                <Editable as="span" path="home.howItWorks.cta" />
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <FadeUp className="max-w-2xl">
              <Editable as="span" className="text-primary text-sm font-bold uppercase tracking-widest" path="home.services.label" />
              <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.services.title" />
              <Editable as="p" className="text-white/55 text-lg" path="home.services.subtitle" multiline />
            </FadeUp>
            <FadeUp>
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-white/10 text-white/80 font-semibold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-all text-sm"
                >
                  <Editable as="span" path="home.services.viewAll" />
                </motion.button>
              </Link>
            </FadeUp>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {c.services.items.map((svc, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
              <FadeUp key={svc.full} delay={i * 0.06}>
                <Link href={svc.href}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.12)" }}
                    className="group bg-white/[0.04] border border-white/10 rounded-2xl p-5 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-semibold text-white/80 text-sm group-hover:text-primary transition-colors leading-tight">{svc.full}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                  </motion.div>
                </Link>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section id="about" className="py-24 bg-[#0a1330] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <Editable as="span" className="text-primary text-sm font-bold uppercase tracking-widest" path="home.whyChooseUs.label" />
              <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.whyChooseUs.title" />
              <Editable as="p" className="text-white/55 text-lg mb-10 leading-relaxed" path="home.whyChooseUs.description" multiline />
              <div className="space-y-5">
                {c.whyChooseUs.items.map((item, i) => {
                  const meta = whyIcons[i % whyIcons.length];
                  const Icon = meta.icon;
                  return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 cursor-default"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <Editable as="h4" className="font-bold text-white text-base" path={`home.whyChooseUs.items.${i}.title`} />
                      <Editable as="p" className="text-white/55 text-sm mt-0.5" path={`home.whyChooseUs.items.${i}.sub`} />
                    </div>
                  </motion.div>
                  );
                })}
              </div>
            </FadeUp>

            {/* Testimonials stack */}
            <div className="space-y-4">
              {c.testimonials.items.slice(0, 3).map((t, i) => (
                <FadeUp key={t.name} delay={0.1 + i * 0.15}>
                  <motion.div
                    whileHover={{ x: 8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm transition-all duration-300"
                  >
                    <div className="flex gap-0.5 mb-3">
                      {Array(5).fill(0).map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-white/80 text-sm leading-relaxed italic mb-4">"<Editable as="span" path={`home.testimonials.items.${i}.content`} multiline />"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs">{t.initials}</span>
                      </div>
                      <div>
                        <Editable as="p" className="font-semibold text-white text-sm" path={`home.testimonials.items.${i}.name`} />
                        <Editable as="p" className="text-white/40 text-xs" path={`home.testimonials.items.${i}.role`} />
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
      <section className="py-24 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="span" className="text-primary text-sm font-bold uppercase tracking-widest" path="home.testimonials.label" />
            <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-white mt-3" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.testimonials.title" />
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.testimonials.items.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 50px rgba(37,117,252,0.12)" }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:border-blue-100 transition-all duration-300 h-full flex flex-col"
                >
                  <div className="flex gap-0.5 mb-3">
                    {Array(5).fill(0).map((_, si) => <Star key={si} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed italic mb-5 flex-1">"<Editable as="span" path={`home.testimonials.items.${i}.content`} multiline />"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs">{t.initials}</span>
                    </div>
                    <div>
                      <Editable as="p" className="font-semibold text-white text-sm" path={`home.testimonials.items.${i}.name`} />
                      <Editable as="p" className="text-white/40 text-xs" path={`home.testimonials.items.${i}.role`} />
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
            <Editable as="h2" className="text-4xl sm:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="home.cta.title" />
            <Editable as="p" className="text-white/65 text-xl mb-10 max-w-2xl mx-auto" path="home.cta.subtitle" multiline />
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
                  <Editable as="span" path="home.cta.button" />
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <Editable as="p" className="text-white/35 text-sm mt-5" path="home.cta.fineprint" />
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
              <Editable as="p" className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs" path="home.footer.brandDescription" multiline />
              <div className="flex gap-3">
                {c.footer.socials.map(s => (
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

            {/* Link columns */}
            {c.footer.columns.map((col, ci) => (
              <div key={col.title}>
                <Editable as="h4" className="font-bold text-sm uppercase tracking-wider mb-5" path={`home.footer.columns.${ci}.title`} />
                <ul className="space-y-3">
                  {col.links.map((l, li) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-white/45 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"><Editable as="span" path={`home.footer.columns.${ci}.links.${li}.label`} /></Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <Editable as="p" className="text-white/30 text-sm" path="site.footer.copyright" />
            <div className="flex items-center gap-5">
              {content.site.footer.links.map((l, i) => (
                <Link key={l.href} href={l.href} className="text-white/30 hover:text-white text-sm transition-colors"><Editable as="span" path={`site.footer.links.${i}.label`} /></Link>
              ))}
            </div>
            <Editable as="p" className="text-white/30 text-sm" path="home.footer.tagline" />
          </div>
        </div>
      </footer>
    </div>
  );
}
