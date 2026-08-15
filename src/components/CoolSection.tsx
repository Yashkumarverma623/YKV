"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Helper component to split text into characters without needing GSAP SplitText plugin
const SplitChars = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <span 
          key={i} 
          className="char relative inline-block will-change-transform" 
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </>
  );
};

export default function CoolSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    const titles = gsap.utils.toArray<HTMLElement>(containerRef.current.querySelectorAll('.title'));

    titles.forEach((title, index) => {
      const titleContainer = title.querySelector<HTMLElement>('.title-container');
      const chars = title.querySelectorAll<HTMLElement>('.char');
      
      const isOdd = index % 2 !== 0;
      const initialX = isOdd ? -100 : 100;

      // 1. Instantly set initial off-screen positions
      if (titleContainer) {
        gsap.set(titleContainer, { xPercent: initialX });
      }

      chars.forEach((char, i) => {
        const initialY = i % 2 === 0 ? -120 : 120;
        gsap.set(char, { y: initialY, opacity: 0 });
      });

      // 2. Build GSAP Timeline scrubbed to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          end: 'center center',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      if (titleContainer) {
        tl.to(titleContainer, {
          xPercent: 0,
          duration: 1,
          ease: 'power2.out',
        }, 0);
      }

      tl.to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: isOdd ? -0.04 : 0.04,
        ease: 'back.out(1.2)',
      }, 0);
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#070708] text-white relative z-[20]">
      <style>{`
        .title h2 {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.6rem, 7.8vw, 10rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin: 0;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .title h2.title-matter {
          font-size: clamp(1.5rem, 6.8vw, 9rem);
        }
        
        .title-container {
          will-change: transform;
        }
      `}</style>

      {/* Slide 1 */}
      <section className="relative w-full overflow-hidden h-[90vh] flex flex-col items-center justify-center text-center bg-[#070708]">
        <p className="font-tech text-accent uppercase tracking-[0.3em] text-xs md:text-sm mb-4">08 // MISSION</p>
        <h2 className="font-display font-extrabold text-[8vw] md:text-[6vw] tracking-tighter leading-none text-white m-0 uppercase">
          I Build Systems
        </h2>
      </section>

      {/* Animated Titles */}
      <section className="animated-titles">
        <div className="title relative w-full overflow-hidden h-[80vh] flex items-center bg-[#e3f794]">
          <div className="title-container relative w-full flex justify-center items-center text-black">
            <h2><SplitChars text="That Scale" /></h2>
          </div>
        </div>

        <div className="title relative w-full overflow-hidden h-[80vh] flex items-center bg-[#070708] border-t border-b border-white/5">
          <div className="title-container relative w-full flex justify-center items-center text-white">
            <h2><SplitChars text="That Ship" /></h2>
          </div>
        </div>

        <div className="title relative w-full overflow-hidden h-[80vh] flex items-center bg-[#e3f794]">
          <div className="title-container relative w-full flex justify-center items-center text-black">
            <h2 className="title-matter"><SplitChars text="That Matter" /></h2>
          </div>
        </div>
      </section>

      {/* Slide 5 */}
      <section className="relative w-full overflow-hidden h-[90vh] flex flex-col items-center justify-center text-center bg-[#070708]">
        <p className="font-tech text-cyan uppercase tracking-[0.3em] text-xs md:text-sm mb-4">09 // INQUIRIES</p>
        <h2 className="font-display font-extrabold text-[8vw] md:text-[6vw] tracking-tighter leading-none text-white m-0 uppercase">
          Let's Talk
        </h2>
      </section>
    </div>
  );
}
