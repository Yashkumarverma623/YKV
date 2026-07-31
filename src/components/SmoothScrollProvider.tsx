"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const updateTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Add Lenis to GSAP's ticker
    gsap.ticker.add(updateTick);

    // Disable GSAP lag smoothing to prevent jitter
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
