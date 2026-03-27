import { notFound } from "next/navigation";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Target, Award, Briefcase } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO_ITEMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_ITEMS.find((p) => p.slug === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — Business Case Study | Vizox Studio`,
    description: project.context,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO_ITEMS.find((p) => p.slug === slug);

  if (!project) notFound();

  const { fullCaseStudy } = project;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-24 min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <div className="container px-6 max-w-5xl mx-auto relative z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-primary font-bold text-sm uppercase tracking-widest hover:text-white transition-colors mb-16 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies
          </Link>

          <header className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-primary" />
              <span className="text-primary font-bold uppercase tracking-[0.3em] text-xs">
                {project.category}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl italic">
              &ldquo;{project.context}&rdquo;
            </p>
          </header>

          <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden mb-24 glass-card">
            <Image
              src={project.image}
              alt={project.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4 space-y-12">
              <div className="p-8 rounded-[24px] glass-card sticky top-32">
                <h3 className="text-white font-bold mb-8 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Execution Summary
                </h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Primary Objective</p>
                    <p className="text-white text-sm font-medium leading-relaxed">{project.caseStudy.businessOverview}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-2">Core Services Applied</p>
                    <div className="flex flex-wrap gap-2">
                      {project.caseStudy.whatWeDid.map((work) => (
                        <span key={work} className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 text-[10px] uppercase font-bold">
                          {work}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-24">
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-white">The Business Challenge</h2>
                </div>
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>{fullCaseStudy.fullOverview}</p>
                  <p className="p-8 glass-card border-l-4 border-primary rounded-r-2xl italic text-white/90">
                    {fullCaseStudy.problemStatement}
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-white">Strategic Implementation</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {fullCaseStudy.solutionDelivered.map((solution, idx) => (
                    <div key={idx} className="group p-8 glass-card rounded-[24px] hover:border-primary/50 transition-all duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-primary font-mono text-sm font-bold">0{idx + 1}</span>
                        <h4 className="text-white font-bold text-xl">{solution.title}</h4>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{solution.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-serif font-bold text-white mb-10">Operational Evidence</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.caseStudy.screenshots.map((img, idx) => (
                    <div key={idx} className="relative aspect-[16/10] rounded-[24px] overflow-hidden glass-card group">
                      <Image
                        src={img}
                        fill
                        alt={`${project.title} operational view ${idx + 1}`}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                        <p className="text-white text-xs font-medium uppercase tracking-widest">Interface Implementation {idx + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="p-12 rounded-[32px] bg-primary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] -mr-32 -mt-32" />
                <h2 className="text-3xl font-serif font-bold mb-6 relative z-10">Strategic Impact</h2>
                <p className="text-xl leading-relaxed font-medium relative z-10 opacity-90">
                  {fullCaseStudy.businessImpact}
                </p>
              </section>

              <div className="pt-12 text-center">
                <Button size="lg" className="h-16 px-12 text-lg font-bold rounded-2xl glow-primary group shadow-2xl transition-all hover:scale-105" asChild>
                  <Link href="/contact">
                    Work With Us To Scale Your Business
                    <ArrowLeft className="ml-3 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
