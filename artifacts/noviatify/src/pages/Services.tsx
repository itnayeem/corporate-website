import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Briefcase, Globe, CheckCircle2, Users, Building2, Award, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoPath from "@assets/noviatify-logo.png";
import { useContent } from "@/content/ContentContext";

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

const entityIcons = [Building2, Briefcase, Globe];
const serviceIcons = [Shield, FileText, Globe, CheckCircle2, Users, Building2, Award];

export default function Services() {
  const content = useContent();
  const s = content.services;
  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">{s.hero.eyebrow}</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              {s.hero.title}
            </h1>
            <p className="text-white/60 text-lg max-w-xl mb-8 leading-relaxed">
              {s.hero.subtitle}
            </p>
            <Link href={s.hero.cta.href}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group">
                {s.hero.cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="#060d2b" />
          </svg>
        </div>
      </section>

      {/* Entity types */}
      <section className="py-24 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.entitiesSection.title}</h2>
            <p className="text-white/55 text-lg mt-3 max-w-2xl mx-auto">{s.entitiesSection.subtitle}</p>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8">
            {s.entities.map((e, i) => {
              const Icon = entityIcons[i % entityIcons.length];
              return (
              <FadeUp key={e.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -10, boxShadow: "0 30px 60px rgba(37,117,252,0.15)" }}
                  className="group bg-white/[0.04] border border-white/10 rounded-3xl p-8 shadow-sm hover:border-blue-200 transition-all duration-400 h-full flex flex-col"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl bg-gradient-to-r ${e.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <span className="bg-white/5 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">{e.badge}</span>
                  <h3 className="text-3xl font-black text-white mb-1">{e.name}</h3>
                  <p className="text-primary text-sm font-semibold mb-3">{e.full}</p>
                  <p className="text-white/55 text-sm leading-relaxed mb-5 flex-1">{e.desc}</p>
                  <p className="text-xs text-white/40 font-semibold mb-3 uppercase tracking-wider">{s.entitiesSection.includesLabel}</p>
                  <ul className="space-y-1.5 mb-7">
                    {e.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />{f}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-white/40 mb-4">{e.price}</p>
                  <Link href={e.href}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 flex items-center justify-center gap-2">
                      {s.entitiesSection.formLabelPrefix}{e.name}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </motion.div>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance services */}
      <section className="py-24 bg-[#0a1330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.complianceSection.title}</h2>
            <p className="text-white/55 text-lg mt-3 max-w-2xl mx-auto">{s.complianceSection.subtitle}</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {s.complianceServices.map((svc, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              return (
              <FadeUp key={svc.title} delay={i * 0.08}>
                <Link href={svc.href}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.10)" }}
                    className="group bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all duration-300 cursor-pointer h-full flex flex-col"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${svc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-base mb-2">{svc.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-4 flex-1">{svc.desc}</p>
                    <ul className="space-y-1 mb-4">
                      {svc.includes.slice(0, 3).map(item => (
                        <li key={item} className="flex items-center gap-2 text-xs text-white/55">
                          <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                    <span className="text-primary text-sm font-semibold group-hover:underline inline-flex items-center gap-1">
                      {s.complianceSection.learnMore} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.div>
                </Link>
              </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{s.cta.title}</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">{s.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={s.cta.primary.href}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary font-extrabold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  {s.cta.primary.label} <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href={s.cta.secondary.href}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-full hover:border-white transition-colors inline-flex items-center gap-2">
                  {s.cta.secondary.label}
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
          <p className="text-white/30 text-sm">{content.site.footer.copyright}</p>
          <div className="flex gap-5 text-sm text-white/40">
            {content.site.footer.links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
