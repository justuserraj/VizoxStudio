"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Paintbrush, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function BrandFoundationPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        <Suspense fallback={null}>
          <PageScene />
        </Suspense>

        <section className="container px-6 max-w-7xl mb-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden" animate="visible" variants={fadeIn}
              className="space-y-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 animate-pulse-glow">
                <Paintbrush className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                Brand <br />
                <span className="text-gradient-3d">Foundation.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Most businesses fail to convert because they lack visual authority. With over 5 years of experience in the Indian market, we build brand systems that establish trust instantly and position you as a market leader.
              </p>
              <GlowBorder className="rounded-[14px] inline-block">
                <Button size="lg" className="h-14 px-10 text-lg glow-primary rounded-[14px]" asChild>
                  <Link href="/contact">Get a Free Growth Audit</Link>
                </Button>
              </GlowBorder>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[32px] overflow-hidden aspect-video glass-card flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <Paintbrush className="w-32 h-32 text-primary/20" />
            </motion.div>
          </div>
        </section>

        <section className="glass-card py-24 border-y border-border/30 relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Strategic Visual Authority</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  In the Indian business landscape, trust is the primary currency. A weak visual foundation isn't just a design problem — it's a growth bottleneck.
                </p>
                <div className="space-y-4">
                  {[
                    "Psychological Color Mapping for the Local Market",
                    "Typography that Communicates Scale & Reliability",
                    "Cohesive Brand Architecture across all Channels",
                    "Visual Trust Signals Optimized for Conversions"
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 text-white"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-lg">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 rounded-3xl glass-card">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">Why it matters?</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Your brand foundation is the "Silent Salesman." It works 24/7 to convince potential clients that you are professional, dependable, and superior to competitors before they even read a single word of your copy.
                  </p>
                </div>
                <div className="p-8 rounded-3xl glass-card">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">Experience Highlights</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We've spent half a decade helping Indian startups and established businesses shed their "freelancer look" and adopt a "global corporate identity" that wins high-ticket clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container px-6 max-w-5xl py-24 text-center relative z-10">
          <div className="p-12 md:p-20 rounded-[40px] glass-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">
                Ready to build your <br />
                <span className="text-gradient-3d">Brand Foundation?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stop losing customers to competitors with better branding. Let's build a foundation that scales.
              </p>
              <GlowBorder className="rounded-[14px] inline-block">
                <Button size="lg" className="h-14 px-10 text-lg glow-primary rounded-[14px]" asChild>
                  <Link href="/contact">Let's Talk</Link>
                </Button>
              </GlowBorder>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
