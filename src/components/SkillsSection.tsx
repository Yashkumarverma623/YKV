"use client";

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const bodiesRef = useRef<any[]>([]);
  const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.25, // Soft bounce so capsules settle neatly into column stacks
    friction: 0.4,    // Keeps capsules from sliding sideways out of their category column
    frictionAir: 0.012,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6
  };

  const skills = [
    // 01 // LANGUAGES (Column 1: Far Left ~ 8%)
    { name: "Python", type: "language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript (ES2022+)", type: "language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "TypeScript", type: "language", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },

    // 02 // AI & LLM ENGINEERING (Column 2: Left-Center ~ 25%)
    { name: "LangChain", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/langchain.svg" },
    { name: "LangGraph", type: "ai", icon: "" },
    { name: "QLoRA", type: "ai", icon: "" },
    { name: "vLLM", type: "ai", icon: "" },
    { name: "MCP Protocol", type: "ai", icon: "" },
    { name: "Qdrant", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/qdrant.svg" },
    { name: "ChromaDB", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/chroma.svg" },
    { name: "Pinecone", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pinecone.svg" },
    { name: "RAG Pipelines", type: "ai", icon: "" },
    { name: "Prompt Engineering", type: "ai", icon: "" },
    { name: "Multi-Agent Systems", type: "ai", icon: "" },
    { name: "OpenAI API", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg" },
    { name: "Gemini API", type: "ai", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg" },
    { name: "LLM Evaluation (Ragas)", type: "ai", icon: "" },
    { name: "Cross-Encoder Reranking", type: "ai", icon: "" },
    { name: "Embeddings", type: "ai", icon: "" },

    // 03 // MACHINE LEARNING (Column 3: Center ~ 44%)
    { name: "PyTorch", type: "ml", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "TensorFlow", type: "ml", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Scikit-learn", type: "ml", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scikitlearn.svg" },
    { name: "Hugging Face Transformers", type: "ml", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huggingface.svg" },
    { name: "Pandas", type: "ml", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "NumPy", type: "ml", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
    { name: "CNNs", type: "ml", icon: "" },
    { name: "Model Fine-Tuning", type: "ml", icon: "" },

    // 04 // BACKEND & APIS (Column 4: Right-Center ~ 64%)
    { name: "Node.js", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "FastAPI", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "REST APIs", type: "backend", icon: "" },
    { name: "Microservices", type: "backend", icon: "" },
    { name: "API Gateway", type: "backend", icon: "" },
    { name: "Kafka", type: "backend", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/apachekafka.svg" },
    { name: "Redis", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "MySQL", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL/PostGIS", type: "backend", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },

    // 05 // FRONTEND & MOBILE (Column 5: Right ~ 81%)
    { name: "React", type: "framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", type: "framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "React Native", type: "framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Tailwind CSS", type: "framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Vite", type: "framework", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" },
    { name: "WebSocket", type: "framework", icon: "" },
    { name: "Monaco Editor", type: "framework", icon: "" },

    // 06 // DEVOPS & TOOLS (Column 6: Far Right ~ 93%)
    { name: "Docker", type: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", type: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "AWS (EC2/Lambda)", type: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "GCP", type: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
    { name: "GitHub Actions", type: "devops", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/githubactions.svg" },
    { name: "CI/CD", type: "devops", icon: "" },
    { name: "OpenTelemetry", type: "devops", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/opentelemetry.svg" },
    { name: "LangSmith", type: "devops", icon: "" },
    { name: "Sentry", type: "devops", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sentry.svg" },
    { name: "Vercel", type: "devops", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg" },
    { name: "Firebase", type: "devops", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    const engine = Matter.Engine.create();
    engine.gravity.x = config.gravity.x;
    engine.gravity.y = config.gravity.y;
    engineRef.current = engine;

    const wallThickness = config.wallThickness;

    const walls = [
      Matter.Bodies.rectangle(
        containerRect.width / 2,
        containerRect.height + wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        containerRect.width + wallThickness / 2,
        containerRect.height / 2,
        wallThickness,
        containerRect.height + wallThickness * 2,
        { isStatic: true }
      ),
    ];
    Matter.World.add(engine.world, walls);

    const categoryColumns: Record<string, { xPercent: number }> = {
      language: { xPercent: 0.08 },
      ai: { xPercent: 0.25 },
      ml: { xPercent: 0.44 },
      backend: { xPercent: 0.64 },
      framework: { xPercent: 0.81 },
      devops: { xPercent: 0.93 }
    };

    const categoryCounts: Record<string, number> = {
      language: 0,
      ai: 0,
      ml: 0,
      backend: 0,
      framework: 0,
      devops: 0
    };

    const objects = container.querySelectorAll('.matter-object');
    const bodies: any[] = [];

    objects.forEach((obj) => {
      const el = obj as HTMLElement;
      el.style.left = '0px';
      el.style.top = '0px';
      const objRect = el.getBoundingClientRect();
      const type = el.getAttribute('data-type') || 'backend';
      
      const col = categoryColumns[type] || { xPercent: 0.5 };
      const row = categoryCounts[type] || 0;
      categoryCounts[type] = row + 1;

      // Position drop X centered in category column lane
      const centerX = containerRect.width * col.xPercent;
      const targetX = Math.max(12, Math.min(containerRect.width - objRect.width - 12, centerX - objRect.width / 2));
      
      // Stagger drop heights above canvas so capsules fall in order into their column
      const startX = targetX + (Math.random() - 0.5) * 8;
      const startY = -120 - (row * 40);
      const startRotation = (Math.random() - 0.5) * 0.2;

      const body = Matter.Bodies.rectangle(
        startX + objRect.width / 2,
        startY + objRect.height / 2,
        objRect.width,
        objRect.height,
        {
          isStatic: false, // Falling active!
          restitution: config.restitution,
          friction: config.friction,
          frictionAir: config.frictionAir,
          density: config.density,
        }
      );

      Matter.Body.setAngle(body, startRotation);

      bodies.push({
        body: body,
        element: el,
        width: objRect.width,
        height: objRect.height,
      });

      Matter.World.add(engine.world, body);
    });

    bodiesRef.current = bodies;

    setTimeout(() => {
      const topWall = Matter.Bodies.rectangle(
        containerRect.width / 2,
        -wallThickness / 2,
        containerRect.width + wallThickness * 2,
        wallThickness,
        { isStatic: true }
      );
      Matter.World.add(engine.world, topWall);
    }, 4000);

    const mouse = Matter.Mouse.create(container);
    if (mouse.element) {
      // @ts-expect-error
      mouse.element.removeEventListener('mousewheel', mouse.mousewheel);
      // @ts-expect-error
      mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
    }

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: config.mouseStiffness,
        render: { visible: false },
      },
    });

    mouseConstraint.mouse.element.oncontextmenu = () => false;
    mouseConstraintRef.current = mouseConstraint;

    let dragging: Matter.Body | null = null;
    let originalInertia: number | null = null;

    Matter.Events.on(mouseConstraint, 'startdrag', function (event: any) {
      dragging = event.body;
      if (dragging) {
        originalInertia = dragging.inertia;
        Matter.Body.setInertia(dragging, Infinity);
        Matter.Body.setVelocity(dragging, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(dragging, 0);
      }
    });

    Matter.Events.on(mouseConstraint, 'enddrag', function () {
      if (dragging && originalInertia !== null) {
        Matter.Body.setInertia(dragging, originalInertia);
        dragging = null;
        originalInertia = null;
      }
    });

    Matter.Events.on(engine, 'beforeUpdate', function () {
      if (dragging) {
        const found = bodies.find((b) => b.body === dragging);
        if (found) {
          const minX = found.width / 2;
          const maxX = containerRect.width - found.width / 2;
          const minY = found.height / 2;
          const maxY = containerRect.height - found.height / 2;

          Matter.Body.setPosition(dragging, {
            x: Math.max(minX, Math.min(maxX, dragging.position.x)),
            y: Math.max(minY, Math.min(maxY, dragging.position.y)),
          });

          Matter.Body.setVelocity(dragging, {
            x: Math.max(-20, Math.min(20, dragging.velocity.x)),
            y: Math.max(-20, Math.min(20, dragging.velocity.y)),
          });
        }
      }
    });

    const handleMouseLeave = () => {
      if (mouseConstraint.constraint) {
        mouseConstraint.constraint.bodyB = null;
        // @ts-expect-error
        mouseConstraint.constraint.pointB = null;
      }
    };

    const handleMouseUp = () => {
      if (mouseConstraint.constraint) {
        mouseConstraint.constraint.bodyB = null;
        // @ts-expect-error
        mouseConstraint.constraint.pointB = null;
      }
    };

    container.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseup', handleMouseUp);

    Matter.World.add(engine.world, mouseConstraint);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    runnerRef.current = runner;

    let animationFrameId: number;
    function updatePositions() {
      bodies.forEach(({ body, element, width, height }) => {
        const x = Math.max(0, Math.min(containerRect.width - width, body.position.x - width / 2));
        const y = Math.max(-height * 3, Math.min(containerRect.height - height, body.position.y - height / 2));
        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
      });

      animationFrameId = requestAnimationFrame(updatePositions);
    }

    updatePositions();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseup', handleMouseUp);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [isVisible]);

  return (
    <div className="w-full font-sans bg-[#070708] z-[20] relative border-t border-b border-white/5">
      
      {/* High-tech sandbox styled section */}
      <section id="skills" className="relative w-full h-[92vh] bg-[#070708] text-white overflow-hidden z-[20] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(227,247,148,0.06),rgba(0,229,255,0.02),rgba(255,255,255,0))] bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]">
        
        {/* Border detailing */}
        <div className="absolute inset-x-8 top-8 bottom-8 border border-white/5 border-dashed pointer-events-none rounded-3xl z-[5]">
          <div className="absolute top-4 left-4 font-tech text-[10px] text-white/30 uppercase tracking-[0.2em]">PHYSICS ENGINE ACTIVE // CATEGORY COLUMN RAIN</div>
          <div className="absolute bottom-4 right-4 font-tech text-[10px] text-white/30 uppercase tracking-[0.2em]">GRAVITY: 1.0G // DRAG ENABLED</div>
        </div>

        <div ref={containerRef} className="absolute inset-0 cursor-crosshair z-10">
          {skills.map((skill, index) => (
            <div
              key={index}
              data-type={skill.type}
              className={`matter-object absolute w-max font-tech font-semibold rounded-full cursor-grab select-none pointer-events-auto z-10 active:cursor-grabbing flex items-center gap-2
                ${skill.type === 'language' 
                  ? 'bg-gold text-black border border-gold/30 shadow-[0_0_18px_rgba(255,215,0,0.25)] text-sm md:text-base px-4 py-2' 
                  : skill.type === 'ai' 
                    ? 'bg-cyan/90 text-black border border-cyan/30 shadow-[0_0_14px_rgba(0,229,255,0.2)] text-xs md:text-sm px-3.5 py-1.5' 
                    : skill.type === 'ml'
                      ? 'bg-cyan/20 text-cyan border border-cyan/30 text-xs md:text-sm px-3.5 py-1.5'
                      : 'bg-[#121214]/75 backdrop-blur-md border border-white/10 text-white/90 hover:border-white/20 text-xs md:text-sm px-3 py-1.5 transition-colors duration-200'}`}
            >
              {skill.icon && (
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  className={`object-contain transition-all ${skill.type === 'language' ? 'w-4 h-4 md:w-5 md:h-5' : 'w-3.5 h-3.5 md:w-4 md:h-4 opacity-80 group-hover:opacity-100'}`}
                  style={{ filter: skill.type === 'language' || skill.type === 'ai' ? 'none' : 'brightness(0.95)' }}
                />
              )}
              <p className={skill.type === 'language' ? 'font-bold' : ''}>{skill.name}</p>
            </div>
          ))}
        </div>

        {/* Backdrop text */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-8 pointer-events-none z-[2]">
          <h2 className="w-full md:w-8/12 text-center text-4xl md:text-7vw font-display font-extrabold uppercase tracking-tighter leading-none text-white/10 mix-blend-overlay">
            TECH PLAYGROUND
          </h2>
          <p className="font-tech text-xs text-white/30 tracking-[0.2em] uppercase mt-4 pointer-events-auto">
            Grab and toss any capsule to play with gravity
          </p>
        </div>
      </section>
    </div>
  );
}
