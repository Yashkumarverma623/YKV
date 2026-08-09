"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    id: "01",
    title: "HyperGraph-CDC & MCP Agent Gateway",
    year: "2026",
    category: "DATA PLATFORM & GRAPHRAG",
    image: "/project-graphrag.png",
    stack: ["PostgreSQL", "Debezium", "Apache Kafka", "Neo4j", "Qdrant", "LangGraph", "MCP"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623/HyperGraph-CDC",
    description: "Built a real-time event-driven data pipeline achieving <15ms database capture latency and 1.1s end-to-end graph indexing turnaround. Hybrid GraphRAG search engine (<69ms) combining Gemini 2.5 Flash with Cypher graph traversals, and an MCP agent gateway over Stdio transport (<13ms overhead).",
    metrics: [
      { label: "CDC Latency", val: "<15ms" },
      { label: "Graph Search", val: "<69ms" },
      { label: "MCP Gateway", val: "<13ms" }
    ]
  },
  {
    id: "02",
    title: "Cortex AI — Multi-Agent Platform",
    year: "2026",
    category: "MULTI-AGENT ORCHESTRATION",
    image: "/project-cortexai.png",
    stack: ["Node.js", "React 19", "LangGraph.js", "Redis", "MongoDB", "Qdrant Cloud", "Microservices"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623/Cortex-Ai-",
    description: "Architected a production-grade multi-agent AI platform on microservices, orchestrating 8 specialized agents via LangGraph.js (CodeGen, Tavily Search, PDF RAG, Multimodal Vision). Includes Redis sliding-window memory, S3 storage, Redis cosine-similarity semantic caching, and LLM-as-a-judge evaluation.",
    metrics: [
      { label: "Active Agents", val: "8 Autonomous" },
      { label: "Semantic Cache", val: "Cosine Match" },
      { label: "Eval Pipeline", val: "LLM-as-a-Judge" }
    ]
  },
  {
    id: "03",
    title: "CodeLens — Talk-to-Codebase RAG",
    year: "2026",
    category: "LOCAL LLM & CODEBASE RAG",
    image: "/project-codelens.png",
    stack: ["LangChain", "LangGraph", "ChromaDB", "Gemini", "Ragas", "Cross-Encoder", "Docker"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623/CodeLens-Local-Talk-to-Codebase-RAG-Engine",
    description: "Developed a fully local retrieval-augmented generation system enabling natural-language Q&A over codebase repositories. Combines LangGraph orchestration, ChromaDB vector storage, Cross-Encoder reranking, and an automated Ragas evaluation harness (8/10 validated output score).",
    metrics: [
      { label: "Ragas Score", val: "8/10 Score" },
      { label: "Vector DB", val: "ChromaDB" },
      { label: "Reranker", val: "Cross-Encoder" }
    ]
  },
  {
    id: "04",
    title: "Agent Observability Platform",
    year: "2026",
    category: "AGENT TELEMETRY & REGRESSION",
    image: "/project-agentobs.png",
    stack: ["Python", "FastAPI", "PostgreSQL", "React", "Recharts", "Docker", "LangChain"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623/Agent-Observability-Reliability-Platform",
    description: "Engineered a plug-and-play Python instrumentation SDK for LangChain/LangGraph agents streaming trace telemetry to FastAPI with zero blocking overhead. Features a rule-based failure classification engine (>30s timeouts, loops, hallucinations) and cross-version regression alert triggers.",
    metrics: [
      { label: "Telemetry", val: "Zero Blocking" },
      { label: "Alert Trigger", val: ">20% Drop" },
      { label: "Dashboard", val: "3s Polling" }
    ]
  },
  {
    id: "05",
    title: "RAG Evaluation & Benchmarking Tool",
    year: "2026",
    category: "RAG BENCHMARKING & EVALUATION",
    image: "/project-rageval.png",
    stack: ["Python", "Ragas", "DeepEval", "TruLens", "Plotly", "LangChain"],
    liveUrl: "#",
    githubUrl: "https://github.com/Yashkumarverma623",
    description: "Engineered a standalone benchmarking suite that runs Ragas, DeepEval, and TruLens simultaneously in isolated environments. Measures faithfulness, answer relevancy, and context recall, generating interactive Plotly dashboards to continuously benchmark RAG pipeline performance.",
    metrics: [
      { label: "Eval Frameworks", val: "Multi-Eval" },
      { label: "Evaluation", val: "Multi-Metric" },
      { label: "Dashboards", val: "Interactive" }
    ]
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".wrapper-projects",
      start: "top top",
      end: "+=1500vh",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        gsap.to(".wrapper-projects", {
          x: `${-500 * self.progress}vw`,
          duration: 0.5,
          ease: "power3.out",
        });
      },
    });
  }, { scope: containerRef });

  return (
    <div id="work" ref={containerRef} className="w-full bg-[#070708] text-white z-[20] relative overflow-hidden border-b border-white/5">
      <section className="wrapper-projects h-screen flex items-center relative" style={{ width: "600vw", willChange: "transform" }} data-cursor-text="SCROLL">
        
        {/* Slide 1: Work Introduction */}
        <div className="w-[100vw] h-full flex flex-col items-center justify-center shrink-0 relative px-6 md:px-20">
          <div className="absolute top-[25%] left-[20%] w-[35rem] h-[35rem] bg-cyan/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[15%] w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
          
          <p className="font-tech text-cyan uppercase tracking-[0.3em] text-xs md:text-sm mb-4 animate-pulse">05 // WORK SHOWCASE</p>
          <h1 className="text-white text-center m-0 font-display font-extrabold text-[10vw] md:text-[7vw] leading-[0.9] tracking-tighter uppercase flex flex-col items-center justify-center">
            <span>FEATURED</span>
            <span className="text-accent">PROJECTS</span>
          </h1>
          <p className="font-tech text-white/50 text-xs md:text-sm mt-6 uppercase tracking-widest text-center max-w-xl">
            Engineered AI Platforms & Autonomous System Architectures — Scroll sideways to explore
          </p>
          <div className="mt-8 flex items-center gap-3 text-cyan font-tech text-xs uppercase tracking-widest">
            <span>Scroll Down</span>
            <span className="animate-bounce">→</span>
          </div>
        </div>

        {/* Project Slides loop */}
        {featuredProjects.map((project) => (
          <div key={project.id} className="w-[100vw] h-full px-6 md:px-16 flex items-center justify-center shrink-0 relative">
            <div className="absolute top-[30%] right-[10%] w-[35rem] h-[35rem] bg-accent/10 rounded-full blur-[150px] pointer-events-none" />
            
            <div className="w-full max-w-6xl glass-card p-6 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
              {/* Image Preview */}
              <div className="w-full md:w-1/2 h-64 md:h-[420px] rounded-2xl overflow-hidden relative border border-white/10 group shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 font-tech text-xs text-accent uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-accent/30 backdrop-blur-md">
                  {project.category}
                </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-tech text-xs text-accent uppercase tracking-widest font-bold">PROJECT {project.id}</span>
                    <span className="font-tech text-xs text-white/50 border border-white/10 px-2.5 py-1 rounded-md">{project.year}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-tech font-bold text-white uppercase tracking-tight mb-4 leading-tight">
                    {project.title}
                  </h2>
                  <p className="font-sans text-xs md:text-sm text-white/70 leading-relaxed mb-6 font-light">
                    {project.description}
                  </p>
                  
                  {/* Metrics Badges */}
                  <div className="grid grid-cols-3 gap-2.5 mb-6">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center flex flex-col justify-center overflow-hidden">
                        <span className="font-tech text-xs sm:text-sm md:text-base font-bold text-accent block truncate w-full" title={m.val}>
                          {m.val}
                        </span>
                        <span className="font-tech text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider block mt-1 truncate w-full">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.stack.map((t, idx) => (
                      <span key={idx} className="font-tech text-[10px] uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="px-6 py-3 bg-accent text-black font-tech font-bold uppercase tracking-wider text-xs rounded-full shadow-lg shadow-accent/20 hover:bg-accent/90 transition-all cursor-pointer"
                  >
                    GitHub Codebase ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

      </section>
    </div>
  );
}
