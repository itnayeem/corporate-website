import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import logoPath from "@assets/noviatify-logo.png";
import { useContent } from "@/content/ContentContext";
import { Editable } from "@/components/admin/Editable";
import { EditableLink } from "@/components/admin/EditableLink";

export default function Navbar() {
  const content = useContent();
  const nav = content.site.nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBase = scrolled
    ? "bg-[#060d2b]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10"
    : "bg-transparent";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src={logoPath} alt={nav ? "Noviatify" : "Noviatify"} className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              <Editable as="span" path="site.nav.home" />
            </Link>
            <Link href="/how-it-works" className="text-white/80 hover:text-white transition-colors">
              <Editable as="span" path="site.nav.howItWorks" />
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                <Editable as="span" path="site.nav.services" />
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#0a1330] rounded-2xl shadow-2xl border border-white/10 py-2 overflow-hidden"
                  >
                    {nav.serviceLinks.map((s, i) => (
                      <motion.div
                        key={s.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <EditableLink
                          path={`site.nav.serviceLinks.${i}.href`}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          <Editable as="span" path={`site.nav.serviceLinks.${i}.label`} />
                        </EditableLink>
                      </motion.div>
                    ))}
                    <div className="border-t border-white/10 mt-1 pt-1">
                      <EditableLink path="site.nav.viewAllServicesHref" className="flex items-center gap-2 px-4 py-2.5 text-sm text-blue-400 font-semibold hover:bg-white/5 transition-colors">
                        <Editable as="span" path="site.nav.viewAllServices" />
                      </EditableLink>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* About dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
                <Editable as="span" path="site.nav.about" />
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-[#0a1330] rounded-2xl shadow-2xl border border-white/10 py-2 overflow-hidden"
                  >
                    {nav.aboutLinks.map((a, i) => (
                      <motion.div key={a.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                        <EditableLink path={`site.nav.aboutLinks.${i}.href`} className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/75 hover:bg-white/5 hover:text-white transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                          <Editable as="span" path={`site.nav.aboutLinks.${i}.label`} />
                        </EditableLink>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <EditableLink path="site.nav.loginHref" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              <Editable as="span" path="site.nav.login" />
            </EditableLink>
            <EditableLink path="site.nav.startHref">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition-colors"
              >
                <Editable as="span" path="site.nav.startCta" />
              </motion.button>
            </EditableLink>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#060d2b] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {nav.mobileLinks.map((item, i) => (
                <EditableLink key={item.href} path={`site.nav.mobileLinks.${i}.href`} block className="block px-3 py-2.5 rounded-xl text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors">
                  <Editable as="span" path={`site.nav.mobileLinks.${i}.label`} />
                </EditableLink>
              ))}
              <div className="pt-3 flex gap-2 border-t border-white/10 mt-2">
                <EditableLink path="site.nav.loginHref" block className="flex-1 text-center py-2.5 border border-white/15 rounded-full text-sm font-medium text-white/80 hover:bg-white/5">
                  <Editable as="span" path="site.nav.login" />
                </EditableLink>
                <EditableLink path="site.nav.startHref" block className="flex-1 text-center py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-blue-600">
                  <Editable as="span" path="site.nav.startCta" />
                </EditableLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
