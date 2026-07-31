"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "Full-Stack Developer",
  "AI Engineer",
  "Creative Technologist",
  "Creative Builder",
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameContainerRef = useRef<HTMLDivElement>(null);
  const [currentRole, setCurrentRole] = useState(0);
  const roleRef = useRef<HTMLSpanElement>(null);

  // ── Role Rotation ──
  useEffect(() => {
    if (!roleRef.current) return;

    const interval = setInterval(() => {
      const el = roleRef.current;
      if (!el) return;

      gsap.to(el, {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: () => {
          setCurrentRole((prev) => (prev + 1) % ROLES.length);
          gsap.set(el, { yPercent: 100, opacity: 0 });
          gsap.to(el, {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          });
        },
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ── Parallax Scroll Effect ──
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.to(section.querySelectorAll('.hero-heading'), {
      yPercent: -60,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(section.querySelectorAll('.hero-subtitle'), {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to(section.querySelector('.hero-role'), {
      yPercent: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: sectionRef });

  // ── Magnetic Hover on Name ──
  const handleNameMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = nameContainerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>('.name-char');
    const radius = 120;

    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - charCenterX;
      const dy = e.clientY - charCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const strength = (1 - dist / radius) * 0.4;
        gsap.to(char, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    });
  }, []);

  const handleNameMouseLeave = useCallback(() => {
    const container = nameContainerRef.current;
    if (!container) return;

    const chars = container.querySelectorAll<HTMLElement>('.name-char');
    chars.forEach((char) => {
      gsap.to(char, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero relative w-full h-screen p-8 flex flex-col justify-end text-center overflow-hidden"
    >
      {/* Row 1: "A Vision" */}
      <div className="header-row mb-2 hero-heading">
        <div className="divider relative w-full h-[1.5px] bg-white/20 scale-x-0 origin-left mb-1" />
        <h1 className="uppercase text-[8rem] md:text-[2rem] leading-none tracking-[-0.5rem] md:tracking-normal overflow-hidden">
          <span className="header-line inline-block translate-y-full">A Vision</span>
        </h1>
      </div>

      {/* Subtitle 1 */}
      <div className="flex justify-end px-2 md:px-20 mb-4 md:mb-6 hero-subtitle">
        <p className="hero-sub uppercase text-[0.6rem] md:text-sm font-light tracking-[0.2em] opacity-0 text-[#e3f794] text-right max-w-sm">
          <span className="inline-block">Weaving intelligent algorithms into seamless human experiences</span>
        </p>
      </div>

      {/* Row 2: "Captured Through" */}
      <div className="header-row mb-2 hero-heading">
        <div className="divider relative w-full h-[1.5px] bg-white/20 scale-x-0 origin-left mb-1" />
        <h1 className="uppercase text-[8rem] md:text-[2rem] leading-none tracking-[-0.5rem] md:tracking-normal overflow-hidden">
          <span className="header-line inline-block translate-y-full">Captured Through</span>
        </h1>
      </div>

      {/* Subtitle 2 */}
      <div className="flex justify-start px-2 md:px-20 mb-4 md:mb-6 hero-subtitle">
        <p className="hero-sub uppercase text-[0.6rem] md:text-sm font-light tracking-[0.2em] opacity-0 text-[#e3f794] text-left max-w-sm">
          <span className="inline-block">Architecting scalable ecosystems where data meets purposeful design</span>
        </p>
      </div>

      {/* Row 3: "Yash Verma" with Magnetic Hover */}
      <div className="header-row hero-heading">
        <div className="divider relative w-full h-[1.5px] bg-white/20 scale-x-0 origin-left mb-1" />
        <h1 className="uppercase text-[8rem] md:text-[2rem] leading-none tracking-[-0.5rem] md:tracking-normal overflow-hidden">
          <span className="header-line inline-block translate-y-full">
            <span
              ref={nameContainerRef}
              className="hidden md:inline-block cursor-default"
              onMouseMove={handleNameMouseMove}
              onMouseLeave={handleNameMouseLeave}
            >
              {'Yash Verma'.split('').map((char, i) => (
                <span
                  key={i}
                  className="name-char inline-block will-change-transform"
                  style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
            {/* Mobile: no magnetic hover */}
            <span className="md:hidden">Yash Verma</span>
          </span>
        </h1>
      </div>

      {/* Role Rotator */}
      <div className="hero-role flex justify-center mt-3 md:mt-5 mb-2">
        <div className="overflow-hidden h-6 md:h-8 relative">
          <span
            ref={roleRef}
            className="hero-role-text font-tech text-[#e3f794] uppercase tracking-[0.3em] text-[0.6rem] md:text-sm block opacity-0"
          >
            {ROLES[currentRole]}
          </span>
        </div>
      </div>
    </section>
  );
}
