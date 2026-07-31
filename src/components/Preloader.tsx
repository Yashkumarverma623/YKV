"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const hopEase = "power4.inOut";

    const chars = document.querySelectorAll('.preloader-header .char');
    const lines = document.querySelectorAll('.preloader-copy .line');
    
    chars.forEach((char, index) => {
      gsap.set(char, { yPercent: index % 2 === 0 ? -100 : 100 });
    });

    gsap.set(lines, { yPercent: 100 });

    // Set initial positions for hero subtitles and role text
    gsap.set('.hero .hero-sub', { y: 20, opacity: 0 });
    gsap.set('.hero .hero-role-text', { yPercent: 50, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.25 });

    tl.to('.progress-bar', {
      scaleX: 1,
      duration: 4,
      ease: 'power3.inOut'
    })
    .set('.progress-bar', { transformOrigin: 'right' })
    .to('.progress-bar', {
      scaleX: 0,
      duration: 1,
      ease: 'power3.in'
    });

    const images = document.querySelectorAll('.preloader-images .img');
    const imagesInner = document.querySelectorAll('.preloader-images .img img');

    images.forEach((img, index) => {
      tl.to(
        img,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1,
          ease: hopEase,
          delay: index * 0.75
        },
        '-=5'
      );
    });

    imagesInner.forEach((img, index) => {
      tl.to(
        img,
        {
          scale: 1,
          duration: 1.5,
          ease: hopEase,
          delay: index * 0.75
        },
        '-=5.25'
      );
    });

    tl.to(
      lines,
      {
        yPercent: 0,
        duration: 2,
        ease: hopEase,
        stagger: 0.1
      },
      '-=5.5'
    );

    tl.to(
      chars,
      {
        yPercent: 0,
        duration: 1,
        ease: hopEase,
        stagger: 0.025
      },
      '-=5'
    );

    tl.to(
      '.preloader-images',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1,
        ease: hopEase
      },
      '-=1.5'
    );

    tl.to(
      lines,
      {
        y: '-125%',
        duration: 2,
        ease: hopEase,
        stagger: 0.1
      },
      '-=2'
    );

    tl.to(
      chars,
      {
        yPercent: (index) => {
          if (index === 0 || index === chars.length - 1) {
            return 0;
          }
          return index % 2 === 0 ? 100 : -100;
        },
        duration: 1,
        ease: hopEase,
        stagger: 0.025,
        delay: 0.5,
        onStart: () => {
          if (chars.length > 0) {
            const initialChar = chars[0];
            const lastChar = chars[chars.length - 1];

            chars.forEach((char, index) => {
              if (index !== 0 && index !== chars.length - 1) {
                gsap.set(char, { opacity: 0 });
              }
            });

            const spaceIndex = 4;
            if (chars[spaceIndex]) {
              gsap.set(chars[spaceIndex], { opacity: 0 });
            }

            const viewportWidth = window.innerWidth;
            const centerX = viewportWidth / 2;
            const initialCharRect = initialChar.getBoundingClientRect();
            const lastCharRect = lastChar.getBoundingClientRect();

            gsap.to([initialChar, lastChar], {
              duration: 1,
              ease: hopEase,
              delay: 0.5,
              x: (i) => {
                if (i === 0) {
                  return centerX - initialCharRect.left - initialCharRect.width;
                } else {
                  return centerX - lastCharRect.left;
                }
              },
              onComplete: () => {
                gsap.set('.preloader-header', { mixBlendMode: 'difference' });
                gsap.to('.preloader-header', {
                  y: '2rem',
                  scale: 0.35,
                  duration: 1.75,
                  ease: hopEase
                });
              }
            });
          }
        }
      },
      '-=2.5'
    );

    tl.to(
      '.preloader',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 1.75,
        ease: hopEase,
      },
      '-=0.5'
    );
    
    // Animate the hero section header lines after preloader finishes
    tl.to(
      '.hero .header-line',
      {
        yPercent: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1
      },
      '-=0.75'
    );

    tl.to(
      '.hero .divider',
      {
        scaleX: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.1
      },
      '<'
    );

    // Stagger subtitle fade-in
    tl.to(
      '.hero .hero-sub',
      {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15
      },
      '-=0.5'
    );

    // Reveal role rotator
    tl.to(
      '.hero .hero-role-text',
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.6,
        ease: 'power3.out'
      },
      '-=0.4'
    );

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div className="preloader fixed top-0 left-0 w-full h-[100dvh] bg-black overflow-hidden z-[100]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
        <div className="progress-bar absolute top-0 left-0 w-full h-[7px] bg-white origin-left scale-x-0" />

        <div className="preloader-images absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[55rem] md:w-[25rem] md:h-[25rem] md:top-[35%]" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
          <div className="img absolute w-full h-full overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
            <img src="/img-1.png" alt="" className="w-full h-full object-cover scale-[2]" />
          </div>
          <div className="img absolute w-full h-full overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
            <img src="/img-2.jpg" alt="" className="w-full h-full object-cover scale-[2]" />
          </div>
          <div className="img absolute w-full h-full overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
            <img src="/img-3.jpg" alt="" className="w-full h-full object-cover scale-[2]" />
          </div>
          <div className="img absolute w-full h-full overflow-hidden" style={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}>
            <img src="/img-4.jpg" alt="" className="w-full h-full object-cover scale-[2]" />
          </div>
        </div>

        <div className="preloader-copy absolute bottom-20 left-1/2 -translate-x-1/2 w-[40%] md:w-[85%] text-white overflow-hidden">
          <p className="uppercase text-center text-base md:text-sm font-semibold leading-relaxed">
            <span className="line inline-block">A visual storyteller crafting immersive digital</span>
            <br />
            <span className="line inline-block">experiences through captivating web design</span>
            <br />
            <span className="line inline-block">and development.</span>
          </p>
        </div>
      </div>

      <div className="preloader-header fixed w-full flex justify-center items-center z-[110] translate-y-[60vh] md:translate-y-[50vh] pointer-events-none" style={{ transformOrigin: 'top' }}>
        <h1 className="text-white uppercase text-[10rem] md:text-[5rem] font-semibold leading-[0.9] block m-0">
          {'Yash Verma'.split('').map((char, i) => (
            <span key={i} className="char inline-block" style={{ display: char === ' ' ? 'inline' : 'inline-block'}}>{char === ' ' ? '\u00A0' : char}</span>
          ))}
        </h1>
      </div>
    </>
  );
}
