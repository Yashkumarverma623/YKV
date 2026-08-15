"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextScramble from "./TextScramble";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Stealth AI Startup",
    role: "AI Engineer Intern",
    date: "Feb 2026 – May 2026",
    location: "Remote",
    badge: "Multi-Agent RAG & Cost Routing",
    badgeColor: "border-accent/30 text-accent bg-accent/5",
    bullets: [
      "Owned a 0-to-1 multi-agent RAG pipeline in production, rebuilding retrieval with hybrid search and cross-encoder reranking; scaled to 50K+ daily queries at p99 <45ms and improved Ragas faithfulness from 0.72 to 0.91.",
      "Cut LLM costs by 60% with an intent classifier routing queries across GPT-4, GPT-3.5, and fine-tuned Llama-3.1-8B using QLoRA/vLLM; reduced per-query cost from $0.04 to $0.016 while maintaining output quality.",
      "Shipped production AI safety and observability with real-time PII scrubbing, prompt-injection defense, output moderation, and LangSmith tracing; blocked 99%+ adversarial inputs and lifted task completion 35% through A/B prompt testing."
    ]
  },
  {
    company: "Tellis Technologies",
    role: "Software Development Intern",
    date: "Sept 2025 – Jan 2026",
    location: "Remote",
    badge: "Autonomous SWE Agent & Sandbox",
    badgeColor: "border-cyan/30 text-cyan bg-cyan/5",
    bullets: [
      "Built agentic AI pipelines using LangChain/LangGraph and a production-grade Autonomous SWE Agent that localized bugs, wrote patches, and iterated on real GitHub issues, benchmarked against SWE-bench-lite.",
      "Designed a LangGraph self-verification loop (Planner → Editor → Test Runner → Verifier) applying patches inside an isolated Docker sandbox, running the real test suite, and routing failures back to the Editor for iterative retries.",
      "Implemented AST-level semantic retrieval using tree-sitter to extract full functions/classes instead of naive text chunks, embedding them with ChromaDB and Gemini embeddings for accurate issue-to-code matching."
    ]
  },
  {
    company: "Luminary",
    role: "Software Developer Intern",
    date: "Apr 2025 – Sept 2025",
    location: "Remote",
    badge: "SaaS Scale & Microservices",
    badgeColor: "border-gold/30 text-gold bg-gold/5",
    bullets: [
      "Architected full-stack SaaS features serving 100K+ MAU: shipped micro-frontends with Module Federation, optimistic UI, WebSocket sync, and Node.js/FastAPI services behind an API Gateway, reducing Time-to-Interactive to 1.2s and bundle size by 55%.",
      "Redesigned an event-driven backend handling 10M+ daily events across 6 microservices using the Saga pattern, Kafka, circuit breakers, exponential backoff, and PostgreSQL read replicas with connection pooling; reduced p99 latency from 800ms to 35ms and achieved 99.95% uptime.",
      "Built GitHub Actions CI/CD with blue-green deployments, achieved 90%+ test coverage using Vitest and Playwright E2E, and added OpenTelemetry plus Sentry observability; cut deployment time from 30min to 8min and production incidents by 80%."
    ]
  },
  {
    company: "Elite Coders",
    role: "Full Stack Development Intern",
    date: "Feb 2025 – Mar 2025",
    location: "Greater Noida, UP",
    badge: "School ERP Systems",
    badgeColor: "border-white/30 text-white/80 bg-white/5",
    bullets: [
      "Developed core School ERP modules for student records, attendance, and fee management using the MERN stack for real institutional use.",
      "Optimized MongoDB schema design and indexing on high-traffic collections, improving query performance for ERP reporting workflows.",
      "Built and secured RESTful APIs with role-based access control for admin, teacher, and student roles, supporting multi-tenant institutional access."
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
