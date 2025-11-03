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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [showCitySelection, setShowCitySelection] = useState(false);
  
  // Update form when selectedTerm changes from calendar
  useEffect(() => {
    if (selectedTerm) {
      setContactReason('reservation');
      setSelectedDate(selectedTerm);
      setShowCitySelection(false); // Hide selection when date comes from calendar
    }
  }, [selectedTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate reservation fields
    if (contactReason === 'reservation' && !selectedDate) {
      setSubmitStatus({ type: 'error', message: 'Proszę wybrać termin wydarzenia.' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add selected date to formData if it exists (from calendar or manual selection)
    if (selectedDate) {
      formData.set('date', selectedDate);
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({ type: 'success', message: data.message });
        form.reset();
        setContactReason('');
        setSelectedCity('');
        setSelectedDate('');
        setShowCitySelection(false);
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Wystąpił błąd podczas wysyłania wiadomości.' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ type: 'error', message: 'Wystąpił błąd podczas wysyłania wiadomości.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
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
                    // If already selected and date is chosen, allow editing by clicking the text
                    if (contactReason === 'reservation' && selectedDate && !showCitySelection) {
                      e.preventDefault();
                      setShowCitySelection(true);
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
                      // If date already selected from calendar, keep it; otherwise show selection
                      if (!selectedDate) {
                        setShowCitySelection(true);
                      }
                    }}
                    className="w-5 h-5 accent-brand-purple mr-3"
                    required
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {selectedDate && contactReason === 'reservation' ? `Rezerwacji udziału w wydarzeniu ${selectedDate}` : 'Rezerwacji udziału w wydarzeniu'}
                  </span>
                </label>

                {/* Show cities when reservation selected and either no date or user wants to edit */}
                {contactReason === 'reservation' && showCitySelection && !selectedCity && (
                  <div className="mt-3 space-y-2">
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
                        />
                        <svg className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                        </svg>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{city}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Show selected city (clickable to change) */}
                {contactReason === 'reservation' && selectedCity && showCitySelection && (
                  <div className="mt-3 space-y-2">
                    <label 
                      onClick={() => {
                        setSelectedCity('');
                        setSelectedDate('');
                      }}
                      className="flex items-center p-3 rounded-lg bg-brand-purple/10 dark:bg-brand-gold/10 border-2 border-brand-purple dark:border-brand-gold cursor-pointer transition-all duration-300 hover:bg-brand-purple/20 dark:hover:bg-brand-gold/20"
                    >
                      <svg className="w-4 h-4 mr-2 text-brand-purple dark:text-brand-gold" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                      </svg>
                      <span className="text-sm font-semibold text-brand-purple dark:text-brand-gold">{selectedCity}</span>
                      <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">Kliknij aby zmienić</span>
                    </label>
                  </div>
                )}

                {/* Show dates when city selected */}
                {contactReason === 'reservation' && selectedCity && showCitySelection && (
                  <div className="mt-3 space-y-2">
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
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setShowCitySelection(false); // Hide selection after choosing date
                            }}
                            className="w-4 h-4 accent-brand-purple mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{formattedDate}</span>
                        </label>
                      );
                    })}
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
                    setShowCitySelection(false);
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

          {/* Status messages */}
          {submitStatus && (
            <div className={`p-4 rounded-xl ${
              submitStatus.type === 'success' 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}>
              {submitStatus.message}
            </div>
          )}
          
          <div className="text-center pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn-primary w-full md:w-auto group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-3">
                <svg className="w-5 h-5 transform transition-all duration-700 ease-out group-hover:rotate-[360deg]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2 L15 9 L22 10 L17 15 L18 22 L12 18 L6 22 L7 15 L2 10 L9 9 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor"/>
                </svg>
                <span>{isSubmitting ? 'Wysyłanie...' : contact.submitButton}</span>
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
