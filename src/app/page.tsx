"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Paintbrush, Code2, Smartphone, TrendingUp, ArrowRight, Phone, Cpu, Zap, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ProjectCard = dynamic(() => import("@/components/ProjectCard").then((mod) => mod.ProjectCard), {
  ssr: false,
  loading: () => <div className="aspect-square rounded-[16px] bg-surface animate-pulse" />,
});

const GROWTH_SYSTEM = [
  {
    slug: "brand-foundation",
    title: "Brand Foundation",
    description: "Build trust and credibility instantly",
    icon: Paintbrush,
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    description: "Present your business professionally online",
    icon: Code2,
  },
  {
    slug: "growth-systems",
    title: "Growth Systems",
    description: "Turn visitors into paying customers",
    icon: TrendingUp,
  },
];

const TESTIMONIALS = [
  {
    review: "Vizox Studio completely changed how we approach our digital presence. Their strategic foundation helped us double our conversion rate in 3 months.",
    business: "TechFlow Solutions",
    name: "Rajesh Kumar",
    role: "CEO",
  },
  {
    review: "The Brand Foundation work they did was a game-changer. We finally have a global-standard identity that our clients trust implicitly.",
    business: "Elevate Coffee Roasters",
    name: "Sanjay Singhania",
    role: "Founder",
  },
  {
    review: "Their Digital Infrastructure is world-class. Our site speed and performance metrics improved drastically, leading to a much better ROI.",
    business: "Nexus Logistics",
    name: "Priyanka Sharma",
    role: "Director",
  },
];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};


