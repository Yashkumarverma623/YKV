"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTIONS = [
  { id: "about", label: "01", name: "About" },
  { id: "skills", label: "02", name: "Skills" },
  { id: "experience", label: "03", name: "Experience" },
  { id: "spotlight", label: "04", name: "Spotlight" },
  { id: "work", label: "05", name: "Work" },
  { id: "education", label: "06", name: "Education" },
  { id: "contact", label: "07", name: "Contact" }
];

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(navRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 5.5
    });

    const triggers: ScrollTrigger[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveSection(id);
            }
          }
        });
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={navRef} className="fixed left-6 top-1/2 -translate-y-1/2 z-[40] hidden lg:flex flex-col gap-4 pointer-events-none mix-blend-difference">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`group flex items-center justify-start gap-3 pointer-events-auto transition-all duration-300 ${
            activeSection === section.id ? "opacity-100" : "opacity-30 hover:opacity-100"
          }`}
        >
          <div 
            className={`h-1.5 transition-all duration-500 rounded-full ${
              activeSection === section.id ? "w-8 bg-accent" : "w-1.5 bg-white group-hover:bg-accent group-hover:w-4"
            }`}
          />
          <span className="font-tech text-[10px] tracking-widest uppercase text-white transition-transform duration-300 group-hover:translate-x-2">
            {section.name}
          </span>
        </a>
      ))}
    </div>
  );
}
