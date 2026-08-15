"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ComplexAbout() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = [
      { id: "#about-card-1", endTranslateX: -2200, rotate: 25 },
      { id: "#about-card-2", endTranslateX: -1400, rotate: -15 },
      { id: "#about-card-3", endTranslateX: -2000, rotate: 20 },
      { id: "#about-card-4", endTranslateX: -1600, rotate: -25 }
    ];

    let bioAnimated = false;

    ScrollTrigger.create({
      trigger: ".wrapper-about",
      start: "top top",
      end: "+=1200vh",
      scrub: 1,
      pin: true,
      refreshPriority: 10,
      onUpdate: (self) => {
        gsap.to(".wrapper-about", {
          x: `${-400 * self.progress}vw`,
          duration: 0.5,
          ease: "power3.out",
        });

        // Trigger bio reveal and counters when Slide 3 is coming into view
        if (self.progress > 0.25 && !bioAnimated) {
          bioAnimated = true;
          
          gsap.to(".bio-reveal", {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            duration: 1.5,
            ease: "power2.inOut"
          });

          const stats = document.querySelectorAll(".stat-number");
          stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute("data-target") || "0");
            const isFloat = stat.getAttribute("data-target")?.includes(".");
            const decimals = isFloat ? (stat.getAttribute("data-target") || "").split(".")[1]?.length || 1 : 0;
            const snapValue = isFloat ? Math.pow(10, -decimals) : 1;
            
            gsap.to(stat, {
              innerText: target,
              duration: 2,
              snap: { innerText: snapValue },
              ease: "power3.out",
              onUpdate: function() {
                // Ensure proper decimal formatting for GPA
                if (isFloat) {
                  stat.innerHTML = Number(this.targets()[0].innerText).toFixed(decimals);
                }
              }
            });
          });
        } else if (self.progress <= 0.25 && bioAnimated) {
          bioAnimated = false;
          
          // Reset wipe
          gsap.to(".bio-reveal", {
            clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
            duration: 0.5,
            ease: "power2.out"
          });

          // Reset counters
          const stats = document.querySelectorAll(".stat-number");
          stats.forEach(stat => {
            const isFloat = stat.getAttribute("data-target")?.includes(".");
            const decimals = isFloat ? (stat.getAttribute("data-target") || "").split(".")[1]?.length || 1 : 0;
            const snapValue = isFloat ? Math.pow(10, -decimals) : 1;
            gsap.to(stat, {
              innerText: 0,
              duration: 0.5,
              snap: { innerText: snapValue },
              ease: "power2.out",
              onUpdate: function() {
                if (isFloat) {
                  stat.innerHTML = Number(this.targets()[0].innerText).toFixed(decimals);
                }
              }
            });
          });
        }
      },
    });

    cards.forEach(card => {
      ScrollTrigger.create({
        trigger: ".wrapper-about",
        start: "top top",
        end: "+=1100vh",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(card.id, {
            x: `${card.endTranslateX * self.progress}px`,
            rotate: `${card.rotate * self.progress * 2}`,
            duration: 0.5,
            ease: "power3.out",
          });
        },
      });
    });

  }, { scope: containerRef });

  return (
    <div id="about" ref={containerRef} className="w-full bg-[#070708] z-[20] relative overflow-hidden">
      <section className="wrapper-about h-screen flex items-center relative" style={{ width: '500vw', willChange: 'transform' }} data-cursor-text="SCROLL">
        
        {/* Slide 1 */}
        <div className="w-[100vw] h-full flex flex-col items-center justify-center shrink-0 relative px-6">
          <div className="absolute top-[30%] left-[20%] w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <p className="font-tech text-accent uppercase tracking-[0.3em] text-sm md:text-base mb-4 animate-pulse">01 // INTRODUCTION</p>
          <h1 className="text-white text-center m-0 font-display font-extrabold text-[8vw] md:text-[6vw] leading-none tracking-tighter">
            Yash Kumar Verma
          </h1>
          <p className="font-tech text-white/40 text-sm mt-6 uppercase tracking-widest">Scroll to unfold the journey</p>
        </div>
 
        {/* Slide 2 */}
        <div className="w-[100vw] h-full px-8 flex flex-col items-center justify-center shrink-0 relative">
          <div className="absolute top-[40%] right-[20%] w-[35rem] h-[35rem] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />
          <p className="font-tech text-cyan uppercase tracking-[0.3em] text-sm md:text-base mb-6">02 // ROLE CAPABILITIES</p>
          <h1 className="text-white m-0 font-display font-extrabold leading-[0.95] text-center text-[10vw] md:text-[8vw] tracking-tighter uppercase">
            Developer <span className="text-accent">.</span><br />
            Creator <span className="text-cyan">.</span><br />
            Engineer <span className="text-gold">.</span><br />
          </h1>
        </div>

        {/* Slide 3: Summary */}
        <div className="w-[100vw] h-full px-6 md:px-32 flex flex-col justify-center shrink-0 relative">
          <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-gold/5 rounded-full blur-[160px] pointer-events-none" />
          <p className="font-tech text-gold uppercase tracking-[0.3em] text-xs md:text-sm mb-6">03 // BIOGRAPHY SUMMARY</p>
          <div className="relative text-xl md:text-3xl lg:text-4xl font-light leading-normal max-w-5xl font-sans tracking-tight bio-container">
            {/* Base Layer (Faded) */}
            <p className="text-white/20">
              <strong className="font-semibold text-white/20">AI Engineer (GPA 7.87)</strong> specializing in production-grade LLM systems, multi-agent RAG pipelines, and model routing. Built agentic architectures handling <strong className="font-semibold text-white/20">50K+ daily queries at p99 &lt;45ms</strong>, cutting LLM inference costs by <strong className="font-semibold text-white/20">60%</strong> across GPT-4, GPT-3.5, and fine-tuned Llama-3.1-8B.
              <br /><br />
              Strong grounding in <strong className="font-semibold text-white/20">Python, LangGraph, vector databases, and full-stack integration</strong> for shipping end-to-end AI features.
            </p>

            {/* Reveal Layer (Full Color + Clip Path) */}
            <p className="bio-reveal text-white absolute top-0 left-0 w-full h-full" style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
              <strong className="font-semibold text-accent">AI Engineer (GPA <span className="stat-number" data-target="7.87">0.00</span>)</strong> specializing in production-grade LLM systems, multi-agent RAG pipelines, and model routing. Built agentic architectures handling <strong className="font-semibold text-gold">50K+ daily queries at p99 &lt;45ms</strong>, cutting LLM inference costs by <strong className="font-semibold text-cyan">60%</strong> across GPT-4, GPT-3.5, and fine-tuned Llama-3.1-8B.
              <br /><br />
              Strong grounding in <strong className="font-semibold text-accent">Python, LangGraph, vector databases, and full-stack integration</strong> for shipping end-to-end AI features.
            </p>
          </div>
        </div>
        {/* Remaining empty space for the cards to flow across */}
        <div className="w-[200vw] shrink-0 h-full relative">
          
          {/* Card 1: AI & RAG */}
          <div 
            id="about-card-1" 
            className="card absolute overflow-hidden glass-card p-6 flex flex-col justify-between" 
            style={{ width: '320px', height: '380px', borderRadius: '24px', top: '40%', left: '20%', willChange: 'transform' }}
          >
            <div className="relative w-full h-[60%] rounded-xl overflow-hidden mb-4 border border-cyan/20">
              <img src="/img-1.png" alt="AI Stack" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div>
              <span className="font-tech text-xs text-cyan uppercase tracking-widest font-semibold">Cognitive Systems</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">AI & RAG Pipelines</h3>
              <p className="font-sans text-xs text-white/60 mt-1">LangChain, Scikit-learn, TensorFlow & vector stores orchestration.</p>
            </div>
          </div>

          {/* Card 2: Full-Stack */}
          <div 
            id="about-card-2" 
            className="card absolute overflow-hidden glass-card p-6 flex flex-col justify-between" 
            style={{ width: '320px', height: '380px', borderRadius: '24px', top: '15%', left: '42%', willChange: 'transform' }}
          >
            <div className="relative w-full h-[60%] rounded-xl overflow-hidden mb-4 border border-gold/20">
              <img src="/img-2.jpg" alt="Backend Stack" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div>
              <span className="font-tech text-xs text-gold uppercase tracking-widest font-semibold">Architecture</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Full-Stack Scale</h3>
              <p className="font-sans text-xs text-white/60 mt-1">MERN stacks, caching engines, and SQL/NoSQL tuning.</p>
            </div>
          </div>

          {/* Card 3: Open Source */}
          <div 
            id="about-card-3" 
            className="card absolute overflow-hidden glass-card p-6 flex flex-col justify-between" 
            style={{ width: '320px', height: '380px', borderRadius: '24px', top: '48%', left: '65%', willChange: 'transform' }}
          >
            <div className="relative w-full h-[60%] rounded-xl overflow-hidden mb-4 border border-accent/20">
              <img src="/img-3.jpg" alt="Open Source" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div>
              <span className="font-tech text-xs text-accent uppercase tracking-widest font-semibold">Ecosystems</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Open Source MCP</h3>
              <p className="font-sans text-xs text-white/60 mt-1">Author of tweakcn-mcp npm package for web automation testing.</p>
            </div>
          </div>

          {/* Card 4: Interactive Web */}
          <div 
            id="about-card-4" 
            className="card absolute overflow-hidden glass-card p-6 flex flex-col justify-between" 
            style={{ width: '320px', height: '380px', borderRadius: '24px', top: '10%', left: '85%', willChange: 'transform' }}
          >
            <div className="relative w-full h-[60%] rounded-xl overflow-hidden mb-4 border border-white/10">
              <img src="/img-4.jpg" alt="Interactive Web" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div>
              <span className="font-tech text-xs text-white/60 uppercase tracking-widest font-semibold">User Experience</span>
              <h3 className="font-display font-bold text-xl text-white mt-1">Cinematic Web</h3>
              <p className="font-sans text-xs text-white/60 mt-1">Crafting immersive digital layouts using GSAP, WebGL & Matter.js.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
