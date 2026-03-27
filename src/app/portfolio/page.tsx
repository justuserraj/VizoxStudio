"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PortfolioPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen relative overflow-hidden">
        <Suspense fallback={null}>
          <PageScene />
        </Suspense>

        <div className="container px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl mb-24 text-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Our Business Impact
              </span>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                Selected <span className="text-gradient-3d">Case Studies.</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A strategic deep dive into how we transform business identities and digital infrastructures for measurable growth.
              </p>
            </motion.div>
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 mb-32"
          >
            <AnimatePresence mode="popLayout">
              {PORTFOLIO_ITEMS.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center rounded-[40px] glass-card p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">Ready to improve your business's digital presence?</h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                We work with ambitious businesses to build high-performance systems that drive real growth.
              </p>
              <GlowBorder className="rounded-2xl inline-block">
                <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl glow-primary hover:scale-105 transition-all group" asChild>
                  <Link href="/contact">
                    Schedule Your Growth Audit
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </GlowBorder>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
