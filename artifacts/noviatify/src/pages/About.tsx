import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Award, Users, Globe, Zap, Shield, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
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

const team = [
  { name: "Alex Morgan", role: "Chief Executive Officer", initials: "AM", bio: "Serial entrepreneur with 3 successful exits. Founded Noviatify in 2020 with the mission of making business formation accessible to everyone." },
  { name: "Jessica Lee", role: "Head of Legal Operations", initials: "JL", bio: "Former corporate attorney with 10+ years experience in business law. Ensures every filing is accurate and compliant." },
  { name: "David Kim", role: "Chief Technology Officer", initials: "DK", bio: "Built the Noviatify platform from the ground up. Former engineer at two Fortune 500 companies." },
  { name: "Sofia Martinez", role: "Head of Customer Success", initials: "SM", bio: "Passionate about helping founders succeed. Leads a team of experts dedicated to world-class customer support." },
];

const awards = [
  { name: "Forbes", year: "2022", detail: "Featured in Forbes as one of the most innovative legal tech startups" },
  { name: "Entrepreneur 360", year: "2022", detail: "Recognized as a Best Company by Entrepreneur 360" },
  { name: "Going From Broke", year: "2021", detail: "Featured on Going From Broke for helping underserved entrepreneurs" },
  { name: "Stevie Awards", year: "2023", detail: "Winner of the Stevie Award for Customer Service Excellence" },
];

const milestones = [
  { year: "2020", title: "Founded", desc: "Noviatify launched with a mission to eliminate friction from business formation." },
  { year: "2021", title: "500 Businesses", desc: "Reached our first 500 businesses formed and expanded to all 50 states." },
  { year: "2022", title: "Award Recognition", desc: "Featured in Forbes, Entrepreneur 360, and Going From Broke for our impact." },
  { year: "2023", title: "1,000+ Businesses", desc: "Crossed 1,000 businesses served and launched our compliance suite." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#060d2b] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <span className="text-blue-400 text-sm font-bold uppercase tracking-widest block mb-4">About Noviatify</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
              Your business partner.
            </h1>
            <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
              Noviatify was founded in 2020 with a single mission: make starting and running a business as simple as possible for every entrepreneur, regardless of experience or background.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C360 0 720 0 1080 30C1260 45 1350 55 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <FadeUp>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: "'Inter Tight', sans-serif" }}>
                Our mission: remove every barrier to entrepreneurship
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                Starting a business should be exciting — not buried in paperwork, state bureaucracy, and legal confusion. Noviatify was built to eliminate every friction point so entrepreneurs can focus on what matters: building great companies.
              </p>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                We handle the filings, the deadlines, the registered agents, and the compliance — so you never have to think about it. From day one to year ten, we're your partner.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { icon: Globe, label: "All 50 States", color: "text-blue-500 bg-blue-50" },
                  { icon: Users, label: "1,000+ Businesses", color: "text-purple-500 bg-purple-50" },
                  { icon: Award, label: "Award Winning", color: "text-yellow-500 bg-yellow-50" },
                  { icon: Zap, label: "Since 2020", color: "text-green-500 bg-green-50" },
                ].map((item, i) => (
                  <motion.div key={item.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-3 rounded-2xl p-4 ${item.color.split(" ")[1]}`}>
                    <item.icon className={`w-5 h-5 ${item.color.split(" ")[0]} flex-shrink-0`} />
                    <span className="font-bold text-gray-900 text-sm">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </FadeUp>

            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <FadeUp key={m.year} delay={i * 0.12}>
                  <motion.div whileHover={{ x: 6 }} className="flex gap-5 cursor-default">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xs shadow-lg shadow-blue-500/25 flex-shrink-0">
                        {m.year}
                      </div>
                      {i < milestones.length - 1 && <div className="w-px h-full bg-gradient-to-b from-primary/30 to-transparent mt-2" />}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Recognition & Awards</h2>
            <p className="text-gray-500 text-lg mt-3">We're proud to be recognized by industry leaders for our service and impact.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {awards.map((a, i) => (
              <FadeUp key={a.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(37,117,252,0.10)" }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:border-blue-100 transition-all text-center">
                  <div className="flex gap-0.5 justify-center mb-3">
                    {Array(5).fill(0).map((_, si) => <Star key={si} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <h3 className="font-black text-2xl text-gray-900 mb-1">{a.name}</h3>
                  <p className="text-primary text-xs font-bold mb-3">{a.year}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{a.detail}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>The Team Behind Noviatify</h2>
            <p className="text-gray-500 text-lg mt-3">Experienced entrepreneurs, lawyers, and engineers working for your success.</p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/25">
                    <span className="text-white font-extrabold text-lg">{member.initials}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-0.5">{member.name}</h3>
                  <p className="text-primary text-xs font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="text-3xl font-extrabold text-gray-900" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Our Values</h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Transparency", desc: "No hidden fees. No confusing fine print. You always know what you're getting and what it costs.", color: "text-blue-500 bg-blue-50" },
              { icon: Zap, title: "Speed", desc: "We know time is your most valuable asset. We move as fast as the state allows — often faster.", color: "text-yellow-500 bg-yellow-50" },
              { icon: Users, title: "Accessibility", desc: "Business formation shouldn't be only for the wealthy. Noviatify is built for everyone, everywhere.", color: "text-green-500 bg-green-50" },
              { icon: Award, title: "Excellence", desc: "We're recognized by Forbes, Entrepreneur 360, and our customers for doing things right, every time.", color: "text-purple-500 bg-purple-50" },
              { icon: Globe, title: "Reach", desc: "All 50 states. International structures. We go where you need to go.", color: "text-cyan-500 bg-cyan-50" },
              { icon: Star, title: "Customer First", desc: "Our 99% satisfaction rate isn't an accident. We obsess over making every interaction exceptional.", color: "text-orange-500 bg-orange-50" },
            ].map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.08}>
                <motion.div whileHover={{ y: -5 }} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                  <div className={`w-12 h-12 rounded-2xl ${v.color} flex items-center justify-center mb-4`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#060d2b] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#060d2b] via-[#0c1648] to-[#060d2b]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="text-4xl font-extrabold text-white mb-5" style={{ fontFamily: "'Inter Tight', sans-serif" }}>Ready to start your journey?</h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">Join 1,000+ entrepreneurs who trusted Noviatify to form their business quickly and correctly.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/start">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="bg-primary text-white font-bold px-10 py-4 rounded-full shadow-xl shadow-blue-900/40 hover:bg-blue-600 transition-colors inline-flex items-center gap-2">
                  Start Now — It's Free <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/about/contact">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className="border-2 border-white/30 text-white font-bold px-10 py-4 rounded-full hover:border-white transition-colors inline-flex items-center gap-2">
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="bg-[#040918] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/"><img src={logoPath} alt="Noviatify" className="h-7 w-auto opacity-80" /></Link>
          <p className="text-white/30 text-sm">© 2023. Noviatify All Rights Reserved.</p>
          <div className="flex gap-5 text-sm text-white/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/about/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
