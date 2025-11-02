'use client'

import React, { useRef, useEffect, useState } from 'react';
import content from '@/data/content.json';

const Hero = () => {
  const v0Ref = useRef<HTMLVideoElement>(null);
  const v1Ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<0 | 1>(0);
  const crossfadingRef = useRef(false);

  useEffect(() => {
    const v0 = v0Ref.current;
    const v1 = v1Ref.current;
    if (!v0 || !v1) return;

    const setupPlay = (v: HTMLVideoElement) => {
      // Ensure autoplay on iOS
      v.muted = true;
      v.playsInline = true as any;
      v.play().catch(() => {/* ignore */});
    };

    const onMeta0 = () => setupPlay(v0);
    const onMeta1 = () => setupPlay(v1);

    v0.addEventListener('loadedmetadata', onMeta0);
    v1.addEventListener('loadedmetadata', onMeta1);

    // Start both, show v0
    setupPlay(v0);
    setupPlay(v1);
    v0.style.opacity = '1';
    v1.style.opacity = '0';

    const handleTimeUpdate = () => {
      const activeVid = active === 0 ? v0 : v1;
      const inactiveVid = active === 0 ? v1 : v0;
      if (!activeVid.duration || isNaN(activeVid.duration)) return;
      const timeLeft = activeVid.duration - activeVid.currentTime;
      if (timeLeft <= 2.05 && !crossfadingRef.current) {
        crossfadingRef.current = true;
        // Prepare the next video and crossfade
        try { inactiveVid.currentTime = 0; } catch {}
        setupPlay(inactiveVid);
        // trigger CSS transition
        inactiveVid.style.transition = 'opacity 2000ms ease-in-out';
        activeVid.style.transition = 'opacity 2000ms ease-in-out';
        inactiveVid.style.opacity = '1';
        activeVid.style.opacity = '0';
        // After crossfade, switch active
        setTimeout(() => {
          setActive(prev => (prev === 0 ? 1 : 0));
          crossfadingRef.current = false;
        }, 2050);
      }
    };

    const interval = setInterval(handleTimeUpdate, 200);
    return () => {
      clearInterval(interval);
      v0.removeEventListener('loadedmetadata', onMeta0);
      v1.removeEventListener('loadedmetadata', onMeta1);
    };
  }, [active]);

  const { hero } = content;

  return (
    <section id="hero" className="relative text-center py-6 md:py-40 px-4 w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video background with dual crossfade */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={v0Ref}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
          className="absolute inset-0 w-full h-full object-cover [transition:opacity_1000ms_ease-in-out]"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.optimized.mp4" type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <video
          ref={v1Ref}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/hero-poster.svg"
          className="absolute inset-0 w-full h-full object-cover [transition:opacity_1000ms_ease-in-out]"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/hero-video.optimized.mp4" type="video/mp4" />
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>
      
      {/* Main content on glass panel */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-2 sm:px-4">
        <div className="inline-block bg-white/20 dark:bg-black/20 backdrop-blur-md rounded-3xl px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12 shadow-xl border border-white/30 dark:border-gray-700/30">
          <div className="mb-6 inline-block opacity-0 animate-fade-in animation-delay-200 animation-fill-forwards">
            <div className="px-4 sm:px-6 py-2 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-sm text-xs sm:text-sm font-semibold text-brand-purple dark:text-brand-gold-light flex items-center gap-2 shadow-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.5"/>
              </svg>
              {hero.badge}
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 font-serif opacity-0 animate-fade-in animation-delay-400 animation-fill-forwards drop-shadow-2xl leading-none">
            <span className="gradient-text drop-shadow-lg">
              {hero.title}
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl max-w-3xl mx-auto mb-4 text-gray-800 dark:text-gray-100 leading-relaxed opacity-0 animate-fade-in animation-delay-600 animation-fill-forwards drop-shadow-md px-2">
            {hero.subtitle}
          </p>
          
          <p className="text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-12 text-gray-700 dark:text-gray-200 opacity-0 animate-fade-in animation-delay-800 animation-fill-forwards drop-shadow-md px-2">
            {hero.description} <span className="font-bold text-brand-gold drop-shadow-sm">{hero.descriptionHighlight}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in animation-delay-1000 animation-fill-forwards">
            <a href="#calendar" className="btn-primary shadow-2xl">
              <span>{hero.ctaPrimary}</span>
            </a>
            
            <a 
              href="#benefits" 
              className="px-8 py-4 font-semibold text-brand-purple dark:text-brand-gold-light rounded-full border-2 border-brand-purple dark:border-brand-gold hover:bg-brand-purple/10 dark:hover:bg-brand-gold/10 transition-all duration-300 bg-white/30 dark:bg-black/30 backdrop-blur-sm shadow-lg"
            >
              {hero.ctaSecondary}
            </a>
          </div>
          
          {/* Subtle info badges */}
          <div className="mt-8 sm:mt-16 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm opacity-0 animate-fade-in animation-delay-1200 animation-fill-forwards">
            {hero.badges.map((badge, idx) => (
              <div key={idx} className="bg-white/50 dark:bg-black/50 backdrop-blur-md px-3 sm:px-6 py-2 sm:py-3 rounded-full flex items-center gap-2 group hover:scale-105 transition-all duration-300 shadow-lg border border-white/30 dark:border-gray-700/30">
                <div className="transform transition-all duration-700 ease-out group-hover:rotate-[360deg]">
                  {idx === 0 && (
                    <svg className="w-5 h-5 text-brand-purple dark:text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <path d="M12 6 L12 12 L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                  {idx === 1 && (
                    <svg className="w-5 h-5 text-brand-purple dark:text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="16" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                      <circle cx="12" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    </svg>
                  )}
                  {idx === 2 && (
                    <svg className="w-5 h-5 text-brand-purple dark:text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2 L9 9 L2 10 L7 15 L6 22 L12 18 L18 22 L17 15 L22 10 L15 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.3"/>
                    </svg>
                  )}
                </div>
                <span className="text-gray-800 dark:text-gray-100 font-medium drop-shadow-sm">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
