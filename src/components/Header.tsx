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
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex flex-col gap-[6px] p-2 focus:outline-none hover:opacity-70 transition-opacity cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className={`w-8 h-[2px] bg-white rounded-full transition-transform duration-300 ${isMenuOpen ? "translate-y-[8px] rotate-45" : ""}`}></div>
          <div className={`w-8 h-[2px] bg-white rounded-full transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></div>
          <div className={`w-8 h-[2px] bg-white rounded-full transition-transform duration-300 ${isMenuOpen ? "-translate-y-[8px] -rotate-45" : ""}`}></div>
        </button>
      </header>
      
      <MenuOverlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
    </>
  );
}
