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
    const titles = gsap.utils.toArray<HTMLElement>('.title');
    
    titles.forEach((title, index) => {
      const chars = gsap.utils.toArray<HTMLElement>(title.querySelectorAll('.char'));
      
      // Set initial Y positions based on even/odd index
      chars.forEach((char, i) => {
        const charInitialY = i % 2 === 0 ? -150 : 150;
        gsap.set(char, { y: charInitialY });
      });
      
      const titleContainer = title.querySelector('.title-container');
      const titleContainerInitialX = index % 2 !== 0 ? -100 : 100;
      
      const charCount = chars.length;

      ScrollTrigger.create({
        trigger: title,
        start: 'top 85%',
        end: 'top 15%',
        scrub: 1,
        onUpdate: (self) => {
          // Animate title container X
          if (titleContainer) {
            const titleContainerX = titleContainerInitialX - self.progress * titleContainerInitialX;
            gsap.set(titleContainer, { x: `${titleContainerX}%` });
          }

          // Animate individual characters
          chars.forEach((char, i) => {
            let charStaggerIndex = (index % 2 !== 0) ? (charCount - i - 1) : i;

            const charStartDelay = 0.08;
            const charTimelineSpan = 1 - charStartDelay;
            const staggerFactor = Math.min(0.55, charTimelineSpan * 0.55);
            const delay = charStartDelay + (charStaggerIndex / charCount) * staggerFactor;
            const duration = charTimelineSpan - (staggerFactor * (charCount - 1)) / charCount;
            const start = delay;

            let charProgress = 0;
            if (self.progress >= start) {
              charProgress = Math.min(1, (self.progress - start) / duration);
            }

            const charInitialY = i % 2 === 0 ? -150 : 150;
            const charY = charInitialY - charProgress * charInitialY;
            gsap.set(char, { y: charY });
          });
        }
      });
    });
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
