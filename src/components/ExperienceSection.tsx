"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextScramble from "./TextScramble";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Tellis Technologies",
    role: "Software Development Intern",
    date: "2025",
    location: "Remote",
    badge: "Agentic AI & Docker",
    badgeColor: "border-accent/30 text-accent bg-accent/5",
    bullets: [
      "Built agentic AI pipelines using LangChain and LangGraph, integrating LLM-driven orchestration into production MERN applications alongside the engineering team.",
      "Built a production-grade multi-agent system (Autonomous SWE Agent) that autonomously localizes bugs, writes patches, and iterates on real GitHub issues, benchmarked end-to-end against SWE-bench-lite.",
      "Designed a LangGraph self-verification loop (Planner → Editor → Test Runner → Verifier) applying patches inside an isolated Docker sandbox, running the real test suite, and routing failures back to the Editor with error traces for iterative retries.",
      "Implemented AST-level semantic retrieval using tree-sitter to extract full functions/classes (not naive text chunks), embedded via ChromaDB with Gemini embeddings for accurate issue-to-code matching."
    ]
  },
  {
    company: "Elite Coders",
    role: "Full Stack Development Intern",
    date: "2025",
    location: "Greater Noida, UP",
    badge: "ERP Systems",
    badgeColor: "border-gold/30 text-gold bg-gold/5",
    bullets: [
      "Developed core modules of a School ERP system (student records, attendance, fee management) using the MERN stack for real institutional use.",
      "Optimized MongoDB schema design and indexing on high-traffic collections, improving query performance for the ERP's reporting workflows.",
      "Built and secured RESTful APIs with role-based access control (admin, teacher, student) for multi-tenant institutional access."
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray<HTMLElement>(".exp-item");
    
    items.forEach((item) => {
      gsap.fromTo(item, 
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate timeline vertical line drawing
    gsap.fromTo(".timeline-line",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="experience" ref={containerRef} className="w-full bg-[#070708] text-white py-32 px-6 md:px-20 z-[20] relative overflow-hidden">
      {/* Decorative ambient background orb */}
      <div className="absolute top-[30%] right-[-10%] w-[35rem] h-[35rem] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        <div className="mb-20 text-left">
          <p className="font-tech text-accent uppercase tracking-[0.3em] text-xs md:text-sm mb-3">04 // PROFESSIONAL HISTORY</p>
          <h2 className="text-5xl md:text-7xl font-tech font-bold uppercase tracking-tight">
            <TextScramble text="Experience" />
          </h2>
          <div className="w-20 h-1 bg-accent mt-4 rounded-full" />
        </div>

        {/* Timeline container */}
        <div className="relative pl-8 md:pl-16">
          {/* Vertical line connection */}
          <div className="timeline-line absolute left-0.5 md:left-[9px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-accent via-cyan to-gold origin-top" />

          <div className="flex flex-col gap-16 md:gap-24">
            {experiences.map((exp, i) => (
              <div key={i} className="exp-item relative flex flex-col md:flex-row gap-6 md:gap-12 group">
                
                {/* Timeline node dot */}
                <div className="absolute -left-[39.5px] md:-left-[71.5px] top-2.5 w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#070708] border-2 border-white/20 group-hover:border-accent transition-colors duration-300 flex items-center justify-center z-10 shadow-[0_0_10px_rgba(7,7,8,1)]">
                  {i === 0 && (
                    <div className="absolute inset-0 rounded-full border border-accent animate-ping opacity-75"></div>
                  )}
                  <div className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-300 ${i === 0 ? "bg-accent" : "bg-white/20 group-hover:bg-accent"}`} />
                </div>

                {/* Left Side: Metadata */}
                <div className="w-full md:w-1/3 shrink-0">
                  <div className={`inline-block font-tech text-[10px] md:text-xs font-semibold uppercase px-3 py-1 rounded-full border ${exp.badgeColor} mb-3 tracking-wider`}>
                    {exp.badge}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-tech font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors duration-300">
                    {exp.company}
                  </h3>
                  <p className="text-lg md:text-xl font-tech font-semibold mt-1 text-white/80">{exp.role}</p>
                  <p className="font-tech text-xs md:text-sm text-white/40 mt-1 uppercase tracking-wider">{exp.date}</p>
                  <p className="font-tech text-xs md:text-sm text-white/40 uppercase tracking-wider">{exp.location}</p>
                </div>
                
                {/* Right Side: Description Card */}
                <div className="w-full md:w-2/3 glass-card p-6 md:p-8 rounded-2xl flex flex-col gap-4">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="font-tech text-accent/80 font-bold text-sm mt-1">✓</span>
                      <p className="text-sm md:text-base font-light text-white/70 leading-relaxed font-sans">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
