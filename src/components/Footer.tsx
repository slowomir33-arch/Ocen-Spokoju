'use client'

import React from 'react';
import content from '@/data/content.json';

const Footer = () => {
  const { footer } = content;
  
  return (
    <footer className="w-full py-16 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="glass-panel p-12 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Brand section */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold gradient-text mb-4">Ocean Spokoju</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {footer.tagline}
              </p>
            </div>
            
            {/* Quick links */}
            <div className="text-center">
              <h4 className="font-bold text-lg mb-4 text-brand-purple dark:text-brand-gold-light">Szybkie Linki</h4>
              <ul className="space-y-2">
                {footer.links.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-600 dark:text-gray-400 hover:text-brand-gold transition-colors">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact info */}
            <div className="text-center md:text-right">
              <h4 className="font-bold text-lg mb-4 text-brand-purple dark:text-brand-gold-light">Lokalizacje</h4>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {footer.cities.map((city, index) => (
                  <li key={index} className="flex items-center justify-center md:justify-end gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                    </svg>
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent my-8"></div>
          
          {/* Bottom section */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              {footer.copyright}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
              Stworzone z 
              <svg className="w-4 h-4 text-brand-gold" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21 C12 21, 3 14, 3 8 C3 5, 5 3, 7 3 C9 3, 11 4, 12 6 C13 4, 15 3, 17 3 C19 3, 21 5, 21 8 C21 14, 12 21, 12 21Z"/>
              </svg>
              dla Twojej duszy
            </p>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="text-center">
          <a href="#calendar" className="inline-block btn-primary">
            <span>Zarezerwuj Teraz</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
