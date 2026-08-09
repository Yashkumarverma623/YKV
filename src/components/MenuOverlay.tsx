"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MenuOverlay({ isOpen, setIsOpen }: MenuOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!linksRef.current) return;
    const links = linksRef.current.querySelectorAll("a");

    if (isOpen) {
      // Animate background overlay in
      gsap.to(containerRef.current, {
        opacity: 1,
        backdropFilter: "blur(24px)",
        duration: 0.6,
        ease: "power3.out",
      });

      // Stagger animate links sliding up
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.15,
        }
      );
    } else {
      // Fade out background overlay and reset links
      gsap.to(containerRef.current, {
        opacity: 0,
        backdropFilter: "blur(0px)",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 bg-[#070708]/95 z-[55] flex flex-col items-center justify-center p-6 transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(0px)", opacity: 0 }}
    >
      <nav
        ref={linksRef}
        className="flex flex-col items-center gap-3 md:gap-4 font-display font-bold uppercase tracking-tighter max-h-[82vh] overflow-y-auto py-6 px-4 scrollbar-none"
      >
        <a
          href="#about"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">01 //</span> About
        </a>
        <a
          href="#skills"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">02 //</span> Skills
        </a>
        <a
          href="#experience"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">03 //</span> Experience
        </a>
        <a
          href="#spotlight"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">04 //</span> Spotlight
        </a>
        <a
          href="#work"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">05 //</span> Work
        </a>
        <a
          href="#education"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">06 //</span> Education
        </a>
        <a
          href="#contact"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-2xl md:text-4xl lg:text-5xl"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">07 //</span> Contact
        </a>
        <a
          href="/Yash_Kumar_Verma_Resume.pdf"
          download="Yash_Kumar_Verma_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
          className="text-accent hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-3 md:gap-4 text-xl md:text-3xl lg:text-4xl mt-2 pt-3 border-t border-accent/20 cursor-pointer"
        >
          <span className="font-tech text-xs md:text-sm text-accent/60 tracking-wider">08 //</span> Download Resume ⬇
        </a>
      </nav>

      {/* Decorative details */}
      <div className="absolute bottom-6 left-6 md:left-16 font-tech text-[10px] md:text-xs opacity-40 uppercase tracking-widest hidden md:block">
        Yash Verma // Creative Portfolio
      </div>
      <div className="absolute bottom-6 right-6 md:right-16 font-tech text-[10px] md:text-xs opacity-40 uppercase tracking-widest hidden md:block">
        © 2026
      </div>
    </div>
  );
}
