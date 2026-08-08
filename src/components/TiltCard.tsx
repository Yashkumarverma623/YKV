"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

gsap.registerPlugin(useGSAP);

interface TiltCardProps {
  children: React.ReactNode;
  maxTilt?: number;
  glareOpacity?: number;
  className?: string;
}

export default function TiltCard({
  children,
  maxTilt = 8,
  glareOpacity = 0.15,
  className,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useGSAP(
    () => {
      const card = cardRef.current;
      const glare = glareRef.current;
      if (!card || !glare || isTouchDevice) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;

        gsap.to(card, {
          rotateX,
          rotateY,
          duration: 0.5,
          ease: "power2.out",
        });

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        gsap.to(glare, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}) 0%, transparent 60%)`,
          duration: 0.1,
        });
      };

      const handleMouseEnter = () => {
        setIsHovered(true);
        gsap.to(glare, { opacity: 1, duration: 0.3 });
      };

      const handleMouseLeave = () => {
        setIsHovered(false);
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          ease: "elastic.out(1, 0.3)",
        });
        gsap.to(glare, { opacity: 0, duration: 0.3 });
      };

      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseenter", handleMouseEnter);
      card.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseenter", handleMouseEnter);
        card.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: cardRef, dependencies: [maxTilt, glareOpacity, isTouchDevice] }
  );

  return (
    <div
      className={cn("perspective-[1000px] w-full", className)}
      style={{ perspective: "1000px" }} // Safari fallback
    >
      <div
        ref={cardRef}
        className="relative w-full h-full transition-transform duration-75 ease-out rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
        
        {/* Glare effect */}
        {!isTouchDevice && (
          <div
            ref={glareRef}
            className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-opacity duration-300 opacity-0 mix-blend-overlay"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0) 0%, transparent 0%)",
            }}
          />
        )}
      </div>
    </div>
  );
}
