import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, HeadphonesIcon, FileCheck, Star, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoPath from "@assets/noviatify-logo.png";

interface GenericPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: { label: string; href: string };
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const trustFeatures = [
  {
    icon: Zap,
    title: "Lightning-Fast Filing",
    desc: "Most formations are completed within 24–72 hours. Expedited options available for same-day processing.",
    color: "from-blue-500 to-blue-700",
  },
  {
    icon: ShieldCheck,
    title: "100% Compliance Guarantee",
    desc: "Every filing is reviewed by our compliance team before submission. We stand behind every document we file.",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    desc: "Our business formation specialists are available to answer questions throughout your entire process.",
    color: "from-violet-500 to-violet-700",
  },
  {
    icon: FileCheck,
    title: "All 50 States",
    desc: "Noviatify operates in every U.S. state. Form your business wherever your goals take you.",
    color: "from-cyan-500 to-cyan-700",
  },
];

const testimonials = [
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
];

const faqs = [
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
];

export default function GenericPage({
  title,
  subtitle,
  description = "Noviatify handles all the paperwork so you can focus on what matters — building your business.",
  cta = { label: "Start Now — It's Free", href: "/start" },
}: GenericPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {subtitle && <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">{subtitle}</span>}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 max-w-3xl" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{title}</h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-8">{description}</p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link href={cta.href}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group"
                >
                  {cta.label}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/how-it-works" className="text-white/60 hover:text-white text-sm font-medium transition-colors underline underline-offset-4">
                See how it works
              </Link>
            </div>

            {/* Quick trust bar */}
            <div className="flex flex-wrap gap-6 mt-10">
              {["No hidden fees", "All 50 states", "24–72 hr filing", "1,000+ businesses formed"].map(item => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Why Noviatify */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Why Thousands Choose Noviatify
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From first-time founders to serial entrepreneurs, Noviatify delivers the speed, accuracy, and support you need.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((f, i) => (
              <FadeUp key={f.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.1)" }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* How it works mini-strip */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Get Started in 3 Simple Steps
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: "1", label: "Choose Your Entity", desc: "Pick the business structure that fits your goals and the state where you want to form." },
              { num: "2", label: "Complete the Form", desc: "Answer a few simple questions online. No legal jargon — just plain, clear prompts." },
              { num: "3", label: "We File For You", desc: "Noviatify submits everything to the state and delivers your formation documents by email." },
            ].map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/30">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{step.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4} className="text-center mt-10">
            <Link href={cta.href}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/30 hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                {cta.label}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Trusted by Business Owners
            </h2>
            <p className="text-gray-500">Real reviews from real Noviatify customers</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">"{t.body}"</p>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Common Questions
            </h2>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Ready to make it official?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
              Join 1,000+ business owners who trusted Noviatify to get their company off the ground — fast and stress-free.
            </p>
            <Link href={cta.href}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-primary font-extrabold px-12 py-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-lg"
              >
                {cta.label}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040918] text-white py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" /></Link>
          <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
          <div className="flex gap-5 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/about/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
