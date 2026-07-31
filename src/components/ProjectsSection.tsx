"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "MCP + GraphRAG + Streaming CDC Platform",
    year: "2026",
    category: "Data Platform & GraphRAG",
    image: "/project-graphrag.png",
    stack: ["PostgreSQL", "Debezium", "Apache Kafka", "Neo4j", "Qdrant", "LangGraph", "MCP"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623",
    bullets: [
      "Architected a real-time event-driven data pipeline and a hybrid GraphRAG search engine, seamlessly integrated via a decoupled LLM supervisor agent using the Model Context Protocol."
    ]
  },
  {
    title: "Cortex AI",
    year: "2026",
    category: "Multi-Agent AI Platform",
    image: "/project-cortexai.png",
    stack: ["Node.js", "React", "LangGraph.js", "Redis", "MongoDB", "Qdrant", "Microservices"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623",
    bullets: [
      "Built a production-grade multi-agent AI platform on a microservices backend, orchestrating 8 specialized agents via LangGraph for code generation, web search, and multimodal vision tasks."
    ]
  },
  {
    title: "CodeLens",
    year: "2026",
    category: "Local Talk-to-Codebase RAG",
    image: "/project-codelens.png",
    stack: ["LangChain", "LangGraph", "ChromaDB", "Gemini", "Ragas", "Cross-Encoder"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623",
    bullets: [
      "Developed a fully local retrieval-augmented generation system combining LangGraph, ChromaDB, and Gemini to enable natural-language Q&A over codebases with robust automated evaluation."
    ]
  },
  {
    title: "RAG Evaluation Tool",
    year: "2026",
    category: "RAG Evaluation & Benchmarking",
    image: "/project-rageval.png",
    stack: ["Python", "Ragas", "DeepEval", "TruLens", "Plotly", "LangChain"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623",
    bullets: [
      "Engineered a standalone benchmarking tool that runs Ragas, DeepEval, and TruLens simultaneously in isolated environments, generating interactive performance dashboards for RAG pipelines."
    ]
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${container.scrollWidth}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    const projectItems = gsap.utils.toArray<HTMLElement>(".project-item");
    
    projectItems.forEach((item) => {
      const content = item.querySelector(".project-content");
      
      gsap.fromTo(content, {
        scale: 0.9,
        opacity: 0.3
      }, {
        scale: 1,
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          containerAnimation: scrollTween,
          start: "left center+=20%",
          end: "center center",
          scrub: true,
        }
      });
      
      gsap.to(content, {
        scale: 0.9,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          containerAnimation: scrollTween,
          start: "center center",
          end: "right center-=20%",
          scrub: true,
        }
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="work" className="relative w-full bg-[#070708] text-white overflow-hidden z-[20] border-b border-white/5">
      {/* Decorative ambient background orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[50rem] h-[50rem] bg-cyan/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-[30]">
        <p className="font-tech text-cyan uppercase tracking-[0.3em] text-xs md:text-sm mb-3">05 // WORK SHOWCASE</p>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter">Featured Projects</h2>
      </div>

      <div className="h-[100svh] w-full flex items-end" data-cursor-text="DRAG">
        <div ref={containerRef} className="flex h-full items-end pb-8 md:pb-12">
          {projects.map((project, i) => (
            <div key={i} className="project-item w-screen flex flex-col items-center justify-end shrink-0 px-4 md:px-20 relative">
              
              {/* Glassmorphic Project Card */}
              <div className="project-content glass-card p-0 md:p-0 rounded-[2rem] flex flex-col md:flex-row items-stretch max-w-5xl text-left border border-white/5 shadow-2xl relative overflow-hidden w-full h-[calc(100svh-160px)] md:h-[calc(100svh-220px)] max-h-[700px]">
                
                {/* Project Image Panel */}
                <div className="w-full md:w-[40%] h-40 md:h-auto min-h-[160px] md:min-h-full relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/10 flex flex-col">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 flex-1" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/80 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Project Details Panel */}
                <div className="p-5 md:p-10 w-full md:w-[60%] flex-1 min-h-0 flex flex-col overflow-hidden relative">
                  {/* Neon Accent Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
                  
                  {/* Meta details */}
                  <div className="flex justify-between items-center w-full mb-3 md:mb-6 shrink-0 relative z-10">
                    <span className="font-tech text-xs md:text-sm text-cyan uppercase tracking-widest font-semibold">
                      {project.category}
                    </span>
                    <span className="font-tech text-xs md:text-sm text-white/60 font-bold px-3 py-1 rounded-md border border-white/10 bg-white/5">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-tighter mb-3 md:mb-4 text-white shrink-0 relative z-10">
                    {project.title}
                  </h3>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-4 md:mb-6 shrink-0 relative z-10">
                  {project.stack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-tech text-[10px] md:text-xs tracking-wider uppercase bg-white/5 border border-white/10 px-2 md:px-3 py-1 rounded-full text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Bullet points */}
                <div className="flex flex-col gap-3 text-xs md:text-sm font-light text-white/70 max-w-3xl leading-relaxed font-sans mb-6 md:mb-8 relative z-10">
                  {project.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-cyan mt-0.5 shrink-0">•</span>
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-auto pt-2 pointer-events-auto shrink-0 pb-2 md:pb-0">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 md:px-6 py-2.5 md:py-3 bg-accent text-black hover:bg-accent/90 transition-all font-tech font-bold uppercase tracking-wider text-xs md:text-sm rounded-full shadow-lg shadow-accent/25 cursor-pointer"
                    >
                      Live Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 md:px-6 py-2.5 md:py-3 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white transition-all font-tech font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full cursor-pointer"
                    >
                      GitHub
                    </a>
                  )}
                </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
