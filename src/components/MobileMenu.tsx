'use client'

import React, { useState, useEffect } from 'react';
import content from '@/data/content.json';

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Stopniowo pokazuj menu po 100px scrollowania
      const opacity = Math.min(currentScrollY / 200, 1);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // Zablokuj scrollowanie gdy menu otwarte
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // offset for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { label: 'Start', href: '#hero' },
    { label: 'Korzyści', href: '#benefits' },
    { label: 'Program', href: '#program' },
    { label: 'Opinie', href: '#testimonials' },
    { label: 'Kalendarz', href: '#calendar' },
    { label: 'Kontakt', href: '#contact' },
  ];

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      {/* Hamburger Button - Floating with scroll fade-in */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ opacity: scrollOpacity }}
        className={`fixed top-6 right-6 z-50 md:hidden glass-panel p-4 rounded-2xl transition-all duration-300 shadow-lg ${
          scrollOpacity === 0 ? 'pointer-events-none' : ''
        }`}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block h-0.5 w-full bg-gray-800 dark:bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </div>
      </button>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Menu Panel */}
      <nav
        className={`fixed top-20 right-4 left-4 z-40 md:hidden glass-panel rounded-3xl transition-all duration-500 max-w-sm mx-auto ${
          isOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="p-6">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                className={`transform transition-all duration-500 ${
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className="block py-3 px-6 rounded-xl text-lg font-semibold text-gray-800 dark:text-white hover:bg-brand-purple/10 dark:hover:bg-brand-gold/10 hover:text-brand-purple dark:hover:text-brand-gold transition-all duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={toggleTheme}
              className="w-full py-3 px-6 rounded-xl text-base font-semibold text-gray-800 dark:text-white bg-white/40 dark:bg-black/40 hover:bg-brand-purple/10 dark:hover:bg-brand-gold/10 transition-all duration-300 flex items-center justify-center gap-3"
              aria-label="Toggle theme"
            >
              <svg className="w-5 h-5 dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
              <svg className="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="dark:hidden">Tryb ciemny</span>
              <span className="hidden dark:inline">Tryb jasny</span>
            </button>
          </div>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              {content.footer.tagline}
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
