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

interface MarqueeStripProps {
  words: string[];
  direction?: "left" | "right";
  speed?: number;
  className?: string;
}

export default function MarqueeStrip({
  words,
  direction = "left",
  speed = 1,
  className,
}: MarqueeStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || !text1Ref.current || !text2Ref.current) return;

      let xPercent = direction === "left" ? 0 : -100;
      let velocity = 0;
      let scrollVelocity = 0;

      const dir = direction === "left" ? -1 : 1;

      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          scrollVelocity = self.getVelocity();
        },
      });

      const tick = () => {
        // Base speed
        velocity = speed * dir * 0.03; // Much slower base speed for readability

        // Add scroll velocity impact (less sensitive)
        let v = scrollVelocity / 3000;
        v = gsap.utils.clamp(-1.5, 1.5, v); // Cap the max speed

        // Add absolute scroll velocity to base velocity so it speeds up in its current direction
        velocity += Math.abs(v) * dir;

        // Decay scroll velocity to 0 when not scrolling
        scrollVelocity *= 0.9;

        xPercent += velocity;

        if (xPercent <= -100 && dir === -1) {
          xPercent = 0;
        } else if (xPercent >= 0 && dir === 1) {
          xPercent = -100;
        }

        gsap.set(text1Ref.current, { xPercent });
        gsap.set(text2Ref.current, { xPercent });
      };

      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
      };
    },
    { scope: containerRef, dependencies: [direction, speed] }
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full overflow-hidden whitespace-nowrap bg-zinc-950 border-y border-white/5 py-0 flex relative z-10 items-center",
        className
      )}
    >
      {[text1Ref, text2Ref].map((ref, idx) => (
        <div
          key={idx}
          ref={ref}
          className="flex items-center space-x-4 sm:space-x-8 px-2 sm:px-4 shrink-0"
        >
          {words.map((word, i) => (
            <React.Fragment key={`${i}-${word}`}>
              <span
                className={cn(
                  "font-display text-[4vw] sm:text-[2vw] font-extrabold uppercase leading-[0.8] tracking-widest",
                  i % 3 === 0
                    ? "text-zinc-200"
                    : i % 3 === 1
                      ? "text-cyan-400"
                      : "text-amber-400"
                )}
              >
                {word}
              </span>
              <span className="text-[4vw] sm:text-[2vw] text-white/20 mx-2 sm:mx-4 -translate-y-[0.1em]">
                •
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}
