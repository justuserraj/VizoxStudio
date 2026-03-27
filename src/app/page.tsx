"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Paintbrush, Code2, TrendingUp, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Card3D, GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/ProjectCard").then((mod) => mod.ProjectCard), { ssr: false });

const GROWTH_SYSTEM = [
  {
    slug: "brand-foundation",
    title: "Brand Foundation",
    description: "Build trust and credibility instantly with visual systems that establish authority.",
    icon: Paintbrush,
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    description: "Present your business professionally with high-performance digital systems.",
    icon: Code2,
  },
  {
    slug: "growth-systems",
    title: "Growth Systems",
    description: "Turn visitors into paying customers with conversion-first strategies.",
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
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

export default function Home() {
  const featuredPortfolio = PORTFOLIO_ITEMS.slice(0, 5);
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);
  const [expertiseIndex, setExpertiseIndex] = React.useState(0);
  const [workIndex, setWorkIndex] = React.useState(0);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    startTimer();
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 gradient-bg opacity-40 z-0" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 z-0 bg-center" />

          <div className="container px-6 max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="space-y-8">
              <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground font-medium tracking-wide">Premium Digital Agency</span>
              </motion.div>

              <motion.h1
                variants={fadeIn}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight"
              >
                Stop Losing Customers Because of{" "}
                <br className="hidden md:block" />
                <span className="text-gradient-3d">Bad Branding and Weak Websites</span>
              </motion.h1>

              <motion.p
                variants={fadeIn}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                We help businesses transform their digital presence into a system that consistently attracts and converts customers.
              </motion.p>

              <motion.p
                variants={fadeIn}
                className="text-base text-primary/80 max-w-2xl mx-auto leading-relaxed font-medium"
              >
                Vizox Studio builds digital systems that turn businesses into scalable brands
              </motion.p>

              <motion.div variants={fadeIn} className="pt-8 flex items-center justify-center gap-4 flex-wrap">
                <GlowBorder className="rounded-[14px]">
                  <Button size="lg" className="text-base h-14 px-8 rounded-[14px] glow-primary" asChild>
                    <Link href="/contact">Get a Free Growth Audit</Link>
                  </Button>
                </GlowBorder>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base h-14 px-8 border-primary/40 text-white hover:bg-primary/20 hover:text-white transition-all duration-300 group min-w-[160px] rounded-[14px]"
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

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
              <div className="w-1.5 h-2.5 rounded-full bg-primary animate-pulse" />
            </div>
          </motion.div>
        </section>

        {/* Stats Bar */}
        <section className="py-16 bg-background/50 backdrop-blur-sm border-y border-border/30 relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: "Projects Delivered", value: "5+" },
                { label: "Industries Served", value: "3" },
                { label: "Client Retention", value: "100%" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  <span className="text-4xl md:text-5xl font-serif font-bold text-gradient-3d">{stat.value}</span>
                  <span className="text-muted-foreground uppercase tracking-widest text-xs font-bold">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Hidden Problem Section */}
        <section className="py-24 relative z-10 border-b border-border/30 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
          <div className="container px-6 max-w-4xl text-center relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6">
                The Problem
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                Why Many Businesses Lose{" "}
                <br className="hidden md:block" />
                Customers Online
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                Many businesses lose potential customers online without realizing it. Weak branding, outdated websites, and poor digital positioning quietly push people away before they ever contact you.
              </p>
              <div className="inline-block px-8 py-4 rounded-2xl glass-card animate-border-glow">
                <p className="text-white font-serif text-xl md:text-2xl font-bold tracking-wide">
                  Most businesses don't have a traffic problem.{" "}
                  <br className="hidden md:block" />
                  <span className="text-primary text-xl md:text-2xl">They have a conversion problem.</span>
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Vizox Growth System */}
        <section className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
          <Suspense fallback={null}>
            <PageScene />
          </Suspense>

          <div className="container px-6 max-w-7xl relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="mb-16 md:mb-24 text-center"
            >
              <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6">
                Our Approach
              </span>
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
                <motion.div key={idx} variants={fadeIn}>
                  <Card3D intensity={10}>
                    <Link href={`/services/${service.slug}`} className="block h-full group">
                      <div className="h-full glass-card rounded-[24px] overflow-hidden p-8 flex flex-col min-h-[320px] transition-all duration-500 group-hover:border-primary/40">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 border border-primary/20">
                            <service.icon className="w-7 h-7 text-primary" />
                          </div>
                          <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 mt-3" />
                        </div>

                        <h3 className="text-xl font-serif font-bold text-white mb-4">{service.title}</h3>
                        <p className="text-muted-foreground text-base mb-6">{service.description}</p>

                        <div className="mt-auto flex items-center text-primary text-sm font-bold uppercase tracking-widest gap-2">
                          View Details
                          <span className="w-4 h-px bg-primary/50" />
                        </div>
                      </div>
                    </Link>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-4">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
                  onClick={() => handleManualAction(() => setExpertiseIndex((expertiseIndex - 1 + GROWTH_SYSTEM.length) % GROWTH_SYSTEM.length))}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
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
                    <div className="h-full glass-card rounded-[24px] overflow-hidden p-10 flex flex-col min-h-[350px]">
                      <div className="flex justify-between items-start mb-8">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
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
        <section className="py-24 md:py-32 relative z-10 border-b border-border/30">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5" />

          <div className="container px-6 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <span className="inline-block px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6">
                  Case Studies
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Strategic Business Cases</h2>
                <p className="text-muted-foreground text-lg max-w-xl leading-relaxed">
                  Explore how we help real businesses solve digital friction and establish a dominant market presence.
                </p>
              </motion.div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
                <GlowBorder className="rounded-full">
                  <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-primary/40 text-primary hover:bg-primary hover:text-white transition-all font-bold" asChild>
                    <Link href="/portfolio">View All Business Cases</Link>
                  </Button>
                </GlowBorder>
              </motion.div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredPortfolio.map((project, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeIn}
                >
                  <Suspense fallback={<div className="aspect-square rounded-[16px] glass-card animate-pulse" />}>
                    <ProjectCard project={project} />
                  </Suspense>
                </motion.div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-2">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
                  onClick={() => handleManualAction(() => setWorkIndex((workIndex - 1 + featuredPortfolio.length) % featuredPortfolio.length))}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
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
                  <Suspense fallback={<div className="aspect-square rounded-[16px] glass-card animate-pulse" />}>
                    <ProjectCard project={featuredPortfolio[workIndex]} />
                  </Suspense>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-1 mt-10">
                {featuredPortfolio.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleManualAction(() => setWorkIndex(idx))}
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

            {/* Visual Authority Section */}
            <div className="mt-32 pt-16 border-t border-border/30">
              <div className="text-center mb-16">
                <span className="px-5 py-2 rounded-full glass text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6 inline-block">
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
                    className="relative w-full aspect-square rounded-[24px] glass-card group grayscale hover:grayscale-0 transition-all duration-500 hover:scale-[1.02] flex items-center justify-center overflow-hidden"
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
                <GlowBorder className="rounded-full inline-block">
                  <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-primary/30 hover:bg-primary hover:text-white transition-all font-bold" asChild>
                    <Link href="/services/brand-foundation">Explore Our Brand Strategy</Link>
                  </Button>
                </GlowBorder>
              </div>
            </div>
          </div>
        </section>

        {/* Client Stories (Testimonials) */}
        <section className="py-24 md:py-32 bg-background relative z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="container px-6 max-w-7xl relative z-10">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="mb-16 md:mb-24 text-center"
            >
              <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Client Stories</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Hear from the businesses we've helped transform through strategy and design.
              </p>
            </motion.div>

            {/* Desktop Grid */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
              className="hidden md:grid md:grid-cols-3 gap-8"
            >
              {TESTIMONIALS.map((t, idx) => (
                <motion.div key={idx} variants={fadeIn}>
                  <Card3D intensity={8}>
                    <div className="p-8 rounded-[24px] glass-card h-full flex flex-col justify-between transition-all duration-500">
                      <div className="space-y-6">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-muted-foreground italic leading-relaxed text-lg">
                          &ldquo;{t.review}&rdquo;
                        </p>
                      </div>
                      <div className="pt-8 mt-8 border-t border-border/30">
                        <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{t.business}</p>
                        <div>
                          <p className="text-white font-serif text-lg font-bold">{t.name}</p>
                          <p className="text-primary text-sm font-medium">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative px-4">
              <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
                  onClick={() => handleManualAction(() => setTestimonialIndex((testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length))}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </Button>
              </div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                <Button
                  variant="ghost" size="icon" className="w-10 h-10 rounded-full glass"
                  onClick={() => handleManualAction(() => setTestimonialIndex((testimonialIndex + 1) % TESTIMONIALS.length))}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </Button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -10000) {
                      handleManualAction(() => setTestimonialIndex((testimonialIndex + 1) % TESTIMONIALS.length));
                    } else if (swipe > 10000) {
                      handleManualAction(() => setTestimonialIndex((testimonialIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length));
                    }
                  }}
                  className="touch-pan-y"
                >
                  <div className="p-8 rounded-[24px] glass-card flex flex-col min-h-[350px]">
                    <div className="space-y-6">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <svg key={s} className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground italic leading-relaxed text-lg">
                        &ldquo;{TESTIMONIALS[testimonialIndex].review}&rdquo;
                      </p>
                    </div>
                    <div className="pt-8 mt-8 border-t border-border/30">
                      <p className="text-sm font-bold text-primary uppercase tracking-wider mb-2">{TESTIMONIALS[testimonialIndex].business}</p>
                      <div>
                        <p className="text-white font-serif text-lg font-bold">{TESTIMONIALS[testimonialIndex].name}</p>
                        <p className="text-primary text-sm font-medium">{TESTIMONIALS[testimonialIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-center gap-1 mt-10">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleManualAction(() => setTestimonialIndex(idx))}
                    className="p-3 group"
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 group-hover:bg-primary/50",
                      testimonialIndex === idx ? "w-6 bg-primary" : "bg-border"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 bg-background relative z-10 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/15 rounded-full blur-[200px] pointer-events-none" />

          <div className="container px-6 max-w-4xl text-center relative z-10">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} className="space-y-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Ready to Strengthen Your{" "}
                <br className="hidden md:block" />
                <span className="text-gradient-3d">Digital Presence?</span>
              </h2>
              <p className="text-xl text-muted-foreground mx-auto max-w-2xl">
                Let's explore how your business can attract more customers and grow with the right digital systems.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                <GlowBorder className="rounded-[14px] w-full sm:w-auto">
                  <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto glow-primary rounded-[14px]" asChild>
                    <Link href="/contact">Talk to Us</Link>
                  </Button>
                </GlowBorder>
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary/40 w-full sm:w-auto hover:bg-primary/20 rounded-[14px]" asChild>
                  <Link href="/contact">Schedule a Call</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
