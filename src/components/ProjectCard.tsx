"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, ChevronLeft, ChevronRight, BookOpen, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  React.useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === project.caseStudy.screenshots.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? project.caseStudy.screenshots.length - 1 : prev - 1));
  };

  return (
    <>
      <div 
        className="group cursor-pointer block"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative overflow-hidden rounded-[16px] mb-6 aspect-square shadow-lg border border-border/50 bg-surface">
          {/* Information Overlay */}
          <div className="absolute inset-0 bg-primary/80 backdrop-blur-md z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 text-center">
            <motion.h3 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              className="text-white font-serif text-3xl font-bold tracking-wide mb-3"
            >
              {project.title}
            </motion.h3>
            <p className="text-white/90 text-sm mb-8 leading-relaxed max-w-[280px]">
              {project.context}
            </p>
            
            <button 
              className="inline-flex items-center justify-center rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-white text-primary hover:bg-white/90 h-12 px-8 shadow-xl hover:scale-105 active:scale-95"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              View Business Case
            </button>
          </div>

          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-w-768px) 100vw, (max-w-1200px) 50vw, 33vw"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-[#A78BFF] text-xs font-bold uppercase tracking-[0.2em] mb-3">{project.category}</p>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.context}</p>
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
            />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl lg:h-[650px] h-auto overflow-hidden rounded-[32px] bg-surface border border-border shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-8 right-8 z-50 p-2.5 rounded-full bg-background/50 border border-border text-white hover:bg-primary hover:border-primary transition-all duration-300"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                {/* Gallery Section */}
                <div className="relative bg-black aspect-video lg:aspect-auto h-[350px] lg:h-full group/gallery">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-full h-full"
                      >
                        <Image
                          src={project.caseStudy.screenshots[currentSlide]}
                          alt={`${project.title} business showcase ${currentSlide + 1}`}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {project.caseStudy.screenshots.length > 1 && (
                    <>
                      <button 
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-xl transition-all opacity-0 group-hover/gallery:opacity-100"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white backdrop-blur-xl transition-all opacity-0 group-hover/gallery:opacity-100"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1">
                        {project.caseStudy.screenshots.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                            aria-label={`Go to image ${i + 1}`}
                            className="p-3 group"
                          >
                            <div className={`h-1.5 rounded-full transition-all duration-500 ${i === currentSlide ? 'w-8 bg-primary' : 'w-1.5 bg-white/20 group-hover:bg-white/40'}`} />
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-10 lg:p-16 flex flex-col justify-center overflow-y-auto max-h-[500px] lg:max-h-full">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="h-px w-8 bg-primary" />
                      <span className="text-[#A78BFF] font-bold uppercase tracking-[0.2em] text-xs">{project.category}</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">{project.title}</h2>
                    <p className="text-muted-foreground text-lg italic">{project.context}</p>
                  </div>

                  <div className="space-y-10">
                    <section>
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Business Overview</h3>
                      <p className="text-white/80 leading-relaxed">
                        {project.caseStudy.businessOverview}
                      </p>
                    </section>

                    <section>
                      <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">The Problem</h3>
                      <p className="text-white/80 leading-relaxed">
                        {project.caseStudy.problem}
                      </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <section>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-4">Strategic Action</h3>
                        <ul className="space-y-2">
                          {project.caseStudy.whatWeDid.map((item, i) => (
                            <li key={i} className="flex items-center text-sm text-white/90">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section>
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-3">Business Outcome</h3>
                        <p className="text-sm text-primary/90 font-medium leading-relaxed">
                          {project.caseStudy.outcome}
                        </p>
                      </section>
                    </div>

                    <div className="pt-10 border-t border-border mt-6">
                      <Button
                        size="lg"
                        className="w-full h-14 rounded-xl text-base font-bold group bg-primary hover:bg-primary/90 shadow-2xl transition-all"
                        asChild
                        onClick={() => setIsModalOpen(false)}
                      >
                        <Link href={`/case-study/${project.slug}`}>
                          <BookOpen className="mr-3 w-5 h-5" />
                          Read Full Strategic Case Study
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
