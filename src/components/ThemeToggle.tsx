'use client'

import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Sprawdź zapisany motyw w localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <button
      onClick={toggleTheme}
      className="hidden md:flex fixed top-6 right-6 z-50 p-3 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-gray-700/40 shadow-lg hover:scale-110 transition-all duration-300 group"
      aria-label="Przełącz motyw"
    >
      <div className="relative w-8 h-8">
        {/* Sparkles effect */}
        {isAnimating && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-gold rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-brand-purple rounded-full animate-ping animation-delay-200 opacity-75"></div>
            <div className="absolute top-0 -left-2 w-1.5 h-1.5 bg-brand-amethyst rounded-full animate-ping animation-delay-400 opacity-75"></div>
            <div className="absolute -bottom-2 right-0 w-1.5 h-1.5 bg-brand-gold-light rounded-full animate-ping animation-delay-600 opacity-75"></div>
          </>
        )}
        
        {/* Sun icon (light mode) */}
        <svg 
          className={`absolute inset-0 w-8 h-8 text-brand-gold transition-all duration-500 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" className="animate-pulse"/>
      <path d="M12 2 L12 6 M12 18 L12 22 M22 12 L18 12 M6 12 L2 12" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="group-hover:animate-spin origin-center"/>
          <path d="M18.364 5.636 L15.536 8.464 M8.464 15.536 L5.636 18.364 M18.364 18.364 L15.536 15.536 M8.464 8.464 L5.636 5.636" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
                className="opacity-70"/>
        </svg>

        {/* Moon icon (dark mode) */}
        <svg 
          className={`absolute inset-0 w-8 h-8 text-brand-purple dark:text-brand-gold transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" 
                fill="currentColor"
                className="group-hover:animate-pulse"/>
          <circle cx="17" cy="8" r="1" fill="currentColor" className="animate-pulse animation-delay-200"/>
          <circle cx="14" cy="6" r="0.5" fill="currentColor" className="animate-pulse animation-delay-400"/>
          <circle cx="19" cy="11" r="0.5" fill="currentColor" className="animate-pulse animation-delay-600"/>
        </svg>

        {/* Magical sparkle trails */}
        <div className={`absolute inset-0 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-brand-gold rounded-full animate-ping"></div>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
