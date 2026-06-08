import { motion } from "framer-motion";
import { Wrench } from "lucide-react";
import SiteLogo from "@/components/SiteLogo";
import { useContent } from "@/content/ContentContext";

const FALLBACK_TITLE = "We'll be right back";
const FALLBACK_MESSAGE =
  "Noviatify is currently undergoing scheduled maintenance. We'll be back online shortly. Thank you for your patience.";

export default function MaintenancePage() {
  const { maintenance } = useContent().site;
  const title = maintenance.title?.trim() || FALLBACK_TITLE;
  const message = maintenance.message?.trim() || FALLBACK_MESSAGE;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060d2b] text-white flex items-center justify-center px-6">
      {/* Ambient glows to match the site's dark animated theme */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-[120px]"
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-24 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-[140px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <div className="mb-10 flex justify-center">
          <SiteLogo className="h-10 w-auto" />
        </div>

        <motion.div
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5"
          animate={{ rotate: [0, -12, 12, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Wrench className="h-9 w-9 text-blue-400" />
        </motion.div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/60">
          {message}
        </p>

        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>
    </div>
  );
}
