'use client'

import React, { useState, useEffect } from 'react';
import content from '@/data/content.json';

interface ContactFormProps {
  selectedTerm: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ selectedTerm }) => {
  const { contact, calendar } = content;
  const [contactReason, setContactReason] = useState<'reservation' | 'other' | ''>(selectedTerm ? 'reservation' : '');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(selectedTerm || '');
  
  // Update form when selectedTerm changes from calendar
  useEffect(() => {
    if (selectedTerm) {
      setContactReason('reservation');
      setSelectedDate(selectedTerm);
    }
  }, [selectedTerm]);
  
  return (
    <section id="contact" className="py-20 md:py-32 w-full max-w-3xl mx-auto px-4">
      <div className="glass-panel p-12 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            <span className="gradient-text">{contact.title}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {contact.subtitle}
          </p>
        </div>
        
        <form name="contact" method="POST" data-netlify="true" className="space-y-6">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="group">
            <label htmlFor="name" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {contact.fields.name} *
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required
              className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/30 border-2 border-transparent focus:border-brand-gold dark:focus:border-brand-gold outline-none transition-all duration-300 placeholder-gray-400"
              placeholder={contact.placeholders.name}
            />
          </div>
          
          <div className="group">
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {contact.fields.email} *
            </label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              required
              className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/30 border-2 border-transparent focus:border-brand-gold dark:focus:border-brand-gold outline-none transition-all duration-300 placeholder-gray-400"
              placeholder={contact.placeholders.email}
            />
          </div>
          
          {/* Contact reason - always visible */}
          <div className="group">
            <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300">
              Kontaktuję się w sprawie: *
            </label>
            <div className="space-y-3">
              {/* Rezerwacja option */}
              <div>
                <label 
                  onClick={(e) => {
                    // If already selected and date is chosen, reset to allow re-selection
                    if (contactReason === 'reservation' && selectedDate) {
                      e.preventDefault();
                      setSelectedCity('');
                      setSelectedDate('');
                    }
                  }}
                  className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    contactReason === 'reservation' 
                      ? 'bg-brand-purple/10 border-brand-purple dark:bg-brand-gold/10 dark:border-brand-gold' 
                      : 'bg-white/30 dark:bg-black/20 border-transparent hover:border-brand-gold'
                  }`}>
                  <input 
                    type="radio" 
                    name="contactReason" 
                    value="reservation"
                    checked={contactReason === 'reservation'}
                    onChange={(e) => {
                      setContactReason('reservation');
                    }}
                    className="w-5 h-5 accent-brand-purple mr-3"
                    required
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedDate ? `Rezerwacji udziału w wydarzeniu ${selectedDate}` : 'Rezerwacji udziału w wydarzeniu'}
                  </span>
                </label>

                {/* Show cities when reservation selected but no date chosen yet */}
                {contactReason === 'reservation' && !selectedCity && (
                  <div className="mt-3 ml-8 space-y-2">
                    {Object.keys(calendar.locations).map((city) => (
                      <label 
                        key={city}
                        className="flex items-center p-3 rounded-lg bg-white/40 dark:bg-black/30 border border-gray-200 dark:border-gray-700 hover:border-brand-gold cursor-pointer transition-all duration-300"
                      >
                        <input 
                          type="radio" 
                          name="city" 
                          value={city}
                          checked={selectedCity === city}
                          onChange={(e) => {
                            setSelectedCity(e.target.value);
                            setSelectedDate('');
                          }}
                          className="w-4 h-4 accent-brand-purple mr-2"
                          required
                        />
                        <svg className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{city}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Show dates when city selected but no date chosen yet */}
                {contactReason === 'reservation' && selectedCity && !selectedDate && (
                  <div className="mt-3 ml-8 space-y-2">
                    {calendar.locations[selectedCity as keyof typeof calendar.locations].map((date: string) => {
                      const dateObj = new Date(date);
                      const formattedDate = dateObj.toLocaleDateString('pl-PL', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      });
                      const fullValue = `${selectedCity}, ${formattedDate}`;
                      
                      return (
                        <label 
                          key={date}
                          className="flex items-center p-3 rounded-lg bg-white/40 dark:bg-black/30 border border-gray-200 dark:border-gray-700 hover:border-brand-gold cursor-pointer transition-all duration-300"
                        >
                          <input 
                            type="radio" 
                            name="date" 
                            value={fullValue}
                            checked={selectedDate === fullValue}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-4 h-4 accent-brand-purple mr-2"
                            required
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{formattedDate}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {/* Show change button when date is selected */}
                {selectedDate && contactReason === 'reservation' && (
                  <div className="mt-3 ml-8">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCity('');
                        setSelectedDate('');
                      }}
                      className="text-sm text-brand-purple dark:text-brand-gold hover:underline font-semibold"
                    >
                      Zmień datę
                    </button>
                  </div>
                )}
              </div>

              {/* Other option */}
              <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                contactReason === 'other' 
                  ? 'bg-brand-purple/10 border-brand-purple dark:bg-brand-gold/10 dark:border-brand-gold' 
                  : 'bg-white/30 dark:bg-black/20 border-transparent hover:border-brand-gold'
              }`}>
                <input 
                  type="radio" 
                  name="contactReason" 
                  value="other"
                  checked={contactReason === 'other'}
                  onChange={(e) => {
                    setContactReason('other');
                    setSelectedCity('');
                    setSelectedDate('');
                  }}
                  className="w-5 h-5 accent-brand-purple mr-3"
                />
                <span className="text-gray-700 dark:text-gray-300">W innej sprawie</span>
              </label>
            </div>
          </div>
          
          <div className="group">
            <label htmlFor="message" className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">
              {contact.fields.message}
            </label>
            <textarea 
              id="message" 
              name="message" 
              rows={5}
              className="w-full p-4 rounded-xl bg-white/50 dark:bg-black/30 border-2 border-transparent focus:border-brand-gold dark:focus:border-brand-gold outline-none transition-all duration-300 resize-none placeholder-gray-400"
              placeholder={contact.placeholders.message}
            ></textarea>
          </div>
          
          <div className="text-center pt-6">
            <button 
              type="submit" 
              className="btn-primary w-full md:w-auto group"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 transform transition-all duration-700 ease-out group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
                </svg>
                <span>{contact.submitButton}</span>
                <svg className="w-5 h-5 transform transition-all duration-700 ease-out group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
                </svg>
              </span>
            </button>
            
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M8 11 L8 7 C8 4.8, 9.8 3, 12 3 C14.2 3, 16 4.8, 16 7 L16 11" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="16" r="1.5" fill="currentColor"/>
              </svg>
              Twoje dane są bezpieczne i nie będą udostępniane osobom trzecim
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
