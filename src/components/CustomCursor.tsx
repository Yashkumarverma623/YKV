"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const textEl = textRef.current;
    if (!cursor || !dot || !textEl) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX); 
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const motivateElement = target.closest('.motivate-hover');
      const hoverTextElement = target.closest('[data-cursor-text]') as HTMLElement;
      const linkOrButton = target.closest('a') || target.closest('button') || target.closest('.cursor-hover');
      
      if (motivateElement) {
        const messages = ["KEEP BUILDING", "STAY CURIOUS", "CREATE", "NEVER STOP", "INNOVATE", "PUSH LIMITS", "DREAM BIG", "GLITCH HUNTERS"];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        textEl.innerText = randomMsg;
        
        if (randomMsg === "GLITCH HUNTERS") {
          gsap.to(dot, { scale: 5.5, backgroundColor: '#0f0f1b', border: '2px solid #00f3ff', duration: 0.3, ease: "power3.out" });
          textEl.style.fontFamily = "";
          textEl.style.fontStyle = "";
          textEl.style.fontWeight = "";
          textEl.style.color = "white";
          textEl.style.textShadow = "none";
          textEl.style.letterSpacing = "0.05em";
        } else {
          gsap.to(dot, { scale: 5, backgroundColor: '#00e5ff', border: 'none', duration: 0.3, ease: "power3.out" });
          textEl.style.fontFamily = "";
          textEl.style.fontStyle = "normal";
          textEl.style.fontWeight = "normal";
          textEl.style.color = "";
          textEl.style.textShadow = "none";
          textEl.style.letterSpacing = "";
        }

        gsap.to(textEl, { opacity: 1, duration: 0.2, delay: 0.1 });
      } else if (hoverTextElement) {
        const text = hoverTextElement.dataset.cursorText || "";
        textEl.innerText = text;
        gsap.to(dot, { scale: 4, backgroundColor: '#e3f794', border: 'none', duration: 0.3, ease: "power3.out" });
        textEl.style.fontFamily = "";
        textEl.style.fontStyle = "normal";
        textEl.style.fontWeight = "normal";
        textEl.style.color = "";
        textEl.style.textShadow = "none";
        textEl.style.letterSpacing = "";
        gsap.to(textEl, { opacity: 1, duration: 0.2, delay: 0.1 });
      } else if (linkOrButton) {
        gsap.to(dot, { scale: 2, backgroundColor: 'white', border: 'none', duration: 0.3, ease: "power3.out" });
        textEl.style.fontFamily = "";
        textEl.style.fontStyle = "normal";
        textEl.style.fontWeight = "normal";
        textEl.style.color = "";
        textEl.style.textShadow = "none";
        textEl.style.letterSpacing = "";
        gsap.to(textEl, { opacity: 0, duration: 0.2 });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const motivateElement = target.closest('.motivate-hover');
      const linkOrButton = target.closest('a') || target.closest('button') || target.closest('.cursor-hover');
      const hoverTextElement = target.closest('[data-cursor-text]');

      if (linkOrButton || hoverTextElement || motivateElement) {
        gsap.to(dot, { scale: 1, backgroundColor: 'white', border: 'none', duration: 0.3, ease: "power3.out" });
        gsap.to(textEl, { opacity: 0, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:block mix-blend-difference"
      style={{ transform: "translate(-100px, -100px)" }}
    >
      <div 
        ref={dotRef}
        className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full transition-colors duration-300"
      />
      <div 
        ref={textRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-tech text-[10px] text-black font-bold uppercase tracking-widest opacity-0 whitespace-nowrap z-10"
      />
    </div>
  );
}
