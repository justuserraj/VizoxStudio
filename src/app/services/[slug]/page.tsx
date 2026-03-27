"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import React from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GlowBorder, Card3D } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SERVICES_DATA, PORTFOLIO_ITEMS } from "@/lib/data";
import { Paintbrush, Code2, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });

const ICONS: Record<string, any> = {
  "brand-foundation": Paintbrush,
  "digital-infrastructure": Code2,
  "growth-systems": TrendingUp,
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-32 pb-24 text-center">
          <h1 className="text-4xl text-white">Service not found</h1>
          <Button asChild className="mt-8">
            <Link href="/services">Back to Services</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const Icon = ICONS[service.slug] || Code2;

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
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 animate-pulse-glow">
                <Icon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {service.fullDescription}
              </p>
              <GlowBorder className="rounded-[14px] inline-block">
                <Button size="lg" className="h-14 px-10 text-lg glow-primary rounded-[14px]" asChild>
                  <Link href="/contact">Let's Talk</Link>
                </Button>
              </GlowBorder>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-[32px] overflow-hidden aspect-video glass-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-32 h-32 text-primary/20" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="glass-card py-24 border-y border-border/30 relative z-10">
          <div className="container px-6 max-w-7xl">
            <div className="max-w-3xl mb-16">
              <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Process
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Our Approach</h2>
              <p className="text-lg text-muted-foreground">
                We follow a rigorous and transparent process to ensure every project meets our high standards of excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.process.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card3D intensity={6}>
                    <div className="p-8 rounded-[24px] glass-card flex gap-4 h-full">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg mb-2">{step}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Detailed execution focusing on quality and alignment with your business goals.
                        </p>
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {service.slug === "brand-foundation" && (
          <section className="py-24 border-b border-border/30 relative z-10">
            <div className="container px-6 max-w-7xl text-center">
              <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase mb-6 inline-block">
                Visual Authority
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Our Branding Work</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
                A selection of visual identities and logomarks we've crafted for ambitious brands.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
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
                      alt={`Brand Logo ${num}`}
                      fill
                      className="object-contain p-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:drop-shadow-[0_0_25px_rgba(124,77,255,0.4)] transition-all duration-500"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="container px-6 max-w-5xl py-24 text-center relative z-10">
          <div className="p-12 md:p-20 rounded-[40px] glass-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-6xl font-serif font-bold text-white">
                Ready to start your <br />
                <span className="text-gradient-3d">{service.title}</span> journey?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Let's discuss your vision and see how we can bring it to life with our expert team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <GlowBorder className="rounded-[14px]">
                  <Button size="lg" className="h-14 px-10 text-lg glow-primary rounded-[14px]" asChild>
                    <Link href="/contact">Let's Talk</Link>
                  </Button>
                </GlowBorder>
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-primary/30 hover:bg-primary/10 rounded-[14px]" asChild>
                  <Link href="/services">Explore Other Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
