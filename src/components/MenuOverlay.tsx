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
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2,
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
      className={`fixed inset-0 bg-[#070708]/90 z-[55] flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ backdropFilter: "blur(0px)", opacity: 0 }}
    >
      <nav
        ref={linksRef}
        className="flex flex-col items-center gap-10 text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter"
      >
        <a
          href="#about"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">01 //</span> About
        </a>
        <a
          href="#skills"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">02 //</span> Skills
        </a>
        <a
          href="#experience"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">03 //</span> Experience
        </a>
        <a
          href="#spotlight"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">04 //</span> Spotlight
        </a>
        <a
          href="#work"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">05 //</span> Work
        </a>
        <a
          href="#education"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">06 //</span> Education
        </a>
        <a
          href="#contact"
          onClick={handleLinkClick}
          className="text-white hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-4 text-4xl md:text-6xl"
        >
          <span className="font-tech text-sm text-accent/60 tracking-wider">07 //</span> Contact
        </a>
      </nav>

      {/* Decorative details */}
      <div className="absolute bottom-10 left-10 md:left-20 font-tech text-xs opacity-40 uppercase tracking-widest hidden md:block">
        Yash Verma // Creative Portfolio
      </div>
      <div className="absolute bottom-10 right-10 md:right-20 font-tech text-xs opacity-40 uppercase tracking-widest hidden md:block">
        © 2026
      </div>
    </div>
  );
}
