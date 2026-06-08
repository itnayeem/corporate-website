import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import SiteLogo from "@/components/SiteLogo";
import AuthorizeNetSeal from "@/components/AuthorizeNetSeal";
import { useContent } from "@/content/ContentContext";
import { Editable } from "@/components/admin/Editable";
import { EditableLink } from "@/components/admin/EditableLink";

interface LegalPageProps {
  pageKey: string;
}

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalPageData {
  subtitle: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
  contactHeading: string;
  contactBody: string;
  contactCtaLabel: string;
  contactCtaHref: string;
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const fallback: LegalPageData = {
  subtitle: "Legal",
  title: "Legal",
  lastUpdated: "",
  intro: "",
  sections: [],
  contactHeading: "Contact Us",
  contactBody: "Questions? Get in touch with our team.",
  contactCtaLabel: "Contact Support",
  contactCtaHref: "/about/contact",
};

export default function LegalPage({ pageKey }: LegalPageProps) {
  const content = useContent();
  const pages = content.site.legalPages as Record<string, LegalPageData>;
  const page = pages[pageKey] ?? fallback;
  const footer = content.site.footer;
  const base = `site.legalPages.${pageKey}`;

  return (
    <div className="min-h-screen bg-[#060d2b] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Editable as="span" className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4" path={`${base}.subtitle`} />
            <Editable as="h1" className="text-4xl sm:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: "'Inter Tight', sans-serif" }} path={`${base}.title`} />
            <Editable as="p" className="text-white/40 text-sm mb-6" path={`${base}.lastUpdated`} />
            <Editable as="p" className="text-white/65 text-lg leading-relaxed" multiline path={`${base}.intro`} />
          </motion.div>
        </div>
      </section>

      {/* Legal body */}
      <section className="pb-20 bg-[#060d2b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {page.sections.map((section, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <article className="border-l-2 border-white/10 pl-6">
                  <Editable as="h2" className="text-xl sm:text-2xl font-bold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }} path={`${base}.sections.${i}.heading`} />
                  <Editable as="p" className="text-white/55 text-base leading-relaxed" multiline path={`${base}.sections.${i}.body`} />
                </article>
              </FadeUp>
            ))}
          </div>

          {/* Contact card */}
          <FadeUp delay={0.1} className="mt-16">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 text-center">
              <Editable as="h2" className="text-2xl font-extrabold text-white mb-3" style={{ fontFamily: "'Inter Tight', sans-serif" }} path={`${base}.contactHeading`} />
              <Editable as="p" className="text-white/55 text-base leading-relaxed max-w-xl mx-auto mb-6" multiline path={`${base}.contactBody`} />
              <EditableLink path={`${base}.contactCtaHref`}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group"
                >
                  <Editable as="span" path={`${base}.contactCtaLabel`} />
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </EditableLink>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040918] text-white py-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><SiteLogo className="h-7 w-auto opacity-80" /></Link>
          <Editable as="p" className="text-white/30 text-sm" path="site.footer.copyright" />
          <div className="flex gap-5 text-sm text-white/40">
            {footer.links.map((l, i) => (
              <EditableLink key={l.href} path={`site.footer.links.${i}.href`} className="hover:text-white transition-colors"><Editable as="span" path={`site.footer.links.${i}.label`} /></EditableLink>
            ))}
          </div>
          <AuthorizeNetSeal />
        </div>
      </footer>
    </div>
  );
}
