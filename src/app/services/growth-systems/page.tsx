"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function GrowthSystemsPage() {
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
                <TrendingUp className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                Growth <br />
                <span className="text-gradient-3d">Systems.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Traffic is useless if it doesn't convert. We build data-driven systems that turn strangers into visitors, visitors into leads, and leads into loyal customers.
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
              <TrendingUp className="w-32 h-32 text-primary/20" />
            </motion.div>
          </div>
        </section>

        <section className="glass-card py-24 border-y border-border/30 relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Conversion-First Strategy</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Most businesses have a "leaky bucket" problem. We stop the leaks and optimize every touchpoint of your user journey for maximum ROI.
                </p>
                <div className="space-y-4">
                  {[
                    "Landing Page Optimization (LPO)",
                    "Data-Driven User Journey Mapping",
                    "Lead Capture & CRM Automation",
                    "High-Intent Traffic Acquisition"
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
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">Outcome Oriented</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    We don't focus on "likes" or "impressions." We focus on metrics that actually impact your bottom line — revenue, lead quality, and customer acquisition cost (CAC).
                  </p>
                </div>
                <div className="p-8 rounded-3xl glass-card">
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">Strategic Execution</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    With over 5 years in the Indian digital ecosystem, we understand the local consumer behavior and how to craft messaging that triggers action.
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
                Ready to deploy your <br />
                <span className="text-gradient-3d">Growth Systems?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stop guessing and start growing with a system designed for predictable results.
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
