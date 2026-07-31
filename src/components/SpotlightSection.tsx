"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const config = {
  speed: 0.32,
  arcRadius: 460,
};

const spotlightItems = [
  {
    name: "MCP + GraphRAG + CDC Platform",
    img: "/project-graphrag.png",
    href: "https://github.com/Yashkumarverma623",
    stack: "PostgreSQL · Debezium · Kafka · Neo4j · Qdrant · LangGraph · MCP",
    desc: "Real-time data ingestion pipeline (<15ms database capture latency) and hybrid GraphRAG search engine under 69ms."
  },
  {
    name: "Cortex AI",
    img: "/project-cortexai.png",
    href: "https://github.com/Yashkumarverma623",
    stack: "Node.js · React · LangGraph.js · Redis · MongoDB · Qdrant · Microservices",
    desc: "Production-grade multi-agent AI platform orchestrating 8 specialized agents via LangGraph.js supervisor."
  },
  {
    name: "CodeLens",
    img: "/project-codelens.png",
    href: "https://github.com/Yashkumarverma623",
    stack: "LangChain · LangGraph · ChromaDB · Gemini · Ragas · Cross-Encoder",
    desc: "Local retrieval-augmented generation system enabling natural-language Q&A over codebases with evaluation."
  },
  {
    name: "RAG Evaluation Tool",
    img: "/project-rageval.png",
    href: "https://github.com/Yashkumarverma623",
    stack: "Python · Ragas · DeepEval · TruLens · Plotly · LangChain",
    desc: "Standalone tool benchmarking RAG pipelines across Ragas, DeepEval, TruLens with an interactive dashboard."
  },
  { 
    name: "KrishiSetu", 
    img: "/project-krishisetu.png", 
    href: "https://github.com/Yashkumarverma623/KrishisetuV1-Compiled",
    stack: "TypeScript · React Native · TensorFlow",
    desc: "AI agri-advisory Expo app featuring crop disease detection, local weather advisories, and offline-first support."
  },
  { 
    name: "tweakcn-mcp", 
    img: "/project-tweakcn.png", 
    href: "https://github.com/Yashkumarverma623/tweakcn-mcp",
    stack: "TypeScript · MCP Protocol · Playwright",
    desc: "Published Model Context Protocol server for shadcn/ui to let AI coding agents create and inspect React UI components."
  },
  { 
    name: "Health Ed Pro", 
    img: "/project-healthedpro.png", 
    href: "https://health-ed-pro.netlify.app",
    stack: "MERN Stack · Gemini API · Netlify",
    desc: "Full-stack health education platform featuring Gemini API-driven learning personalization and code-splitted load speed."
  },
  { 
    name: "Skin Classifier", 
    img: "/project-skinclassifier.png", 
    href: "https://github.com/Yashkumarverma623/Skin-Disease-ML",
    stack: "Python · TensorFlow · Flask API",
    desc: "CNN image classifier for 23 skin disease categories using MobileNetV2 transfer learning, Flask backend API, and a drag-and-drop web UI."
  },
  { 
    name: "MoodieFoodie", 
    img: "/project-moodiefoodie.png", 
    href: "https://github.com/Yashkumarverma623/Moodie-Foodie",
    stack: "Python · Django · Scikit-Learn",
    desc: "Mood-based food recommendation app using logistic regression to optimize restaurant recommendations based on cost, rating, and distance."
  },
  { 
    name: "Carl Restaurant", 
    img: "/project-carlrestaurant.png", 
    href: "https://github.com/Yashkumarverma623/Carl-Restaurant",
    stack: "HTML5 · CSS3 · JS · Slick.js",
    desc: "Multi-page responsive restaurant website built for an Asian cuisine brand, including fully structured menus and sliding promotional banners."
  },
  { 
    name: "Beauty Storefront", 
    img: "/project-beautystorefront.png", 
    href: "https://github.com/Yashkumarverma623/Beauty-E-Commerce",
    stack: "HTML5 · CSS3 · JavaScript",
    desc: "Skincare storefront UI layout ('Glowing') featuring fluid product grids, responsive skincare templates, and promotional layouts."
  },
  { 
    name: "HealthEdpro v1", 
    img: "/project-healthedprov1.png", 
    href: "https://github.com/Yashkumarverma623/HealthEdpro",
    stack: "MERN Stack · JavaScript · MongoDB",
    desc: "Early full-stack iteration of Health Ed Pro, establishing the foundational database scheme and API route controllers."
  },
  { 
    name: "E-Commerce Page", 
    img: "/project-ecommerce.png", 
    href: "https://github.com/Yashkumarverma623/E-Commerce-Website",
    stack: "HTML5 · CSS3 · JavaScript",
    desc: "Clean static frontend template demonstrating e-commerce product listings, cart interactions, and checkout screen wireframes."
  },
  { 
    name: "Visual Portfolio", 
    img: "/project-visualportfolio.png", 
    href: "https://github.com/Yashkumarverma623/Portfolio-Website",
    stack: "HTML5 · CSS3 · JavaScript",
    desc: "An earlier portfolio revision serving as a visual resume, styling typography and grid overlays with custom animation classes."
  }
];