export default function Home() {
  const categories = [
    "Brand Identity",
    "Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "System Automation",
    "Motion & Interaction"
  ];
  
  // Limiting Featured Portfolio to top 5
  const featuredPortfolio = PORTFOLIO_ITEMS.slice(0, 5);

  const [testimonialIndex, setTestimonialIndex] = React.useState(0);
  const [expertiseIndex, setExpertiseIndex] = React.useState(0);
  const [workIndex, setWorkIndex] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startTimer = React.useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setExpertiseIndex((prev) => (prev + 1) % GROWTH_SYSTEM.length);
      setWorkIndex((prev) => (prev + 1) % featuredPortfolio.length);
    }, 5000);
  }, [featuredPortfolio.length]);

  React.useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleManualAction = (action: () => void) => {
    action();
    startTimer(); // Reset timer to "pause" auto-slide
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 gradient-bg opacity-40 z-0 animate-pulse-slow" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0 bg-center" />

          <div className="container px-6 max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight"
              >
                Stop Losing Customers Because of <br className="hidden md:block"/>
                <span className="text-gradient">Bad Branding and Weak Websites</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                We help businesses transform their digital presence into a system that consistently attracts and converts customers.
              </motion.p>
              
              <motion.p
                variants={fadeIn}
                className="text-base text-primary/80 max-w-2xl mx-auto leading-relaxed font-medium mt-[-10px]"
              >
                Vizox Studio builds digital systems that turn businesses into scalable brands
              </motion.p>

              <motion.div variants={fadeIn} className="pt-8 flex items-center justify-center gap-4 flex-wrap">
                <Button size="lg" className="text-base h-14 px-8" asChild>
                  <Link href="/contact">Get a Free Growth Audit</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base h-14 px-8 border-primary/40 text-white hover:bg-primary hover:text-white transition-all duration-300 group min-w-[160px]" 
                  asChild
                >
                  <Link href="/portfolio" className="flex items-center justify-center">
                    <span>View Our Work</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-background border-y border-border/50 relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: "Projects Delivered", value: "5+" },
                { label: "Industries Served", value: "3" },
                { label: "Client Retention", value: "100%" },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center text-center space-y-2">
                  <span className="text-4xl md:text-5xl font-serif font-bold text-white">{stat.value}</span>
                  <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Hidden Problem Section */}
        <section className="py-24 bg-surface relative z-10 border-b border-border/50">
          <div className="container px-6 max-w-4xl text-center">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Why Many Businesses Lose <br className="hidden md:block"/> Customers Online
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Many businesses lose potential customers online without realizing it. Weak branding, outdated websites, and poor digital positioning quietly push people away before they ever contact you.
              </p>
              <div className="inline-block px-6 py-3 rounded-xl border border-primary/30 bg-primary/10">
                <p className="text-white font-serif text-xl md:text-2xl font-bold tracking-wide">
                  Most businesses don't have a traffic problem. <br className="hidden md:block"/>
                  <span className="text-primary text-xl md:text-2xl">They have a conversion problem.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Vizox Growth System */}
        <section className="py-24 md:py-32 bg-background relative z-10">
          <div className="container px-6 max-w-7xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="mb-16 md:mb-24 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">The Vizox Growth System</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Comprehensive digital solutions tailored to elevate your brand and drive business growth.
              </p>
            </motion.div>

            {/* Desktop Grid */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="hidden md:grid md:grid-cols-3 gap-8"
            >
              {GROWTH_SYSTEM.map((service, idx) => (
                <motion.div key={idx} variants={fadeIn} className="h-full">
                  <Link href={`/services/${service.slug}`} className="block h-full group">
                    <div className="h-full border border-border/50 bg-surface/50 backdrop-blur-sm group-hover:border-primary/50 group-hover:bg-surface/80 transition-all duration-300 rounded-[24px] overflow-hidden p-8 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                          <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-3" />
                      </div>
                      
                      <h3 className="text-xl font-serif font-bold text-white mb-4">{service.title}</h3>
                      <p className="text-muted-foreground text-base mb-6">{service.description}</p>
                      
                      <div className="mt-auto flex items-center text-primary text-sm font-bold uppercase tracking-widest gap-2">
                        View Details
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-4">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20">
                <Button 
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border"
                  aria-label="Previous service"
                  onClick={() => handleManualAction(() => setExpertiseIndex((expertiseIndex - 1 + GROWTH_SYSTEM.length) % GROWTH_SYSTEM.length))}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <Button 
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border"
                  aria-label="Next service"
                  onClick={() => handleManualAction(() => setExpertiseIndex((expertiseIndex + 1) % GROWTH_SYSTEM.length))}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={expertiseIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -10000) {
                      handleManualAction(() => setExpertiseIndex((expertiseIndex + 1) % GROWTH_SYSTEM.length));
                    } else if (swipe > 10000) {
                      handleManualAction(() => setExpertiseIndex((expertiseIndex - 1 + GROWTH_SYSTEM.length) % GROWTH_SYSTEM.length));
                    }
                  }}
                  className="h-full touch-pan-y"
                >
                  <Link href={`/services/${GROWTH_SYSTEM[expertiseIndex].slug}`} className="block h-full group">
                    <div className="h-full border border-border/50 bg-surface/50 backdrop-blur-sm rounded-[24px] overflow-hidden p-10 flex flex-col min-h-[350px] shadow-2xl">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          {React.createElement(GROWTH_SYSTEM[expertiseIndex].icon, { className: "w-7 h-7 text-primary" })}
                        </div>
                        <ArrowRight className="w-6 h-6 text-primary mt-4" />
                      </div>
                      
                      <h3 className="text-2xl font-serif font-bold text-white mb-4">{GROWTH_SYSTEM[expertiseIndex].title}</h3>
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{GROWTH_SYSTEM[expertiseIndex].description}</p>
                      
                      <div className="mt-auto flex items-center text-primary text-sm font-bold uppercase tracking-widest gap-2">
                        View Details
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-1 mt-10">
                {GROWTH_SYSTEM.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleManualAction(() => setExpertiseIndex(idx))}
                    aria-label={`Go to service slide ${idx + 1}`}
                    className="p-3 group"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-primary/50",
                      expertiseIndex === idx ? "w-6 bg-primary" : "bg-border"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Case Studies Section */}
        <section className="py-24 md:py-32 bg-surface border-b border-border relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Strategic Business Cases</h2>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                  Explore how we help real businesses solve digital friction and establish a dominant market presence.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-primary/40 text-primary hover:bg-primary hover:text-white transition-all font-bold" asChild>
                  <Link href="/portfolio">View All Business Cases</Link>
                </Button>
              </motion.div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredPortfolio.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-2">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20">
                <Button 
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border"
                  aria-label="Previous project"
                  onClick={() => handleManualAction(() => setWorkIndex((workIndex - 1 + featuredPortfolio.length) % featuredPortfolio.length))}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <Button 
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-background/50 backdrop-blur-md border border-border"
                  aria-label="Next project"
                  onClick={() => handleManualAction(() => setWorkIndex((workIndex + 1) % featuredPortfolio.length))}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={workIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -10000) {
                      handleManualAction(() => setWorkIndex((workIndex + 1) % featuredPortfolio.length));
                    } else if (swipe > 10000) {
                      handleManualAction(() => setWorkIndex((workIndex - 1 + featuredPortfolio.length) % featuredPortfolio.length));
                    }
                  }}
                  className="touch-pan-y"
                >
                  <ProjectCard project={featuredPortfolio[workIndex]} />
                </motion.div>
              </AnimatePresence>
              
              <div className="flex justify-center gap-1 mt-10">
                {featuredPortfolio.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleManualAction(() => setWorkIndex(idx))}
                    aria-label={`Go to project slide ${idx + 1}`}
                    className="p-3 group"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-primary/50",
                      workIndex === idx ? "w-6 bg-primary" : "bg-border"
                    )} />
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Authority Work Nested Section */}
            <div className="mt-32 pt-16 border-t border-border/50">
              <div className="text-center mb-16">
                <span className="px-5 py-2 rounded-full border border-primary/30 bg-primary/10 text-[#A78BFF] text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block">
                  Visual Authority
                </span>
                <h3 className="text-2xl md:text-5xl font-serif font-bold text-white mb-6">Strategic Brand Identities</h3>
                <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
                  Establishing instant trust and credibility through high-end visual systems for established businesses.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <motion.div 
                    key={num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: num * 0.1 }}
                    className="relative w-full aspect-square rounded-[24px] bg-white/5 border border-white/10 group grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02] hover:bg-white/10 flex items-center justify-center overflow-hidden shadow-xl"
                  >
                    <Image 
                      src={`/images/Logo%20%5BBranding%5D/${num}.png`} 
                      alt={`Brand Strategy Case ${num}`}
                      fill
                      sizes="(max-w-640px) 150px, (max-w-1024px) 200px, 250px"
                      className="object-contain p-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_25px_rgba(124,77,255,0.4)] transition-all duration-500"
                    />
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 text-center">
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-primary/30 hover:bg-primary hover:text-white transition-all font-bold" asChild>
                  <Link href="/services/brand-foundation">Explore Our Brand Strategy</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Client Stories (Testimonials) */}
        <section className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
          <div className="container px-6 max-w-7xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="mb-16 md:mb-24 text-center"
            >
              <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-[#A78BFF] text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Client Stories</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from the businesses we've helped transform through strategy and design.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {TESTIMONIALS.map((t, idx) => (
                <motion.div key={idx} variants={fadeIn}>
                  <div className="p-8 rounded-[24px] border border-border/50 bg-surface/30 backdrop-blur-xl h-full flex flex-col justify-between hover:border-primary/30 transition-colors">
                    <div className="space-y-6">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground italic leading-relaxed text-lg">
                        "{t.review}"
                      </p>
                    </div>
                    <div className="pt-8 mt-8 border-t border-border/50">
                      <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t.business}</p>
                      <div>
                        <p className="text-white font-serif text-lg font-bold">{t.name}</p>
                        <p className="text-primary text-sm font-medium">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Removed process segment */}

        {/* CTA Section */}
        <section className="py-32 bg-background relative z-10 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="container px-6 max-w-4xl text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Ready to Strengthen Your <br className="hidden md:block"/>
                <span className="text-gradient">Digital Presence?</span>
              </h2>
              <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                Let's explore how your business can attract more customers and grow with the right digital systems.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto shadow-[0_0_30px_rgba(124,77,255,0.3)]" asChild>
                  <Link href="/contact">Talk to Us</Link>
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/40 w-full sm:w-auto hover:bg-white/5" asChild>
                  <Link href="/contact">Schedule a Call</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
