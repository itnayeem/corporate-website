import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, Globe, Zap, Shield, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useContent } from "@/content/ContentContext";
import { Editable } from "@/components/admin/Editable";
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

const statMeta = [
  { icon: Globe, color: "text-blue-400" },
  { icon: Users, color: "text-purple-400" },
  { icon: Award, color: "text-yellow-400" },
  { icon: Zap, color: "text-green-400" },
];

const valueMeta = [
  { icon: Shield, color: "text-blue-400 bg-blue-500/10" },
  { icon: Zap, color: "text-yellow-400 bg-yellow-500/10" },
  { icon: Users, color: "text-green-400 bg-green-500/10" },
  { icon: Award, color: "text-purple-400 bg-purple-500/10" },
  { icon: Globe, color: "text-cyan-400 bg-cyan-500/10" },
  { icon: Star, color: "text-orange-400 bg-orange-500/10" },
];

export default function About() {
  const content = useContent();
  const { mission, milestones, awardsSection, teamSection, valuesSection, cta } = content.about;

  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Editable as="span" className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4" path="about.hero.eyebrow" />
            <Editable as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.hero.title" />
            <Editable as="p" className="text-white/60 text-lg max-w-2xl leading-relaxed" path="about.hero.subtitle" multiline />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="#060d2b" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-white mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.mission.title" />
              {mission.paragraphs.map((p, i) => (
                <Editable key={i} as="p" className={`text-white/55 text-lg leading-relaxed ${i === mission.paragraphs.length - 1 ? "mb-8" : "mb-6"}`} path={`about.mission.paragraphs.${i}`} multiline />
              ))}
              <div className="grid grid-cols-2 gap-5">
                {mission.stats.map((item, i) => {
                  const meta = statMeta[i % statMeta.length];
                  const Icon = meta.icon;
                  return (
                    <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 rounded-2xl p-4 bg-white/5">
                      <Icon className={`w-5 h-5 ${meta.color} flex-shrink-0`} />
                      <Editable as="span" className="font-bold text-white text-sm" path={`about.mission.stats.${i}.label`} />
                    </motion.div>
                  );
                })}
              </div>
            </FadeUp>

            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <FadeUp key={m.year} delay={i * 0.12}>
                  <motion.div whileHover={{ x: 6 }} className="flex gap-5 cursor-default">
                    <div className="flex flex-col items-center">
                      <Editable as="div" className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/25 flex-shrink-0" path={`about.milestones.${i}.year`} />
                      {i < milestones.length - 1 && <div className="w-px h-full bg-gradient-to-b from-primary/30 to-transparent mt-2" />}
                    </div>
                    <div className="pb-6">
                      <Editable as="h3" className="font-bold text-white text-lg mb-1" path={`about.milestones.${i}.title`} />
                      <Editable as="p" className="text-white/55 text-sm leading-relaxed" path={`about.milestones.${i}.desc`} multiline />
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-[#0a1330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.awardsSection.title" />
            <Editable as="p" className="text-white/55 text-lg mt-3" path="about.awardsSection.subtitle" multiline />
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awardsSection.awards.map((a, i) => (
              <FadeUp key={a.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.10)" }}
                  className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:border-blue-400/30 transition-all text-center">
                  <div className="flex gap-0.5 justify-center mb-3">
                    {Array(5).fill(0).map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <Editable as="h3" className="font-black text-2xl text-white mb-1" path={`about.awardsSection.awards.${i}.name`} />
                  <Editable as="p" className="text-blue-400 text-xs font-bold mb-3" path={`about.awardsSection.awards.${i}.year`} />
                  <Editable as="p" className="text-white/55 text-sm leading-relaxed" path={`about.awardsSection.awards.${i}.detail`} multiline />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.teamSection.title" />
            <Editable as="p" className="text-white/55 text-lg mt-3" path="about.teamSection.subtitle" multiline />
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamSection.members.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6 }} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400/30 transition-all text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <Editable as="span" className="text-white font-extrabold text-lg" path={`about.teamSection.members.${i}.initials`} />
                  </div>
                  <Editable as="h3" className="font-bold text-white text-base mb-0.5" path={`about.teamSection.members.${i}.name`} />
                  <Editable as="p" className="text-blue-400 text-xs font-semibold mb-3" path={`about.teamSection.members.${i}.role`} />
                  <Editable as="p" className="text-white/55 text-xs leading-relaxed" path={`about.teamSection.members.${i}.bio`} multiline />
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0a1330]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl font-extrabold text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.valuesSection.title" />
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuesSection.values.map((v, i) => {
              const meta = valueMeta[i % valueMeta.length];
              const Icon = meta.icon;
              return (
                <FadeUp key={v.title} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -5 }} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-400/30 transition-all">
                    <div className={`w-12 h-12 rounded-2xl ${meta.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Editable as="h3" className="font-bold text-white text-base mb-2" path={`about.valuesSection.values.${i}.title`} />
                    <Editable as="p" className="text-white/55 text-sm leading-relaxed" path={`about.valuesSection.values.${i}.desc`} multiline />
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060d2b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <Editable as="h2" className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="about.cta.title" />
            <Editable as="p" className="text-white/60 text-lg mb-8 max-w-xl mx-auto" path="about.cta.subtitle" multiline />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cta.primary.href}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
                  <Editable as="span" path="about.cta.primary.label" /> <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href={cta.secondary.href}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/30 text-white font-bold px-10 py-4 rounded-full hover:border-white transition-colors inline-flex items-center gap-2">
                  <Editable as="span" path="about.cta.secondary.label" />
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

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
