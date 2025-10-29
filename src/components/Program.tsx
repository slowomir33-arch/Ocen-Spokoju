'use client'

import React from 'react';
import content from '@/data/content.json';

const programIcons = [
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" fill="none" opacity="0.3"/>
        <path d="M32 20 Q40 24, 40 32 Q40 40, 32 44 Q24 40, 24 32 Q24 24, 32 20" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M28 32 L32 28 L36 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <path d="M28 36 L32 40 L36 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
        <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.5"/>
      </svg>
    ),
    title: 'Oddech',
    description: 'Nauka świadomego oddychania dla głębokiej relaksacji i ugruntowania.',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
        <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M32 8 L32 24 M32 40 L32 56 M8 32 L24 32 M40 32 L56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.6"/>
      </svg>
    ),
    title: 'Praca z Polami Energii',
    description: 'Nowoczesne techniki psychologiczne do harmonizacji Twojej energii.',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 32 Q24 20, 32 20 Q40 20, 44 32 Q40 44, 32 44 Q24 44, 20 32" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M16 24 Q20 16, 28 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M48 24 Q44 16, 36 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M16 40 Q20 48, 28 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <path d="M48 40 Q44 48, 36 52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        <circle cx="32" cy="32" r="3" fill="currentColor"/>
      </svg>
    ),
    title: 'Kąpiel w Dźwiękach',
    description: 'Zanurzenie w uzdrawiających wibracjach mis tybetańskich i gongów.',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 12 L32 52" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 20 L44 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <path d="M16 28 L48 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M16 36 L48 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        <path d="M20 44 L44 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
        <circle cx="32" cy="20" r="2" fill="currentColor"/>
        <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="36" r="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="44" r="2" fill="currentColor"/>
      </svg>
    ),
  },
];

const Program = () => {
  const { program } = content;
  
  return (
    <section id="program" className="relative py-20 md:py-32 w-full px-4 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          preload="metadata"
          poster="/forest-poster.svg"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src="/relaxing-forest.webm" type="video/webm" />
          <source src="/relaxing-forest.optimized.mp4" type="video/mp4" />
          <source src="/relaxing-forest.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/40 dark:bg-black/40 backdrop-blur-md rounded-3xl px-8 py-6 shadow-xl border border-white/40 dark:border-gray-700/40 hover:bg-white/60 dark:hover:bg-white/25 hover:scale-105 transition-all duration-300 group">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 font-serif drop-shadow-lg">
              <span className="gradient-text">{program.title}</span>
            </h2>
            <p className="text-lg text-gray-900 dark:text-gray-50 drop-shadow-md font-medium">
              {program.subtitle}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {program.items.map((item, index) => (
            <div 
              key={index} 
              className="bg-white/35 dark:bg-black/35 backdrop-blur-md rounded-2xl px-6 py-6 shadow-xl border border-white/40 dark:border-gray-700/40 hover:bg-white/60 dark:hover:bg-white/25 hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-brand-purple dark:text-brand-gold transform transition-all duration-700 ease-out group-hover:rotate-[360deg]">
                  {programIcons[index].icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-brand-purple dark:text-brand-gold-light drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-gray-900 dark:text-gray-50 drop-shadow-sm font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pricing and details section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {program.details.map((detail, index) => (
            <div key={index} className="bg-white/35 dark:bg-black/35 backdrop-blur-md rounded-2xl px-6 py-8 shadow-xl border border-white/40 dark:border-gray-700/40 hover:bg-white/60 dark:hover:bg-white/25 group hover:scale-105 transition-all duration-300">
              <div className="text-4xl mb-2 inline-block transform transition-all duration-700 ease-out group-hover:rotate-[360deg]">
                {index === 0 && (
                  <svg className="w-12 h-12 mx-auto text-brand-purple dark:text-brand-gold" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M32 16 L32 32 L44 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="32" cy="32" r="3" fill="currentColor"/>
                  </svg>
                )}
                {index === 1 && (
                  <svg className="w-12 h-12 mx-auto text-brand-purple dark:text-brand-gold" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="44" cy="20" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="44" r="8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M24 24 L28 40" stroke="currentColor" strokeWidth="2"/>
                    <path d="M40 24 L36 40" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
                {index === 2 && (
                  <svg className="w-12 h-12 mx-auto text-brand-purple dark:text-brand-gold" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 8 L28 18 L18 20 L25 28 L23 38 L32 33 L41 38 L39 28 L46 20 L36 18 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="32" cy="26" r="6" fill="currentColor" opacity="0.3"/>
                  </svg>
                )}
              </div>
              <p className="text-sm text-gray-900 dark:text-gray-50 mb-1 drop-shadow-sm font-medium">{detail.label}</p>
              <p className="text-2xl font-bold gradient-text drop-shadow-md">{detail.value}</p>
              {detail.sublabel && (
                <p className="text-xs text-gray-900 dark:text-gray-50 mt-1 drop-shadow-sm font-medium">{detail.sublabel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Program;
