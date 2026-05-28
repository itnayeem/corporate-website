import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import logoPath from "@assets/noviatify-logo.png";

interface GenericPageProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: { label: string; href: string };
}

export default function GenericPage({
  title,
  subtitle,
  description = "This section is coming soon. In the meantime, start your business formation with Noviatify today.",
  cta = { label: "Start Now — It's Free", href: "/start" },
}: GenericPageProps) {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-0 right-1/3 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            {subtitle && <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">{subtitle}</span>}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>{title}</h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-8">{description}</p>
            <Link href={cta.href}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="bg-primary text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2 group">
                {cta.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-gray-400 text-lg">More content for this page is on the way.</p>
            <div className="mt-10 flex justify-center gap-4 flex-wrap">
              <Link href="/" className="text-primary font-semibold hover:underline">Back to Home</Link>
              <Link href="/services" className="text-primary font-semibold hover:underline">View All Services</Link>
              <Link href="/how-it-works" className="text-primary font-semibold hover:underline">How It Works</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#040918] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" /></Link>
          <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
