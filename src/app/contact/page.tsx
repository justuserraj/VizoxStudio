"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card3D, GlowBorder } from "@/components/ui/3d-card";
import { SmoothScroll } from "@/components/SmoothScroll";

const PageScene = dynamic(() => import("@/components/three/PageScene").then((mod) => mod.PageScene), { ssr: false });
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  service: z.string().min(1, { message: "Please select a service." }),
  budget: z.string().min(1, { message: "Please select a budget range." }),
  description: z.string().min(10, { message: "Project description must be at least 10 characters." }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      service: "",
      budget: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(values);
    setIsSubmitting(false);
    setIsSuccess(true);
    form.reset();
    setTimeout(() => setIsSuccess(false), 5000);
  }

  return (
    <SmoothScroll>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen relative overflow-hidden">
        <Suspense fallback={null}>
          <PageScene />
        </Suspense>

        <div className="container px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <span className="px-4 py-1.5 rounded-full glass text-primary text-sm font-medium tracking-wide uppercase inline-block mb-6">
                  Get in Touch
                </span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                  Let's build something{" "}
                  <span className="text-gradient-3d">extraordinary.</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Whether you're looking to rebrand, build a new web application, or launch a marketing campaign, we're here to help.
                </p>
              </div>

              <div className="space-y-6 pt-8 border-t border-border/30">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Email Us</h3>
                  <a href="mailto:contactvizox@gmail.com" className="text-xl text-white hover:text-primary transition-colors">
                    contactvizox@gmail.com
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Call Us</h3>
                  <a href="tel:+918271754978" className="text-xl text-white hover:text-primary transition-colors">
                    +91 8271754978
                  </a>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Follow Us</h3>
                  <a href="https://www.instagram.com/thevizox" target="_blank" rel="noopener noreferrer" className="text-xl text-white hover:text-primary transition-colors">
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card3D intensity={6}>
                <div className="glass-card rounded-[24px] p-8 md:p-10 relative overflow-hidden">
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-0 left-0 right-0 bg-primary/20 border-b border-primary/30 p-4 text-center text-primary font-medium z-10"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" className="glass rounded-[12px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" className="glass rounded-[12px]" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="service"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Service Required</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-12 w-full rounded-[12px] glass px-3 py-2 text-base ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow duration-300 md:text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                  {...field}
                                >
                                  <option value="" disabled>Select a service</option>
                                  <option value="brand-identity">Brand Identity</option>
                                  <option value="web-development">Web Development</option>
                                  <option value="mobile-app-development">Mobile App Development</option>
                                  <option value="digital-marketing">Digital Marketing</option>
                                  <option value="system-automation">System Automation</option>
                                  <option value="motion-interaction">Motion & Interaction</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Budget</FormLabel>
                              <FormControl>
                                <select
                                  className="flex h-12 w-full rounded-[12px] glass px-3 py-2 text-base ring-offset-background cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-shadow duration-300 md:text-sm text-foreground disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                                  {...field}
                                >
                                  <option value="" disabled>Select a range</option>
                                  <option value="25k-75k">₹25K – ₹75K / ~$300 – $900</option>
                                  <option value="75k-2l">₹75K – ₹2L / ~$900 – $2.5K</option>
                                  <option value="2l-5l">₹2L – ₹5L / ~$2.5K – $6K</option>
                                  <option value=">5l">₹5L+ / ~$6K+</option>
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project goals, timeline, and requirements..."
                                className="resize-y glass rounded-[12px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <GlowBorder className="rounded-[14px]">
                        <Button type="submit" size="lg" className="w-full h-14 text-lg glow-primary rounded-[14px]" disabled={isSubmitting}>
                          {isSubmitting ? "Sending..." : "Submit Project Inquiry"}
                        </Button>
                      </GlowBorder>
                    </form>
                  </Form>
                </div>
              </Card3D>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
