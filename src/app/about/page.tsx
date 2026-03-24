import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen">
        <div className="container px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="order-2 lg:order-1 relative rounded-[24px] overflow-hidden aspect-[4/5] shadow-2xl border border-border bg-surface">
              <div className="absolute inset-0 bg-primary/5 z-10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20">
                  <span className="font-serif text-3xl font-bold text-primary">V.</span>
                </div>
                <h3 className="text-white font-serif text-2xl font-bold mb-3">Team photo coming soon</h3>
                <p className="text-muted-foreground text-base max-w-[280px]">We're currently busy building high-performance systems for our clients.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <span className="px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-[#A78BFF] text-sm font-medium tracking-wide uppercase">
                About Vizox Studio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                We craft digital <span className="text-gradient">experiences.</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Vizox Studio was founded on a simple principle: to build products that are as functionally brilliant as they are visually stunning. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed transition-colors">
                We partner with forward-thinking brands and ambitious startups to turn complex problems into elegant solutions through strategy, design, and engineering.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border">
                <div>
                  <h4 className="text-4xl font-serif font-bold text-white mb-2">5+</h4>
                  <p className="text-muted-foreground">Projects Delivered</p>
                </div>
                <div>
                  <h4 className="text-4xl font-serif font-bold text-white mb-2">4+</h4>
                  <p className="text-muted-foreground">Years Experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Founder Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center py-20 border-t border-border/50">
            <div className="lg:col-span-4 flex justify-center lg:justify-start">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[32px] overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image 
                  src="/images/PIC [Founder].png" 
                  alt="Founder of Vizox Studio"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
            <div className="lg:col-span-8 space-y-6">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Meet the Founder</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                "We build digital systems that turn businesses into <span className="text-gradient">scalable brands.</span>"
              </h2>
              <p className="text-xl text-muted-foreground italic leading-relaxed">
                "I started Vizox Studio after years of seeing businesses struggle with digital tools that felt cold and complicated. My vision was to create a studio that blends high-end engineering with soulful design — making the internet a more beautiful and functional place, one project at a time."
              </p>
              <div>
                <p className="text-white font-serif text-2xl font-bold">Pratik Raj</p>
                <p className="text-primary font-medium tracking-wide">Founder</p>
              </div>
            </div>
          </div>
          
          <div className="bg-surface rounded-[24px] p-10 md:p-16 text-center shadow-lg border border-border mt-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Ready to work with us?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Let's create something meaningful together that your audience will love.
            </p>
            <Button size="lg" className="h-14 px-10 text-lg shadow-[0_0_20px_rgba(124,77,255,0.4)]" asChild>
              <Link href="/contact">Let's Talk</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
