'use client'

import React, { useState } from 'react';
import content from '@/data/content.json';

interface CalendarProps {
  setSelectedTerm: (term: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ setSelectedTerm }) => {
  const { calendar } = content;
  const [selectedLocation, setSelectedLocation] = useState('Katowice');

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTerm(e.target.value);
  };

  return (
    <section id="calendar" className="py-20 md:py-32 w-full max-w-5xl mx-auto px-4">
      <div className="glass-panel p-12 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
            <span className="gradient-text">{calendar.title}</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {calendar.subtitle}
          </p>
        </div>
        
        {/* Location radio buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {Object.keys(calendar.locations).map(loc => (
            <label
              key={loc}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                selectedLocation === loc 
                  ? 'bg-gradient-to-r from-brand-purple to-brand-gold text-white shadow-glow-gold scale-105' 
                  : 'bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30'
              }`}
            >
              <input
                type="radio"
                name="location"
                value={loc}
                checked={selectedLocation === loc}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="sr-only"
              />
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
              </svg>
              {loc}
            </label>
          ))}
        </div>
        
        {/* Dates display */}
        <div className="space-y-4 max-w-2xl mx-auto">
          {calendar.locations[selectedLocation as keyof typeof calendar.locations].map(date => {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('pl-PL', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });
            
            return (
              <label 
                key={date} 
                className="flex items-center gap-4 p-6 rounded-xl bg-white/30 dark:bg-black/20 hover:bg-white/50 dark:hover:bg-black/30 cursor-pointer transition-all duration-300 group"
              >
                <input
                  type="radio"
                  name="termin"
                  value={`${selectedLocation}, ${formattedDate}`}
                  onChange={handleTermChange}
                  className="w-5 h-5 accent-brand-purple"
                />
                <div className="flex-1">
                  <p className="text-lg font-semibold text-brand-purple dark:text-brand-gold-light group-hover:scale-105 transition-transform">
                    {formattedDate}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedLocation}
                  </p>
                </div>
                <div className="text-2xl transform transition-all duration-700 ease-out group-hover:rotate-[360deg]">
                  <svg className="w-6 h-6 text-brand-purple dark:text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" opacity="0.5"/>
                  </svg>
                </div>
              </label>
            );
          })}
        </div>
        
        {/* Info notice */}
        <div className="mt-12 text-center flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M12 8 L12 12 L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {calendar.infoNote}
          </p>
        </div>

        {/* Price disclaimer */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M12 8 L12 12 M12 16 L12 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>Informacja o cenach:</strong> Ceny w poszczególnych miastach i terminach mogą się różnić. Dokładną informację o opłacie za udział w wybranej miejscowości otrzymasz w wiadomości zwrotnej od nas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
