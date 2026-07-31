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
      "Built a real-time, event-driven data ingestion pipeline achieving <15ms database capture latency and a 1.1s end-to-end graph indexing turnaround, by capturing PostgreSQL WAL changes via Debezium, streaming through Apache Kafka, and writing asynchronously to Neo4j and Qdrant.",
      "Developed a hybrid GraphRAG search engine that reduced grounding context blind spots while maintaining retrieval speeds under 69ms, by extracting entity/relationship structure with Gemini 2.5 Flash and combining dense vector search with Cypher-based k-hop graph traversals.",
      "Architected a decoupled LLM supervisor agent gateway, reducing agent-to-tool integration overhead to <13ms, by implementing the Model Context Protocol (MCP) over Stdio transport to dynamically discover and route queries across graph, vector, web search, and codebase-indexing tools with a LangGraph router.",
      "Benchmarked the full stack end-to-end, validating sub-5ms Qdrant/Neo4j retrieval at 100K+ vectors and throughput up to 25 concurrent write operations/sec bound by LLM extraction concurrency."
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
      "Architected a production-grade multi-agent AI platform on a microservices backend (Auth, Chat, Agent, Billing services behind an API Gateway), orchestrating 8 specialized agents via a LangGraph.js supervisor that auto-classifies intent and routes requests.",
      "Built specialized agents for code generation (DeepSeek), web search (Tavily), PDF/PPT generation, AI image generation (Pollinations.ai), and multimodal vision (Gemini), streaming structured artifacts to a React 19 + Monaco Editor frontend.",
      "Implemented a PDF RAG agent using Gemini embeddings and Qdrant Cloud (chunking, similarity search, per-query collection cleanup) plus Redis-backed conversation memory (20-message sliding window) and Firebase session auth.",
      "Designed the API Gateway with Firebase Admin SDK auth, Redis session store, Helmet security headers, and per-agent rate limiting; integrated Backblaze B2 (S3-compatible) storage for generated files."
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
      "Built a fully local retrieval-augmented generation system enabling natural-language Q&A over any codebase — combining LangGraph orchestration, ChromaDB vector storage, and Gemini for grounded, code-aware responses.",
      "Implemented Cross-Encoder reranking to sharpen retrieval precision and built an automated evaluation harness with Ragas (context precision, recall, faithfulness, answer relevancy) to continuously benchmark pipeline quality, reaching an internally validated 8/10 output-quality score.",
      "Debugged and hardened the pipeline in production-style conditions — resolving silent failure modes, stale reranker references, and architecting multi-tenant session isolation for concurrent codebase queries."
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
      "Built a standalone tool that benchmarks any RAG pipeline across three evaluation frameworks (Ragas, DeepEval, TruLens) side by side via a single-function adapter interface, requiring zero orchestration code from the end user.",
      "Solved the Pydantic v1/v2 dependency conflict between the three frameworks by architecting isolated per-framework virtual environments with subprocess-based orchestration, letting all three run in parallel without conflicts.",
      "Generated an interactive HTML dashboard (Plotly radar charts) comparing normalized scores per-question across frameworks, plus a granular JSON export for CI/CD quality-gate integration.",
      "Validated the tool end-to-end by benchmarking my own CodeLens RAG pipeline through it, proving framework-agnostic compatibility beyond the built-in demo pipeline."
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
      {/* Decorative ambient background orb */}
      <div className="absolute bottom-[10%] left-[-5%] w-[40rem] h-[40rem] bg-cyan/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="absolute top-10 left-10 md:top-20 md:left-20 z-[30]">
        <p className="font-tech text-cyan uppercase tracking-[0.3em] text-xs md:text-sm mb-3">05 // WORK SHOWCASE</p>
        <h2 className="text-3xl md:text-5xl font-display font-extrabold uppercase tracking-tighter">Featured Projects</h2>
      </div>

      <div className="h-screen w-full flex items-center" data-cursor-text="DRAG">
        <div ref={containerRef} className="flex h-full items-center">
          {projects.map((project, i) => (
            <div key={i} className="project-item w-screen h-full flex flex-col items-center justify-center pt-24 md:pt-32 shrink-0 px-6 md:px-20 relative">
              
              {/* Glassmorphic Project Card */}
              <div className="project-content glass-card p-0 md:p-0 rounded-[2rem] flex flex-col md:flex-row items-center max-w-5xl text-left border border-white/5 shadow-2xl relative overflow-hidden w-full">
                
                {/* Project Image Panel */}
                <div className="w-full md:w-[45%] h-64 md:h-full relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-white/10">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070708]/80 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Project Details Panel */}
                <div className="p-8 md:p-12 w-full md:w-[55%] flex flex-col">
                  {/* Neon Accent Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />
                  
                  {/* Meta details */}
                  <div className="flex justify-between items-center w-full mb-6">
                    <span className="font-tech text-xs md:text-sm text-accent uppercase tracking-widest font-semibold">
                      {project.category}
                    </span>
                    <span className="font-tech text-xs md:text-sm text-white/40 font-bold px-3 py-1 rounded-md border border-white/10 bg-white/5">
                      {project.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tighter mb-4 text-white">
                    {project.title}
                  </h3>
                
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="font-tech text-[10px] md:text-xs tracking-wider uppercase bg-white/5 border border-white/10 hover:border-white/20 transition-colors px-3 py-1 rounded-full text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Bullet points */}
                <div className="flex flex-col gap-4 text-sm md:text-base font-light text-white/70 max-w-3xl leading-relaxed font-sans mb-8">
                  {project.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-accent mt-0.5">•</span>
                      <p>{bullet}</p>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-6 mt-2 pointer-events-auto">
                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 bg-accent text-black hover:bg-accent/90 transition-all font-tech font-bold uppercase tracking-wider text-xs md:text-sm rounded-full shadow-lg shadow-accent/25 cursor-pointer"
                    >
                      Live Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-6 py-3 border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 text-white transition-all font-tech font-semibold uppercase tracking-wider text-xs md:text-sm rounded-full cursor-pointer"
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