export default function SpotlightSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const titlesContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const spotlightHeaderRef = useRef<HTMLDivElement>(null);
  const titlesContainerElementRef = useRef<HTMLDivElement>(null);
  const introTextElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bgImgRef = useRef<HTMLDivElement>(null);
  const bgImgARef = useRef<HTMLImageElement>(null);
  const bgImgBRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Only run horizontal/bezier scroll animations on larger screens
    if (window.innerWidth < 768) return;

    if (
      !titlesContainerRef.current || 
      !imageContainerRef.current || 
      !spotlightHeaderRef.current || 
      !titlesContainerElementRef.current || 
      !bgImgRef.current || 
      !bgImgARef.current || 
      !bgImgBRef.current
    ) return;

    const titlesContainer = titlesContainerRef.current;
    const imageContainer = imageContainerRef.current;
    const spotlightHeader = spotlightHeaderRef.current;
    const titlesContainerElement = titlesContainerElementRef.current;
    const introTextElements = introTextElementsRef.current;
    const bgImgA = bgImgARef.current;
    const bgImgB = bgImgBRef.current;
    const imageElements: HTMLDivElement[] = [];
    
    let currentActiveIndex = 0;
    let isAActive = true;

    titlesContainer.innerHTML = '';
    imageContainer.innerHTML = '';

    spotlightItems.forEach((item, index) => {
      const anchorElement = document.createElement("a");
      anchorElement.href = item.href;
      anchorElement.target = "_blank";
      anchorElement.className = "block text-white opacity-0 transition-all duration-300 hover:text-accent hover:translate-x-2 cursor-pointer pointer-events-auto";
      anchorElement.style.willChange = "opacity, transform";
      
      const titleElement = document.createElement("h1");
      titleElement.textContent = item.name;
      titleElement.className = "text-5xl md:text-7xl font-display font-extrabold leading-none m-0 uppercase tracking-tighter";
      
      anchorElement.appendChild(titleElement);
      
      if (index === 0) anchorElement.style.opacity = "1";
      titlesContainer.appendChild(anchorElement);

      const imgWrapper = document.createElement("div");
      imgWrapper.className = "absolute w-[350px] h-[230px] z-[5] pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/10";
      imgWrapper.style.willChange = "transform";
      
      // Highlight glow on active floating card
      const glowDiv = document.createElement("div");
      glowDiv.className = "absolute inset-0 border border-accent/20 rounded-2xl glow-accent pointer-events-none";
      
      const imgElement = document.createElement("img");
      imgElement.src = item.img;
      imgElement.alt = "";
      imgElement.className = "w-full h-full object-cover";
      
      imgWrapper.appendChild(glowDiv);
      imgWrapper.appendChild(imgElement);
      imageContainer.appendChild(imgWrapper);
      imageElements.push(imgWrapper);
    });

    const anchorElements = titlesContainer.querySelectorAll("a");

    const containerWidth = window.innerWidth * 0.35;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 250;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t: number) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;
      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
      return { x, y };
    }

    // Initialize text inside dynamic panel
    const initialItem = spotlightItems[0];
    const stackEl = document.getElementById("spotlight-stack");
    const descTitleEl = document.getElementById("spotlight-desc-title");
    const descTextEl = document.getElementById("spotlight-desc-text");
    if (stackEl) stackEl.textContent = initialItem.stack;
    if (descTitleEl) descTitleEl.textContent = initialItem.name;
    if (descTextEl) descTextEl.textContent = initialItem.desc;

    imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));

    ScrollTrigger.create({
      trigger: spotlightRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 11}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1.2,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.15) {
          // Slide in Beneath & Beyond titles
          const animationProgress = progress / 0.15;
          const moveDistance = window.innerWidth * 0.5;

          if (introTextElements[0]) {
            gsap.set(introTextElements[0], { 
              x: -animationProgress * moveDistance,
              opacity: 1 - animationProgress * 0.5,
              letterSpacing: `${animationProgress * 4}vw`,
              filter: `blur(${animationProgress * 15}px)`
            });
          }
          if (introTextElements[1]) {
            gsap.set(introTextElements[1], { 
              x: animationProgress * moveDistance,
              opacity: 1 - animationProgress * 0.5,
              letterSpacing: `${animationProgress * 4}vw`,
              filter: `blur(${animationProgress * 15}px)`
            });
          }

          gsap.set(bgImgRef.current, { transform: `scale(${1 + (1 - animationProgress) * 0.2})` });
          gsap.set(titlesContainer, { transform: "translateY(100%)" });
          
          imageElements.forEach((img) => gsap.set(img, { opacity: 0 }));
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
        else if (progress > 0.15 && progress <= 0.95) {
          gsap.set(bgImgRef.current, { transform: "scale(1)" });

          if (introTextElements[0]) gsap.set(introTextElements[0], { opacity: 0 });
          if (introTextElements[1]) gsap.set(introTextElements[1], { opacity: 0 });

          spotlightHeader.style.opacity = "1";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0.1",
            "--after-opacity": "0.1",
          });

          const switchProgress = (progress - 0.18) / 0.72;
          const viewportHeight = window.innerHeight;
          const viewportMiddle = viewportHeight / 2;
          const titlesContainerHeight = titlesContainer.scrollHeight;
          const startPosition = viewportHeight * 0.6;
          const targetPosition = -titlesContainerHeight + viewportHeight * 0.4;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(titlesContainer, { transform: `translateY(${currentY}px)` });

          // Helper function declared inside onUpdate to sync image timings dynamically
          function getImageProgressState(index: number, overallProgress: number) {
            const anchor = anchorElements[index];
            if (!anchor) return -1;
            
            const titleRect = anchor.getBoundingClientRect();
            // offsetTop is relative to titlesContainer top
            const titleCenterY = (anchor as HTMLElement).offsetTop + titleRect.height / 2;
            
            // Calculate progress value where this title is in the vertical center of the viewport
            const centerProgress = (startPosition + titleCenterY - viewportMiddle) / totalDistance;
            
            const startTime = centerProgress - 0.5 * config.speed;
            const endTime = startTime + config.speed;

            if (overallProgress < startTime) return -1;
            if (overallProgress > endTime) return 2;

            return (overallProgress - startTime) / config.speed;
          }

          imageElements.forEach((img, index) => {
            const imageProgress = getImageProgressState(index, switchProgress);
            
            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              
              // Angle tilt based on position
              const tilt = (imageProgress - 0.5) * 25;
              
              gsap.set(img, {
                x: pos.x - 120,
                y: pos.y - 95,
                rotation: tilt,
                opacity: 1,
              });
            }
          });

          // Center detection logic
          let closestIndex = 0;
          let closestDistance = Infinity;

          anchorElements.forEach((anchor, index) => {
            const anchorRect = anchor.getBoundingClientRect();
            const anchorCenter = anchorRect.top + anchorRect.height / 2;
            const distanceFromCenter = Math.abs(anchorCenter - viewportMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });
          
          if (closestIndex !== currentActiveIndex) {
            // Un-highlight previous
            if (anchorElements[currentActiveIndex]) {
              (anchorElements[currentActiveIndex] as HTMLElement).style.opacity = "0.2";
            }
            // Highlight current
            if (anchorElements[closestIndex]) {
              (anchorElements[closestIndex] as HTMLElement).style.opacity = "1";
            }
            
            // Double Image Crossfader
            const item = spotlightItems[closestIndex];
            if (isAActive) {
              if (bgImgB) {
                bgImgB.src = item.img;
                gsap.to(bgImgB, { opacity: 1, duration: 0.6 });
              }
              if (bgImgA) gsap.to(bgImgA, { opacity: 0, duration: 0.6 });
            } else {
              if (bgImgA) {
                bgImgA.src = item.img;
                gsap.to(bgImgA, { opacity: 1, duration: 0.6 });
              }
              if (bgImgB) gsap.to(bgImgB, { opacity: 0, duration: 0.6 });
            }
            isAActive = !isAActive;

            // Dynamically update floating info panel
            const stackEl = document.getElementById("spotlight-stack");
            const descTitleEl = document.getElementById("spotlight-desc-title");
            const descTextEl = document.getElementById("spotlight-desc-text");
            if (stackEl) stackEl.textContent = item.stack;
            if (descTitleEl) descTitleEl.textContent = item.name;
            if (descTextEl) descTextEl.textContent = item.desc;

            // Small text change animation pop
            gsap.fromTo("#spotlight-desc-card", 
              { x: -10, opacity: 0.6 },
              { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
            );

            currentActiveIndex = closestIndex;
          }
        }
        else if (progress > 0.95) {
          spotlightHeader.style.opacity = "0";
          gsap.set(titlesContainerElement, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      },
    });
  }, { scope: sectionRef });

  return (
    <div id="spotlight" ref={sectionRef} className="bg-[#070708] text-white relative z-[20] overflow-hidden w-full border-b border-white/5">
      
      {/* 1. Mobile Layout: Scrollable Cards (Hidden on Desktop) */}
      <div className="md:hidden block px-6 py-24 bg-[#070708]">
        <div className="mb-12">
          <p className="font-tech text-accent uppercase tracking-[0.25em] text-xs mb-2">05 // CASE LOGS</p>
          <h2 className="text-4xl font-display font-extrabold uppercase tracking-tighter">Beneath & Beyond</h2>
          <div className="w-16 h-[2px] bg-accent mt-3"></div>
        </div>

        <div className="flex flex-col gap-10">
          {spotlightItems.map((item, index) => (
            <div 
              key={index} 
              className="glass-card p-5 rounded-2xl border border-white/5 flex flex-col gap-5"
            >
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-white/10">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute bottom-4 left-4 font-tech text-[10px] uppercase font-bold bg-black/50 text-accent border border-accent/30 px-3 py-1 rounded-full">
                  {item.stack.split(" · ")[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight text-white">{item.name}</h3>
                <span className="font-tech text-xs text-white/50">{item.stack}</span>
                <p className="font-sans text-sm text-white/70 leading-relaxed mt-1">{item.desc}</p>
              </div>
              {item.href && item.href !== "#" && (
                <a 
                  href={item.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full text-center py-2.5 bg-accent/10 hover:bg-accent text-accent hover:text-black font-tech text-xs font-bold uppercase tracking-wider rounded-lg border border-accent/20 transition-all mt-2"
                >
                  Visit Case Studies ↗
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Desktop Cinematic Pin Section (Hidden on Mobile) */}
      <div className="hidden md:block">
        <section className="intro relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#070708]">
          {/* Subtle bg mesh grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          <h1 className="text-[12vw] font-display font-extrabold leading-none text-white opacity-80 tracking-tighter uppercase select-none animate-pulse">
            The Lab<span className="text-accent">.</span>
          </h1>
        </section>

        <section ref={spotlightRef} className="spotlight relative w-full h-screen overflow-hidden bg-black">
          
          {/* Entry Titles Overlay */}
          <div className="spotlight-text-intro-wrapper absolute w-full top-1/2 transform -translate-y-1/2 flex gap-4 pointer-events-none z-[30]">
            <div 
              ref={el => { if (introTextElementsRef.current) introTextElementsRef.current[0] = el; }}
              className="spotlight-intro-text flex-1 relative flex justify-end"
              style={{ willChange: 'transform' }}
            >
              <p className="text-8xl font-display font-extrabold leading-relaxed text-white uppercase tracking-tighter drop-shadow-2xl">Beneath</p>
            </div>
            <div 
              ref={el => { if (introTextElementsRef.current) introTextElementsRef.current[1] = el; }}
              className="spotlight-intro-text flex-1 relative"
              style={{ willChange: 'transform' }}
            >
              <p className="text-8xl font-display font-extrabold leading-relaxed text-white uppercase tracking-tighter drop-shadow-2xl">Beyond</p>
            </div>
          </div>

          {/* Crossfading Background Image Layer */}
          <div 
            ref={bgImgRef}
            className="spotlight-bg-img absolute w-full h-full overflow-hidden"
            style={{ transform: 'scale(1.2)', willChange: 'transform' }}
          >
            <img 
              ref={bgImgARef}
              src="/img-1.png" 
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-opacity"
              style={{ willChange: 'opacity' }}
            />
            <img 
              ref={bgImgBRef}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity"
              style={{ willChange: 'opacity' }}
            />
            <div className="absolute inset-0 bg-[#070708]/75 z-[1]"></div>
          </div>

          {/* Scrolling Titles List */}
          <div 
            ref={titlesContainerElementRef}
            className="spotlight-titles-container absolute top-0 left-[20vw] w-full h-full overflow-hidden z-[20] pointer-events-none"
            style={{
              clipPath: 'polygon(50vh 0px, 0px 50%, 50vh 100%, 100% calc(100% + 100vh), 100% -100vh)',
              '--before-opacity': '0',
              '--after-opacity': '0'
            } as React.CSSProperties}
          >
            <div 
              className="absolute w-[100vh] h-[1.5px] bg-white transition-opacity duration-300 z-10 top-0 left-0"
              style={{
                transform: 'rotate(-45deg) translate(-7rem)',
                opacity: 'var(--before-opacity)'
              }}
            />
            <div 
              className="absolute w-[100vh] h-[1.5px] bg-white transition-opacity duration-300 z-10 bottom-0 left-0"
              style={{
                transform: 'rotate(45deg) translate(-7rem)',
                opacity: 'var(--after-opacity)'
              }}
            />
            <div 
              ref={titlesContainerRef}
              className="spotlight-titles relative left-[15%] w-[60%] h-full flex flex-col gap-24 z-[20] pointer-events-auto justify-start"
              style={{ transform: 'translateY(100%)' }}
            />
          </div>

          {/* Trajectory Images Canvas */}
          <div 
            ref={imageContainerRef}
            className="spotlight-images absolute top-0 right-0 w-1/2 min-w-[300px] h-full z-[10] pointer-events-none"
          />

          {/* Dynamic Details Case Panel */}
          <div 
            ref={spotlightHeaderRef}
            className="spotlight-header absolute top-[22%] left-[6%] w-[24rem] z-[25] transition-opacity duration-500 pointer-events-none flex flex-col gap-6"
            style={{ opacity: '0' }}
          >
            <p className="font-tech text-accent uppercase tracking-[0.3em] text-xs font-semibold">05 // BENEATH & BEYOND</p>
            <div 
              id="spotlight-desc-card" 
              className="glass-card p-8 rounded-3xl border border-white/5 shadow-2xl flex flex-col gap-4 backdrop-blur-lg"
            >
              <span id="spotlight-stack" className="font-tech text-xs text-white/50 uppercase tracking-widest leading-relaxed"></span>
              <h3 id="spotlight-desc-title" className="font-display font-extrabold text-2xl text-white uppercase tracking-tight"></h3>
              <p id="spotlight-desc-text" className="font-sans text-sm text-white/70 leading-relaxed font-light"></p>
              <div className="w-12 h-[2px] bg-accent/60 mt-2"></div>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  );
}
