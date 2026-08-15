"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextScramble from "./TextScramble";
import TiltCard from "./TiltCard";

gsap.registerPlugin(ScrollTrigger);

export default function EducationAndAchievements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".edu-reveal", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="education" ref={containerRef} className="w-full bg-[#070708] text-white py-32 px-6 md:px-20 z-[20] relative border-t border-white/5">
      {/* Decorative ambient background orb */}
      <div className="absolute top-[20%] left-[-10%] w-[35rem] h-[35rem] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        {/* Education Column */}
        <TiltCard>
        <div className="edu-reveal glass-card p-6 md:p-10 rounded-3xl flex flex-col justify-between border border-white/5 shadow-2xl relative overflow-hidden group h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div>
            <p className="font-tech text-accent uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">06 // ACADEMICS</p>
            <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-tech font-bold uppercase tracking-tight border-b border-white/10 pb-4 mb-8">
              <TextScramble text="Education" />
            </h2>
            
            <div className="flex flex-col gap-4">
              <span className="font-tech text-xs text-white/40 uppercase tracking-widest font-semibold">Degree Program</span>
              
              <div className="flex items-center gap-6 mt-2 mb-2">
                <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 bg-white/5 rounded-2xl border border-white/10 p-3 shadow-lg flex items-center justify-center overflow-hidden group-hover:border-accent/40 transition-colors duration-500">
                  <img src="/university_logo.png" alt="University Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-tech font-bold text-white group-hover:text-accent transition-colors duration-300">
                    B.Tech in Computer Science & Engineering
                  </h3>
                </div>
              </div>
              <p className="text-lg font-medium text-white/80">Vishveshwarya Group of Institutions (VGI)</p>
              <p className="font-tech text-sm text-white/40 uppercase tracking-wide">Greater Noida, UP</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 mt-10">
            <span className="font-tech text-xs font-bold bg-accent text-black px-4 py-1.5 rounded-full shadow-lg shadow-accent/20">
              GPA: 7.87 / 10
            </span>
            <span className="font-tech text-xs text-white/60 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
              Sep 2022 – Jun 2026
            </span>
          </div>
        </div>
        </TiltCard>

        {/* Achievements Column */}
        <TiltCard>
        <div className="edu-reveal glass-card p-6 md:p-10 rounded-3xl flex flex-col border border-white/5 shadow-2xl relative overflow-hidden group h-full">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/5 rounded-full blur-[40px] pointer-events-none" />
          
          <p className="font-tech text-cyan uppercase tracking-[0.3em] text-[10px] md:text-xs mb-3">07 // MILESTONES</p>
          <h2 className="text-2xl md:text-3xl lg:text-2xl xl:text-3xl font-tech font-bold uppercase tracking-tight border-b border-white/10 pb-4 mb-8">
            <TextScramble text="Achievements" />
          </h2>
          
          <div className="flex flex-col gap-6 text-sm font-light text-white/70 leading-relaxed font-sans">
            <div className="flex items-start gap-4 hover:translate-x-1 transition-all duration-300">
              <span className="font-tech text-cyan text-lg mt-0.5">✦</span>
              <p>
                <strong className="font-semibold text-white">Publications & Research:</strong> Co-authored a peer-reviewed academic paper (2025) on Agentic RAG for Domain-Specific Knowledge Retrieval, and authored a 60+ page technical report for a Ministry of Earth Sciences-sponsored project (SIH-25040/INCOIS).
              </p>
            </div>
            <div className="flex items-start gap-4 hover:translate-x-1 transition-all duration-300">
              <span className="font-tech text-cyan text-lg mt-0.5">✦</span>
              <p>
                <strong className="font-semibold text-white">LeetCode & Problem Solving:</strong> Solved 400+ LeetCode problems, demonstrating strong data structures, algorithms, and technical problem-solving practice.
              </p>
            </div>
            <div className="flex items-start gap-4 hover:translate-x-1 transition-all duration-300">
              <span className="font-tech text-cyan text-lg mt-0.5">✦</span>
              <p>
                <strong className="font-semibold text-white">Hackathons & Leadership:</strong> Top-3 finishes at 8+ inter-college hackathons, building and shipping functional AI/full-stack prototypes under tight time constraints.
              </p>
            </div>
          </div>
        </div>
        </TiltCard>

      </div>
    </section>
  );
}
