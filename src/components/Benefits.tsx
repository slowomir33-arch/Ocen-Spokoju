'use client'

import React from 'react';
import content from '@/data/content.json';

const benefitIcons = [
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
        <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
        <path d="M32 8 L32 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M32 48 L32 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 32 L16 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M48 32 L56 32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8 C24 8, 16 12, 16 20 C16 28, 20 32, 24 36 L32 44 L40 36 C44 32, 48 28, 48 20 C48 12, 40 8, 32 8" stroke="currentColor" strokeWidth="2" fill="none"/>
        <path d="M26 20 C26 16, 28 14, 32 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <path d="M20 28 L28 36 L32 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path d="M44 28 L36 36 L32 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <ellipse cx="32" cy="50" rx="12" ry="3" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 8 L28 18 L18 20 L25 28 L23 38 L32 33 L41 38 L39 28 L46 20 L36 18 Z" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="32" cy="26" r="8" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
        <circle cx="32" cy="26" r="4" fill="currentColor" opacity="0.6"/>
        <path d="M20 48 Q26 44, 32 44 Q38 44, 44 48" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
        <path d="M16 54 Q24 50, 32 50 Q40 50, 48 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2"/>
      </svg>
    ),
  },
  {
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 10 L35 22 L47 25 L35 28 L32 40 L29 28 L17 25 L29 22 Z" fill="currentColor" opacity="0.3"/>
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none" opacity="0.5"/>
        <path d="M32 16 L32 48 M16 32 L48 32" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
        <circle cx="32" cy="16" r="3" fill="currentColor"/>
        <circle cx="32" cy="48" r="3" fill="currentColor"/>
        <circle cx="16" cy="32" r="3" fill="currentColor"/>
        <circle cx="48" cy="32" r="3" fill="currentColor"/>
        <path d="M22 22 L42 42 M42 22 L22 42" stroke="currentColor" strokeWidth="1.5" opacity="0.4"/>
      </svg>
    ),
  },
];

const Benefits = () => {
  const { benefits } = content;
  
  return (
    <section id="benefits" className="py-20 md:py-32 w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-16 animate-fade-in">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
          <span className="gradient-text">{benefits.title}</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {benefits.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.items.map((benefit, index) => {
          const delays = ['animation-delay-200','animation-delay-400','animation-delay-600','animation-delay-800','animation-delay-1000','animation-delay-1200'];
          const delayClass = delays[index % delays.length];
          return (
          <div 
            key={index} 
            className={`glass-panel p-8 text-center group hover:scale-105 transition-all duration-300 animate-slide-up ${delayClass}`}
          >
            <div className="mb-4 transform transition-all duration-700 ease-out text-brand-purple dark:text-brand-gold group-hover:rotate-[360deg] inline-block">
              {benefitIcons[index].icon}
            </div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">
              {benefit.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {benefit.description}
            </p>
          </div>
        )})}
      </div>
      
      {/* Additional elegant separator */}
      <div className="mt-20 flex justify-center">
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default Benefits;
