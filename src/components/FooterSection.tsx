"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TextScramble from "./TextScramble";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-item", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out"
    });
  }, { scope: sectionRef });

  return (
    <footer 
      ref={sectionRef} 
      id="contact" 
      className="relative w-full px-6 md:px-20 py-24 bg-black text-white flex flex-col gap-16 z-[20] border-t border-white/5"
    >
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Giant CTA Header */}
      <div className="footer-item text-center md:text-left">
        <h2 className="text-[10vw] md:text-[8vw] font-display font-extrabold uppercase tracking-tighter leading-none text-white select-none">
          LET'S BUILD <br />
          SOMETHING <span className="text-accent shadow-accent/10 drop-shadow-[0_0_20px_rgba(227,247,148,0.2)]">BEYOND</span>
        </h2>
      </div>

      {/* Info Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mt-4 border-t border-white/10 pt-16">
        
        {/* Contact info */}
        <div className="footer-item flex flex-col gap-4">
          <p className="font-tech text-xs text-white/40 uppercase tracking-[0.25em]"><TextScramble text="01 // CONTACT DIRECT" /></p>
          <div className="flex flex-col gap-2 items-start">
            <a 
              href="mailto:yashkumarverma623@gmail.com" 
              className="text-lg md:text-xl font-tech hover:text-accent transition-colors duration-300 break-all"
            >
              <TextScramble text="yashkumarverma623@gmail.com" />
            </a>
            <a 
              href="tel:+919142415223" 
              className="text-lg md:text-xl font-tech hover:text-accent transition-colors duration-300"
            >
              <TextScramble text="+91 9142415223" />
            </a>
          </div>
        </div>

        {/* Social Linkages */}
        <div className="footer-item flex flex-col gap-4">
          <p className="font-tech text-xs text-white/40 uppercase tracking-[0.25em]"><TextScramble text="02 // NETWORKS" /></p>
          <div className="flex gap-6 md:flex-col md:gap-2 items-start">
            <a 
              href="https://www.linkedin.com/in/yash-kumar-verma623" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg md:text-xl font-tech hover:text-accent transition-colors duration-300"
            >
              <TextScramble text="LinkedIn ↗" />
            </a>
            <a 
              href="https://github.com/Yashkumarverma623" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-lg md:text-xl font-tech hover:text-accent transition-colors duration-300"
            >
              <TextScramble text="GitHub ↗" />
            </a>
          </div>
        </div>

        {/* Academic status */}
        <div className="footer-item flex flex-col gap-4 md:items-end">
          <p className="font-tech text-xs text-white/40 uppercase tracking-[0.25em]"><TextScramble text="03 // AVAILABILITY" /></p>
          <div className="text-left md:text-right">
            <p className="text-lg md:text-xl font-sans font-light text-white/80">
              <TextScramble text="Graduating " /><strong className="font-semibold text-accent"><TextScramble text="June 2026" /></strong>
            </p>
            <p className="text-sm font-tech text-white/40 mt-1 uppercase tracking-wider">
              <TextScramble text="Open to worldwide opportunities" />
            </p>
          </div>
        </div>

        {/* Resume Download */}
        <div className="footer-item flex flex-col gap-4 md:items-end">
          <p className="font-tech text-xs text-white/40 uppercase tracking-[0.25em]"><TextScramble text="04 // RESUME" /></p>
          <div className="text-left md:text-right">
            <a 
              href="/Yash_Kumar_Verma_Resume.pdf"
              download="Yash_Kumar_Verma_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lg md:text-xl font-tech text-accent hover:underline transition-all duration-300 cursor-pointer"
            >
              <TextScramble text="Download PDF ↗" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom copyrights */}
      <div className="footer-item flex flex-col md:flex-row justify-between items-center gap-6 mt-8 border-t border-white/5 pt-8 font-tech text-xs text-white/30 uppercase tracking-widest">
        <div><TextScramble text="© 2026 YASH VERMA. ALL RIGHTS RESERVED." /></div>
        <div><TextScramble text="DESIGNED WITH PURPOSE & INTELLECT" /></div>
      </div>
    </footer>
  );
}
