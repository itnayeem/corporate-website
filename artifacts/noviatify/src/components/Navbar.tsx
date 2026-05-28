import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import logoPath from "@assets/noviatify-logo.png";

const serviceLinks = [
  { label: "Get a Registered Agent", href: "/services/registered-agent" },
  { label: "Submit an Annual Report", href: "/services/annual-report" },
  { label: "Foreign Qualification", href: "/services/foreign-qualification" },
  { label: "Get a Certificate of Good Standing", href: "/services/good-standing" },
  { label: "Change Of Registered Agent", href: "/services/change-agent" },
  { label: "Company Name Change", href: "/services/name-change" },
  { label: "File for an S Corporation", href: "/services/s-corporation" },
];

const aboutLinks = [
  { label: "About Noviatify", href: "/about" },
  { label: "Noviatify Partnerships", href: "/about/partnerships" },
  { label: "Read the Blog", href: "/about/blog" },
  { label: "Contact Us", href: "/about/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [location] = useLocation();

  const isDark = location === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navBase = isDark && !scrolled
    ? "bg-transparent text-white"
    : "bg-white/95 backdrop-blur-md text-gray-900 shadow-sm border-b border-gray-100";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <img src={logoPath} alt="Noviatify" className="h-8 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            <Link href="/" className={`transition-colors hover:text-primary ${location === "/" && !isDark || location !== "/" ? "text-gray-700" : "text-white/90 hover:text-white"}`}>
              Home
            </Link>
            <Link href="/how-it-works" className={`transition-colors hover:text-primary ${isDark && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"}`}>
              How It Works
            </Link>

            {/* Services dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`flex items-center gap-1 transition-colors hover:text-primary ${isDark && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"}`}>
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden"
                  >
                    {serviceLinks.map((s, i) => (
                      <motion.div
                        key={s.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          href={s.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                          {s.label}
                        </Link>
                      </motion.div>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link href="/services" className="flex items-center gap-2 px-4 py-2.5 text-sm text-primary font-semibold hover:bg-blue-50 transition-colors">
                        View All Services →
                      </Link>
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
              <button className={`flex items-center gap-1 transition-colors hover:text-primary ${isDark && !scrolled ? "text-white/90 hover:text-white" : "text-gray-700"}`}>
                About Us
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 overflow-hidden"
                  >
                    {aboutLinks.map((a, i) => (
                      <motion.div key={a.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                        <Link href={a.href} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0" />
                          {a.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className={`text-sm font-medium transition-colors hover:text-primary ${isDark && !scrolled ? "text-white/80" : "text-gray-600"}`}>
              Login
            </Link>
            <Link href="/start">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-colors"
              >
                Start Now
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${isDark && !scrolled ? "text-white hover:bg-white/10" : "text-gray-700 hover:bg-gray-100"}`}
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
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {[
                { label: "Home", href: "/" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Services", href: "/services" },
                { label: "About Us", href: "/about" },
                { label: "Pricing", href: "/pricing" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 flex gap-2 border-t border-gray-100 mt-2">
                <Link href="/login" className="flex-1 text-center py-2.5 border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Login
                </Link>
                <Link href="/start" className="flex-1 text-center py-2.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-blue-700">
                  Start Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
