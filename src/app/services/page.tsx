"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card3D, GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Paintbrush, Code2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });

const ALL_SERVICES = [
  {
    slug: "brand-foundation",
    title: "Brand Foundation",
    description: "Establishing visual authority and trust signals that position your business as a market leader, converting visitors into clients.",
    icon: Paintbrush,
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    description: "Engineering high-performance, scalable online presences that serve as the rock-solid backbone of your digital growth.",
    icon: Code2,
  },
  {
    slug: "growth-systems",
    title: "Growth Systems",
    description: "Deploying data-driven, conversion-first strategies that turn traffic into predictable revenue and business results.",
    icon: TrendingUp,
  },
];

export default function ServicesPage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen relative overflow-hidden">
        <Suspense fallback={null}>
          <PageScene />
        </Suspense>

        <div className="container px-6 max-w-7xl relative z-10">
          <div className="max-w-3xl mb-20 text-center mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Our Services
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                Comprehensive solutions for{" "}
                <span className="text-gradient-3d">modern brands.</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We offer end-to-end digital services. From initial concept and branding to technical implementation and growth.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_SERVICES.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
              >
                <Card3D intensity={10}>
                  <Link href={`/services/${service.slug}`} className="block h-full cursor-pointer group">
                    <div className="h-full glass-card rounded-[24px] p-8 hover:border-primary/50 transition-all duration-500 min-h-[300px] flex flex-col">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all duration-300 border border-primary/20">
                        <service.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h2 className="text-2xl font-serif font-bold text-white mb-4">{service.title}</h2>
                      <p className="text-muted-foreground text-base leading-relaxed">{service.description}</p>
                      <div className="mt-auto pt-6">
                        <span className="text-primary text-sm font-bold uppercase tracking-widest">Learn More</span>
                      </div>
                    </div>
                  </Link>
                </Card3D>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <GlowBorder className="rounded-[14px] inline-block">
              <Button size="lg" className="h-14 px-10 text-lg glow-primary rounded-[14px]" asChild>
                <Link href="/contact">Require a custom solution?</Link>
              </Button>
            </GlowBorder>
          </motion.div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
