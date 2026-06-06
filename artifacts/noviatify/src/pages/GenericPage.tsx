import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, HeadphonesIcon, FileCheck, Star, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoPath from "@assets/noviatify-logo.png";
import { useContent } from "@/content/ContentContext";
import { Editable } from "@/components/admin/Editable";
import { EditableLink } from "@/components/admin/EditableLink";

interface GenericPageProps {
  pageKey: string;
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

// Visual config kept in code; index-mapped to content.site.genericShared.features
const featureVisuals = [
  { icon: Zap, color: "from-blue-500 to-blue-700" },
  { icon: ShieldCheck, color: "from-indigo-500 to-indigo-700" },
  { icon: HeadphonesIcon, color: "from-violet-500 to-violet-700" },
  { icon: FileCheck, color: "from-cyan-500 to-cyan-700" },
];

export default function GenericPage({ pageKey }: GenericPageProps) {
  const content = useContent();
  const pages = content.site.genericPages as Record<
    string,
    { title: string; subtitle: string; description: string; cta: { label: string; href: string } }
  >;
  const page = pages[pageKey] ?? {
    title: "Noviatify",
    subtitle: "",
    description:
      "Noviatify handles all the paperwork so you can focus on what matters — building your business.",
    cta: { label: "Start Now — It's Free", href: "/start" },
  };
  const shared = content.site.genericShared;
  const footer = content.site.footer;
  const { subtitle, cta } = page;

  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {subtitle && <Editable as="span" className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4" path={`site.genericPages.${pageKey}.subtitle`} />}
            <Editable as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 max-w-3xl" style={{ fontFamily: "'Inter Tight', sans-serif" }} path={`site.genericPages.${pageKey}.title`} />
            <Editable as="p" className="text-white/60 text-lg max-w-xl leading-relaxed mb-8" multiline path={`site.genericPages.${pageKey}.description`} />

            <div className="flex flex-wrap gap-4 items-center">
              <EditableLink path={`site.genericPages.${pageKey}.cta.href`}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group"
                >
                  <Editable as="span" path={`site.genericPages.${pageKey}.cta.label`} />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </EditableLink>
              <EditableLink path="site.genericShared.seeHowHref" className="text-white/60 hover:text-white text-sm font-medium transition-colors underline underline-offset-4">
                <Editable as="span" path="site.genericShared.seeHow" />
              </EditableLink>
            </div>

            {/* Quick trust bar */}
            <div className="flex flex-wrap gap-6 mt-10">
              {shared.trustBar.map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-white/50 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <Editable as="span" path={`site.genericShared.trustBar.${i}`} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="#060d2b" />
          </svg>
        </div>
      </section>

      {/* Why Noviatify */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="site.genericShared.whyTitle" />
            <Editable as="p" className="text-white/55 text-lg max-w-2xl mx-auto" multiline path="site.genericShared.whySubtitle" />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shared.features.map((f, i) => {
              const Icon = featureVisuals[i % featureVisuals.length].icon;
              const color = featureVisuals[i % featureVisuals.length].color;
              return (
                <FadeUp key={f.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
                    className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm h-full"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Editable as="h3" className="font-bold text-white text-base mb-2" path={`site.genericShared.features.${i}.title`} />
                    <Editable as="p" className="text-white/55 text-sm leading-relaxed" multiline path={`site.genericShared.features.${i}.desc`} />
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works mini-strip */}
      <section className="py-20 bg-[#0a1330]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="site.genericShared.stepsTitle" />
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-8">
            {shared.steps.map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.12}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/30">
                    <Editable as="span" path={`site.genericShared.steps.${i}.num`} />
                  </div>
                  <Editable as="h3" className="font-bold text-white text-lg mb-2" path={`site.genericShared.steps.${i}.label`} />
                  <Editable as="p" className="text-white/55 text-sm leading-relaxed" multiline path={`site.genericShared.steps.${i}.desc`} />
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.4} className="text-center mt-10">
            <EditableLink path={`site.genericPages.${pageKey}.cta.href`}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/30 hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
              >
                <Editable as="span" path={`site.genericPages.${pageKey}.cta.label`} />
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </EditableLink>
          </FadeUp>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Editable as="h2" className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="site.genericShared.testimonialsTitle" />
            <Editable as="p" className="text-white/55" path="site.genericShared.testimonialsSubtitle" />
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {shared.testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.stars }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed flex-1 mb-4">"<Editable as="span" multiline path={`site.genericShared.testimonials.${i}.body`} />"</p>
                  <div>
                    <Editable as="p" className="font-semibold text-white text-sm" path={`site.genericShared.testimonials.${i}.name`} />
                    <Editable as="p" className="text-white/40 text-xs" path={`site.genericShared.testimonials.${i}.role`} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0a1330]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <Editable as="h2" className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="site.genericShared.faqTitle" />
          </FadeUp>
          <div className="space-y-4">
            {shared.faqs.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm">
                  <Editable as="h3" className="font-bold text-white mb-2" multiline path={`site.genericShared.faqs.${i}.q`} />
                  <Editable as="p" className="text-white/55 text-sm leading-relaxed" multiline path={`site.genericShared.faqs.${i}.a`} />
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
            <Editable as="h2" className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="site.genericShared.ctaTitle" />
            <Editable as="p" className="text-blue-100 text-lg mb-8 max-w-xl mx-auto" multiline path="site.genericShared.ctaSubtitle" />
            <EditableLink path={`site.genericPages.${pageKey}.cta.href`}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-primary font-extrabold px-12 py-5 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2 text-lg"
              >
                <Editable as="span" path={`site.genericPages.${pageKey}.cta.label`} />
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </EditableLink>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040918] text-white py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" /></Link>
          <Editable as="p" className="text-white/30 text-sm" path="site.footer.copyright" />
          <div className="flex gap-5 text-sm text-white/40">
            {footer.links.map((l, i) => (
              <EditableLink key={l.href} path={`site.footer.links.${i}.href`} className="hover:text-white transition-colors"><Editable as="span" path={`site.footer.links.${i}.label`} /></EditableLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
