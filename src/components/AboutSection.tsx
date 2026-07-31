"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    });

    tl.from(".about-title", {
      opacity: 0,
      x: -50,
      duration: 1,
      ease: "power3.out"
    })
    .from(".about-text", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    }, "-=0.6")
    .from(".about-image", {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=0.8");

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen w-full flex flex-col justify-center px-6 md:px-20 py-32 bg-neutral-900 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="about-title text-4xl md:text-6xl font-bold uppercase mb-8">About Me</h2>
          <p className="about-text text-lg md:text-xl font-light opacity-80 mb-6 leading-relaxed">
            I am a senior creative developer specializing in WebGL, GSAP, and complex front-end architectures. 
            I focus on bridging the gap between design and engineering to build award-winning websites.
          </p>
          <p className="about-text text-lg md:text-xl font-light opacity-80 leading-relaxed">
            With a strong foundation in modern web technologies, I aim to push the boundaries of what is possible on the web.
          </p>
        </div>
        <div className="about-image aspect-square bg-neutral-800 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-neutral-600">
            [Profile Image]
          </div>
        </div>
      </div>
    </section>
  );
}
