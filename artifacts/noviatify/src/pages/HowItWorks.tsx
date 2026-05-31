import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Building2, FileText, CheckCircle2, Globe } from "lucide-react";
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

function FaqItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4">{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-primary text-xl font-bold flex-shrink-0">+</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-gray-500 text-sm leading-relaxed bg-white">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MiniFooter() {
  return (
    <footer className="bg-[#040918] text-white py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" />
        </Link>
        <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
        <div className="flex gap-5 text-sm text-white/40">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/about/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

const steps = [
  {
    num: "1",
    title: "Pick The Right Entity For You",
    desc: "Pick an entity type and the state you want to incorporate in. Need help with state-specific formation subtleties? We take care of you. Look at our Noviatify State Guides for detailed advice on every state.",
    extra: "Entity types available:",
    list: ["LLC", "C-Corporation", "S-Corporation", "Non-Profit", "LTD"],
    icon: Building2,
    color: "from-blue-500 to-blue-700",
  },
  {
    num: "2",
    title: "Complete Your Application Online",
    desc: "Fill out our streamlined online application in under 5 minutes. No confusing legalese — just clear, simple questions about your business. We guide you every step of the way.",
    extra: "What we ask for:",
    list: ["Business name", "Owner information", "State of formation", "Business address (we provide one if needed)"],
    icon: FileText,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    num: "3",
    title: "We Handle Everything Else",
    desc: "Noviatify files all documents with the state on your behalf. You receive a confirmation email and your official formation documents. Fast, worry-free filing — you just focus on building your business.",
    extra: "What's included:",
    list: ["State filing fees covered", "Registered Agent included", "Digital document storage", "Ongoing compliance reminders"],
    icon: CheckCircle2,
    color: "from-violet-500 to-violet-700",
  },
];

const faqs = [
  { q: "How long does business formation take?", a: "Most LLC and Corporation formations are completed within 24–72 hours. Expedited options are available for same-day filing in most states." },
  { q: "Do I need a physical address in the state?", a: "No. Noviatify provides a registered agent address in your state of formation, so you don't need to rent office space just to form your company." },
  { q: "What is a Registered Agent?", a: "A registered agent is a person or company designated to receive official legal and government documents on behalf of your business. Every LLC and Corporation is required to have one." },
  { q: "Can I form a business in any state?", a: "Yes. Noviatify operates in all 50 U.S. states. Many clients choose Delaware, Wyoming, or their home state depending on their goals." },
  { q: "Is there anything hidden in the cost?", a: "Never. Noviatify is transparent about all fees. State filing fees are clearly disclosed before you complete your application." },
  { q: "Can I change my entity type later?", a: "Yes. Noviatify offers entity conversion services. You can convert an LLC to a Corporation or vice versa as your business needs evolve." },
];

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">Process</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              How Noviatify Works
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-8 leading-relaxed">
              From brilliant plan to laid-out business, Noviatify has every one of the tools and services you really need, across the board — all in one place.
            </p>
            <Link href="/start">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Begin Your Business in 3 Straightforward Steps
            </h2>
          </FadeUp>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <FadeUp key={step.num} delay={0.1}>
                <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} text-white font-black text-xl shadow-lg mb-6`}>
                      {step.num}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-6">{step.desc}</p>
                    <p className="font-semibold text-gray-900 mb-3">{step.extra}</p>
                    <ul className="space-y-2">
                      {step.list.map(item => (
                        <motion.li key={item} className="flex items-center gap-2 text-gray-700" whileHover={{ x: 4 }}>
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                      className={`bg-gradient-to-br ${step.color} rounded-3xl p-10 flex items-center justify-center min-h-56 shadow-2xl`}
                    >
                      <step.icon className="w-28 h-28 text-white/30" />
                    </motion.div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Entity types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Supported Entity Types
            </h2>
            <p className="text-gray-500 mt-3 text-lg">Form any of the following structures through Noviatify</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "LLC", sub: "Limited Liability Company", href: "/services/llc", color: "from-blue-500 to-blue-700" },
              { name: "C Corporation", sub: "C Corp", href: "/services/c-corporation", color: "from-indigo-500 to-indigo-700" },
              { name: "S Corporation", sub: "Tax election", href: "/services/s-corporation", color: "from-violet-500 to-violet-700" },
              { name: "LTD", sub: "Limited Company", href: "/services/ltd", color: "from-cyan-500 to-cyan-700" },
            ].map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.1}>
                <Link href={e.href}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(37,117,252,0.15)" }}
                    className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer text-center group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${e.color} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-extrabold text-gray-900 text-xl mb-1">{e.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{e.sub}</p>
                    <span className="text-primary text-sm font-semibold group-hover:underline">Form this entity →</span>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Frequently Asked Questions
            </h2>
          </FadeUp>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FaqItem key={i} q={faq.q} a={faq.a} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Ready to get started?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">Join 1,000+ businesses formed through Noviatify. Start your company in minutes, not weeks.</p>
            <Link href="/start">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-primary font-extrabold px-12 py-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-lg"
              >
                Start Now — It's Free
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </FadeUp>
        </div>
      </section>

      <MiniFooter />
    </div>
  );
}
