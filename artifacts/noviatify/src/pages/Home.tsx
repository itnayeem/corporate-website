import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  ChevronRight, 
  FileText, 
  Globe, 
  CheckCircle2,
  Menu,
  X,
  Star,
  ArrowRight,
  Shield,
  Zap,
  Award,
  Users,
  Briefcase
} from "lucide-react";
import logoPath from "@assets/noviatify-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src={logoPath} alt="Noviatify Logo" className="h-8 w-auto" />
          <span className="font-bold text-xl tracking-tight text-foreground">Noviatify</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
          <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          <Link href="#services" className="hover:text-primary transition-colors">Services</Link>
          <Link href="#about" className="hover:text-primary transition-colors">About Us</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" className="font-medium text-sm">Login</Button>
          <Button className="bg-primary hover:bg-accent text-white rounded-full px-6">Start Now</Button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link href="#how-it-works" className="text-gray-600 font-medium p-2">How It Works</Link>
              <Link href="#services" className="text-gray-600 font-medium p-2">Services</Link>
              <Link href="#about" className="text-gray-600 font-medium p-2">About Us</Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" className="w-full justify-center">Login</Button>
                <Button className="w-full justify-center bg-primary text-white">Start Now</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// ... Rest of the components will go here

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <Navbar />
      
      <main>
        {/* HERO */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white dark:from-slate-800 dark:via-background dark:to-background"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6 border border-blue-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Hi, Let's work together
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                  Quick, Cost-Free, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Award-Winning</span> <br />
                  Business Formation
                </h1>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
                  Since 2020, Join More Than 1000 Business Owners Using Noviatify to start and grow their companies with confidence.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button size="lg" className="w-full sm:w-auto text-base h-14 px-8 rounded-full bg-primary hover:bg-accent text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
                    Start Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600">
                          <Star className="h-4 w-4 fill-current" />
                        </div>
                      ))}
                    </div>
                    More reliable, confirmed reviews
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="relative lg:h-[600px] flex items-center justify-center"
              >
                <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-300 rounded-[2rem] rotate-6 opacity-20 blur-2xl animate-pulse"></div>
                  <div className="relative bg-white border border-gray-100 shadow-2xl rounded-[2rem] p-8 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-8">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-primary">
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider">
                        Approved
                      </div>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                      <div className="h-4 bg-gray-100 rounded-full w-5/6"></div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex -space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-white"><AvatarFallback className="bg-gray-100 text-xs">JD</AvatarFallback></Avatar>
                        <Avatar className="h-10 w-10 border-2 border-white"><AvatarFallback className="bg-gray-200 text-xs">AS</AvatarFallback></Avatar>
                        <Avatar className="h-10 w-10 border-2 border-white"><AvatarFallback className="bg-gray-300 text-xs">RW</AvatarFallback></Avatar>
                      </div>
                      <div className="text-sm font-bold text-gray-900">+1k Founders</div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3"
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Status</p>
                      <p className="text-sm font-bold text-gray-900">Entity Formed</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS & PROOF */}
        <section className="py-12 border-y border-gray-100 bg-gray-50/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-md text-center md:text-left"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  More than <span className="text-primary">900+</span> businesses
                </h3>
                <p className="text-gray-600 font-medium">believe in our services and think they will be the greatest in the world.</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center gap-8"
              >
                <div className="text-center">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Featured in</p>
                  <div className="flex items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                    <span className="text-xl font-black font-serif tracking-tighter">Forbes</span>
                    <span className="text-lg font-bold tracking-tight">Entrepreneur <span className="text-primary">360</span></span>
                    <span className="text-lg font-bold uppercase italic">Going From Broke</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ENTITY TYPES */}
        <section id="entities" className="py-24 bg-white relative">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              >
                Choose the perfect structure for your vision
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-600 text-lg"
              >
                Not sure which one? We make it simple to understand and effortless to form.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "LLC",
                  icon: Building2,
                  desc: "Flexible ownership and personal liability protection. Perfect for most small businesses.",
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  title: "C Corporation",
                  icon: Briefcase,
                  desc: "Ideal for raising investment capital and issuing shares. The standard for startups.",
                  color: "bg-indigo-50 text-indigo-600"
                },
                {
                  title: "LTD",
                  icon: Globe,
                  desc: "Built for international business structures and cross-border operations.",
                  color: "bg-cyan-50 text-cyan-600"
                }
              ].map((entity, i) => (
                <motion.div
                  key={entity.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full border-gray-100 shadow-lg shadow-gray-200/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <CardHeader>
                      <div className={`w-14 h-14 rounded-2xl ${entity.color} flex items-center justify-center mb-4`}>
                        <entity.icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="text-2xl">{entity.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-6">{entity.desc}</p>
                      <Button variant="outline" className="w-full group">
                        Form an {entity.title}
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 bg-[#080c2d] text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Form your company in 3 simple steps</h2>
              <p className="text-blue-200 text-lg">We've removed the paperwork, the confusion, and the wait times.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-blue-900/50"></div>
              
              {[
                { num: "01", title: "Choose Your Entity Type", desc: "Select LLC, C Corp, or LTD based on your business goals." },
                { num: "02", title: "Complete Simple Form", desc: "Fill out our streamlined online application in under 5 minutes." },
                { num: "03", title: "We Handle Everything", desc: "Fast, worry-free filing with the state. You just relax." }
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative z-10 text-center"
                >
                  <div className="w-24 h-24 mx-auto bg-primary rounded-full flex items-center justify-center text-3xl font-black mb-6 shadow-[0_0_40px_rgba(37,117,252,0.4)] border-4 border-[#080c2d]">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-blue-200 leading-relaxed max-w-sm mx-auto">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                >
                  Comprehensive compliance services
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-600 text-lg"
                >
                  Everything you need to keep your business in good standing, all in one place.
                </motion.p>
              </div>
              <Button variant="outline" className="hidden md:inline-flex">View all services</Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[
                "Get a Registered Agent",
                "Submit an Annual Report",
                "Foreign Qualification",
                "Get a Certificate of Good Standing",
                "Change Of Registered Agent",
                "Company Name Change",
                "File for an S Corporation"
              ].map((service, i) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group cursor-pointer flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-800 group-hover:text-primary transition-colors">{service}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why ambitious founders choose Noviatify</h2>
                <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                  We built our platform from the ground up to eliminate the friction of starting a business. No hidden fees, no confusing legal jargon.
                </p>
                
                <div className="space-y-6">
                  {[
                    { title: "Award-winning service", icon: Award, color: "text-yellow-500", bg: "bg-yellow-50" },
                    { title: "Fast processing", icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
                    { title: "Expert support", icon: Shield, color: "text-green-500", bg: "bg-green-50" },
                    { title: "1,000+ businesses served", icon: Users, color: "text-purple-500", bg: "bg-purple-50" }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center shrink-0`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-tr from-gray-100 to-gray-50 rounded-[3rem] relative p-8 md:p-12 overflow-hidden border border-gray-100">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                  
                  <div className="relative h-full flex flex-col justify-center">
                    <div className="bg-white rounded-2xl shadow-xl p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-4">
                        {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-xl font-medium text-gray-900 italic mb-6">
                        "The absolute fastest way I've ever formed a company. The UI is gorgeous, the process is clear, and the support team actually answered my questions."
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary text-white font-bold">SM</AvatarFallback></Avatar>
                        <div>
                          <p className="font-bold text-gray-900">Sarah Mitchell</p>
                          <p className="text-sm text-gray-500">Founder, TechFlow LLC</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to make it official?</h2>
              <p className="text-xl text-blue-100 mb-10">Join 1,000+ businesses who started their journey with Noviatify. It takes less than 5 minutes.</p>
              
              <motion.div 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="inline-block"
              >
                <Button size="lg" className="h-16 px-10 rounded-full bg-white text-primary hover:bg-gray-50 text-lg font-bold shadow-2xl">
                  Start Your Business Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#080c2d] text-white pt-20 pb-10 border-t border-white/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">N</div>
                <span className="font-bold text-xl tracking-tight">Noviatify</span>
              </Link>
              <p className="text-blue-200/60 mb-6 max-w-sm">
                Quick, cost-free, award-winning business formation. We help entrepreneurs start and run their companies with confidence.
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Twitter', 'LinkedIn', 'YouTube', 'WhatsApp'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-4 h-4 bg-white/50 rounded-sm"></div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Entity Types</h4>
              <ul className="space-y-4">
                {['LLC', 'C Corporation', 'LTD'].map(link => (
                  <li key={link}><a href="#" className="text-blue-200/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {['Home', 'Check Order Status', 'Research Tool', 'Pricing', 'Read the Blog', 'About Us'].map(link => (
                  <li key={link}><a href="#" className="text-blue-200/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Support</h4>
              <ul className="space-y-4">
                {['Contact Us', 'Noviatify Partnerships', 'Privacy Policy', 'Terms Of Service'].map(link => (
                  <li key={link}><a href="#" className="text-blue-200/60 hover:text-white transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center md:text-left text-blue-200/40 text-sm flex flex-col md:flex-row justify-between items-center">
            <p>© 2023. Noviatify All Rights Reserved.</p>
            <p className="mt-4 md:mt-0">Award-winning service since 2020</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
