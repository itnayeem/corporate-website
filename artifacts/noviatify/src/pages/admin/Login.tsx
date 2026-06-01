import { useState, type FormEvent } from "react";
import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { useAdminLogin } from "@workspace/api-client-react";
import { setAdminToken } from "@/lib/adminAuth";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAdminLogin();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    login.mutate(
      { data: { password } },
      {
        onSuccess: (res) => {
          setAdminToken(res.token);
          navigate("/");
        },
        onError: () => setError("Incorrect password. Please try again."),
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#060d2b] flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-10 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mb-5">
            <Lock className="w-5 h-5 text-blue-400" />
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Admin Access</h1>
          <p className="text-white/50 text-sm mb-6">
            Sign in, then click any text on your site to edit it in place.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary mb-3"
            />
            {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
            <motion.button
              type="submit"
              disabled={login.isPending || password.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-900/30 hover:bg-blue-600 transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {login.isPending ? "Signing in…" : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </div>
        <Link
          href="/"
          className="block text-center text-white/40 hover:text-white/70 text-sm mt-5 transition-colors"
        >
          ← Back to site
        </Link>
      </motion.div>
    </div>
  );
}
