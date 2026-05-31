import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Check, Building2, FileText, CheckCircle2, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useContent } from "@/content/ContentContext";
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
      className="border border-white/10 rounded-2xl overflow-hidden shadow-sm"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white/[0.04] hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
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
            <p className="px-5 pb-5 text-white/55 text-sm leading-relaxed bg-white/[0.04]">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MiniFooter() {
  const content = useContent();
  const { footer } = content.site;
  return (
    <footer className="bg-[#040918] text-white py-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" />
        </Link>
        <p className="text-white/30 text-sm">{footer.copyright}</p>
        <div className="flex gap-5 text-sm text-white/40">
          {footer.links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

const stepIcons = [Building2, FileText, CheckCircle2];
const stepColors = ["from-blue-500 to-blue-700", "from-indigo-500 to-indigo-700", "from-violet-500 to-violet-700"];
const entityColors = ["from-blue-500 to-blue-700", "from-indigo-500 to-indigo-700", "from-violet-500 to-violet-700", "from-cyan-500 to-cyan-700"];

export default function HowItWorks() {
  const content = useContent();
  const { hero, steps, entities, faq, cta } = content.howItWorks;

  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">{hero.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {hero.title}
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-8 leading-relaxed">
              {hero.subtitle}
            </p>
            <Link href={hero.cta.href}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group"
              >
                {hero.cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="#060d2b" />
          </svg>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {steps.title}
            </h2>
          </FadeUp>

          <div className="space-y-24">
            {steps.items.map((step, i) => {
              const StepIcon = stepIcons[i % stepIcons.length];
              const color = stepColors[i % stepColors.length];
              return (
                <FadeUp key={step.num} delay={0.1}>
                  <div className={`grid lg:grid-cols-2 gap-14 items-center ${i % 2 === 1 ? "lg:grid-flow-dense" : ""}`}>
                    <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                      <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white font-black text-xl shadow-lg mb-6`}>
                        {step.num}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                        {step.title}
                      </h3>
                      <p className="text-white/55 text-lg leading-relaxed mb-6">{step.desc}</p>
                      <p className="font-semibold text-white mb-3">{step.extra}</p>
                      <ul className="space-y-2">
                        {step.list.map(item => (
                          <motion.li key={item} className="flex items-center gap-2 text-white/80" whileHover={{ x: 4 }}>
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className={i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                      <motion.div
                        whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                        className={`bg-gradient-to-br ${color} rounded-3xl p-10 flex items-center justify-center min-h-56 shadow-2xl`}
                      >
                        <StepIcon className="w-28 h-28 text-white/30" />
                      </motion.div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Entity types */}
      <section className="py-20 bg-[#0a1330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {entities.title}
            </h2>
            <p className="text-white/55 mt-3 text-lg">{entities.subtitle}</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {entities.items.map((e, i) => (
              <FadeUp key={e.name} delay={i * 0.1}>
                <Link href={e.href}>
                  <motion.div
                    whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(37,117,252,0.15)" }}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer text-center group"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${entityColors[i % entityColors.length]} flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-extrabold text-white text-xl mb-1">{e.name}</h3>
                    <p className="text-white/55 text-sm mb-4">{e.sub}</p>
                    <span className="text-primary text-sm font-semibold group-hover:underline">{entities.cardCta}</span>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {faq.title}
            </h2>
          </FadeUp>
          <div className="space-y-4">
            {faq.items.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{cta.title}</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{cta.subtitle}</p>
            <Link href={cta.button.href}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-primary font-extrabold px-12 py-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-lg"
              >
                {cta.button.label}
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
