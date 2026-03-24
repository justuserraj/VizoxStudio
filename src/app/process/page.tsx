"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function ProcessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen">
        <section className="py-24 md:py-32 bg-background relative z-10">
          <div className="container px-6 max-w-7xl">
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
              className="mb-16 md:mb-24 text-center"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">How We Work</h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
                Our proven methodology for building digital systems that scale your business.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative mt-20">
              {[
                { 
                  step: "01", 
                  title: "Discovery", 
                  desc: "We dive deep into your business model, target audience, and market landscape to identify untapped growth opportunities. This phase is about gathering high-signal data to ensure our solution aligns perfectly with your business goals.",
                  needs: "Business goals, target audience personas, and current pain points.",
                  receives: "Comprehensive Audit Report and Project Roadmap."
                },
                { 
                  step: "02", 
                  title: "Strategy", 
                  desc: "We translate data into a strategic blueprint, defining the visual identity, user journey, and technical architecture. Every decision is data-driven, focused on establishing authority and maximizing conversion rates.",
                  needs: "Brand values, preferred aesthetics, and technical constraints.",
                  receives: "Strategic Design System and Technical Specification."
                },
                { 
                  step: "03", 
                  title: "Execution", 
                  desc: "Our engineering team builds your digital system using high-performance technologies like Next.js. We focus on speed, security, and scalability, ensuring a flawless experience across all devices.",
                  needs: "Content assets (copy, images) and timely feedback on milestones.",
                  receives: "Fully Functional, Optimized Digital System."
                },
                { 
                  step: "04", 
                  title: "Growth", 
                  desc: "We deploy the system and monitor performance metrics to ensure it delivers predictable results. We provide ongoing support and optimization to help your business scale and dominate its market.",
                  needs: "Access to analytics data and performance feedback.",
                  receives: "Performance Analytics Report and Scaling Strategy."
                }
              ].map((process, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative z-10 flex flex-col p-8 rounded-[32px] bg-surface border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                    <span className="text-xl font-serif font-bold text-primary">{process.step}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">{process.title}</h3>
                  <p className="text-muted-foreground text-base mb-8 leading-relaxed">{process.desc}</p>
                  
                  <div className="mt-auto space-y-4 pt-6 border-t border-border/50">
                    <div>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2">What you bring</p>
                      <p className="text-white/80 text-sm leading-relaxed">{process.needs}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-2">What you receive</p>
                      <p className="text-white/80 text-sm leading-relaxed">{process.receives}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-32 text-center rounded-[24px] bg-secondary p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to start?</h2>
                <Button size="lg" className="h-14 px-10 text-lg shadow-[0_0_20px_rgba(124,77,255,0.4)]" asChild>
                  <Link href="/contact">Talk to Us</Link>
                </Button>
              </div>
            </div>
            
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
