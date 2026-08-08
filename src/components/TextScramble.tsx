"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TextScrambleProps {
  text: string;
  triggerOnScroll?: boolean;
  duration?: number;
  className?: string;
}

const CHARACTERS = "!<>-_\\\\/[]{}—=+*^?#________";

export default function TextScramble({
  text,
  triggerOnScroll = true,
  duration = 1.2,
  className,
}: TextScrambleProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);

  useGSAP(
    () => {
      if (!elementRef.current) return;

      const element = elementRef.current;
      
      const scramble = () => {
        if (isScrambling) return;
        setIsScrambling(true);

        const length = text.length;
        // Make it slightly slower and longer for a smoother feel
        const targetCycles = Math.max(15, Math.floor(duration * 30)); 
        let frame = 0;

        const tick = () => {
          frame++;
          
          let result = "";
          for (let i = 0; i < length; i++) {
            // Add some randomness to the resolve time for each character
            const charCycleTarget = (i / length) * targetCycles * 0.6 + (Math.random() * targetCycles * 0.2); 
            
            if (frame >= charCycleTarget + (targetCycles * 0.2)) {
              result += text[i];
            } else if (text[i] === " ") {
              result += " ";
            } else {
              result += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            }
          }
          
          setDisplayText(result);

          if (frame < targetCycles) {
            requestAnimationFrame(tick);
          } else {
            setDisplayText(text);
            setIsScrambling(false);
          }
        };
        
        requestAnimationFrame(tick);
      };

      if (triggerOnScroll) {
        ScrollTrigger.create({
          trigger: element,
          start: "top bottom",
          onEnter: scramble,
          once: true,
        });
      } else {
        const timeout = setTimeout(scramble, 100);
        return () => clearTimeout(timeout);
      }
    },
    { scope: elementRef, dependencies: [text, triggerOnScroll, duration] }
  );

  return (
    <span
      ref={elementRef}
      className={cn("inline-flex flex-wrap", className)}
    >
      {text.split('').map((char, i) => (
        <span key={i} className="relative inline-block whitespace-pre">
          {/* Invisible original character holds the exact width */}
          <span className="invisible opacity-0">{char}</span>
          {/* Absolute positioned scrambled character */}
          <span className="absolute left-0 top-0 w-full text-center">
            {displayText[i] || char}
          </span>
        </span>
      ))}
    </span>
  );
}
