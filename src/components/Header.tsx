"use client";

import { useState, useRef } from "react";
import MenuOverlay from "./MenuOverlay";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 5.5
    });
  }, { scope: headerRef });

  return (
    <>
      <header 
        ref={headerRef} 
        className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-[60] mix-blend-difference pointer-events-auto text-white"
      >
        <div className="motivate-hover font-tech font-bold text-xl md:text-2xl tracking-[0.4em] uppercase cursor-pointer hover:text-accent transition-colors duration-300">
          Y.K.V.
        </div>
        
        <div className="flex items-center gap-4">
          <a
            href="/Yash_Kumar_Verma_Resume.pdf"
            download="Yash_Kumar_Verma_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-tech tracking-wider uppercase border border-white/40 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
            title="Download Resume PDF"
          >
            <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Resume</span>
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-[6px] p-2 focus:outline-none hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className={`w-8 h-[2px] bg-white rounded-full transition-transform duration-300 ${isMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}></div>
            <div className={`w-8 h-[2px] bg-white rounded-full transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></div>
            <div className={`w-8 h-[2px] bg-white rounded-full transition-transform duration-300 ${isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}></div>
          </button>
        </div>
      </header>
      
      <MenuOverlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
