import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Plus, Trash2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteLogo from "@/components/SiteLogo";
import AuthorizeNetSeal from "@/components/AuthorizeNetSeal";
import { useContent } from "@/content/ContentContext";
import { useEditMode } from "@/content/EditModeContext";
import { Editable } from "@/components/admin/Editable";
import { EditableLink } from "@/components/admin/EditableLink";

interface Pkg {
  name: string;
  price: string;
  period: string;
  description: string;
  badge: string;
  highlighted: boolean;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

const newPackage: Pkg = {
  name: "New Package",
  price: "$0",
  period: "/ year",
  description: "Describe what this package includes.",
  badge: "",
  highlighted: false,
  features: ["Feature one", "Feature two", "Feature three"],
  ctaLabel: "Get Started",
  ctaHref: "https://start.noviatify.io",
};

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

export default function Pricing() {
  const content = useContent();
  const { editMode, getValue, updateValue } = useEditMode();
  // Re-key the cards on structural change so uncontrolled Editable fields re-read
  // the draft after a package is added or removed (indices shift otherwise).
  const [structVer, setStructVer] = useState(0);

  const packages = (getValue("pricing.packages") as Pkg[]) ?? content.pricing.packages;

  const addPackage = () => {
    updateValue("pricing.packages", (cur) => [
      ...((cur as Pkg[]) ?? []),
      structuredClone(newPackage),
    ]);
    setStructVer((v) => v + 1);
  };

  const removePackage = (i: number) => {
    updateValue("pricing.packages", (cur) =>
      ((cur as Pkg[]) ?? []).filter((_, j) => j !== i),
    );
    setStructVer((v) => v + 1);
  };

  const addFeature = (i: number) => {
    updateValue(`pricing.packages.${i}.features`, (cur) => [
      ...((cur as string[]) ?? []),
      "New feature",
    ]);
    setStructVer((v) => v + 1);
  };

  const removeFeature = (i: number, fi: number) => {
    updateValue(`pricing.packages.${i}.features`, (cur) =>
      ((cur as string[]) ?? []).filter((_, j) => j !== fi),
    );
    setStructVer((v) => v + 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#060d2b] text-slate-900 dark:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-white dark:bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white dark:from-[#060d2b] dark:via-[#0c1648] dark:to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-500/20 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Editable as="span" className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4" path="pricing.hero.eyebrow" />
            <Editable as="h1" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="pricing.hero.title" />
            <Editable as="p" className="text-slate-600 dark:text-white/60 text-lg max-w-2xl mx-auto leading-relaxed" path="pricing.hero.subtitle" multiline />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" className="fill-white dark:fill-[#060d2b]" />
          </svg>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-white dark:bg-[#060d2b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <Editable as="h2" className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="pricing.packagesSection.title" />
            <Editable as="p" className="text-slate-600 dark:text-white/55 text-lg mt-3 max-w-2xl mx-auto" path="pricing.packagesSection.subtitle" multiline />
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg, i) => (
              <FadeUp key={`pkg-${i}-${structVer}`} delay={i * 0.08} className="h-full">
                <div
                  className={`relative h-full flex flex-col rounded-3xl p-7 transition-all duration-300 ${
                    pkg.highlighted
                      ? "bg-gradient-to-b from-primary/20 to-white dark:to-white/[0.04] border-2 border-primary shadow-2xl shadow-blue-900/30 lg:-translate-y-2"
                      : "bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 hover:border-blue-300/40"
                  }`}
                >
                  {editMode && (
                    <button
                      type="button"
                      onClick={() => removePackage(i)}
                      title="Remove package"
                      aria-label="Remove package"
                      className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  {(editMode || pkg.badge) && (
                    <Editable as="span" className="self-start bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wide" path={`pricing.packages.${i}.badge`} />
                  )}

                  <Editable as="h3" className="text-2xl font-black text-slate-900 dark:text-white mb-2" path={`pricing.packages.${i}.name`} />
                  <div className="flex items-end gap-1 mb-3">
                    <Editable as="span" className="text-4xl font-extrabold text-slate-900 dark:text-white" path={`pricing.packages.${i}.price`} />
                    <Editable as="span" className="text-slate-500 dark:text-white/50 text-sm font-medium mb-1.5" path={`pricing.packages.${i}.period`} />
                  </div>
                  <Editable as="p" className="text-slate-600 dark:text-white/55 text-sm leading-relaxed mb-5" path={`pricing.packages.${i}.description`} multiline />

                  <Editable as="p" className="text-xs text-slate-500 dark:text-white/40 font-semibold mb-3 uppercase tracking-wider" path="pricing.packagesSection.includesLabel" />
                  <ul className="space-y-2.5 mb-7 flex-1">
                    {pkg.features.map((f, fi) => (
                      <li key={`${fi}-${structVer}`} className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/80">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <Editable as="span" className="flex-1" path={`pricing.packages.${i}.features.${fi}`} />
                        {editMode && (
                          <button
                            type="button"
                            onClick={() => removeFeature(i, fi)}
                            title="Remove feature"
                            aria-label="Remove feature"
                            className="flex-shrink-0 mt-0.5 text-red-400/70 hover:text-red-400 transition-colors"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </li>
                    ))}
                    {editMode && (
                      <li>
                        <button
                          type="button"
                          onClick={() => addFeature(i)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-blue-400 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add feature
                        </button>
                      </li>
                    )}
                  </ul>

                  <EditableLink path={`pricing.packages.${i}.ctaHref`} block>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors ${
                        pkg.highlighted
                          ? "bg-primary text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                          : "border border-primary/40 text-primary hover:bg-primary hover:text-white"
                      }`}
                    >
                      <Editable as="span" path={`pricing.packages.${i}.ctaLabel`} />
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </EditableLink>
                </div>
              </FadeUp>
            ))}

            {editMode && (
              <button
                type="button"
                onClick={addPackage}
                className="h-full min-h-[320px] flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-white/20 text-white/55 hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="w-8 h-8" />
                <span className="text-sm font-semibold">Add package</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <Editable as="h2" className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }} path="pricing.cta.title" />
            <Editable as="p" className="text-blue-100 text-lg mb-8 max-w-xl mx-auto" path="pricing.cta.subtitle" multiline />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <EditableLink path="pricing.cta.primary.href">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary font-extrabold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  <Editable as="span" path="pricing.cta.primary.label" /> <ArrowRight className="w-4 h-4" />
                </motion.button>
              </EditableLink>
              <EditableLink path="pricing.cta.secondary.href">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/40 text-white font-bold px-10 py-4 rounded-full hover:border-white transition-colors inline-flex items-center gap-2">
                  <Editable as="span" path="pricing.cta.secondary.label" />
                </motion.button>
              </EditableLink>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-[#040918] text-slate-900 dark:text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><SiteLogo className="h-7 w-auto opacity-80" /></Link>
          <Editable as="p" className="text-slate-500 dark:text-white/30 text-sm" path="site.footer.copyright" />
          <div className="flex gap-5 text-sm text-slate-500 dark:text-white/40">
            {content.site.footer.links.map((link, i) => (
              <EditableLink key={link.href} path={`site.footer.links.${i}.href`} className="hover:text-slate-900 dark:hover:text-white transition-colors"><Editable as="span" path={`site.footer.links.${i}.label`} /></EditableLink>
            ))}
          </div>
          <AuthorizeNetSeal />
        </div>
      </footer>
    </div>
  );
}
