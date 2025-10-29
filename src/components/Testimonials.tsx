'use client'

import React from 'react';
import content from '@/data/content.json';

const Testimonials = () => {
  const { testimonials } = content;
  
  return (
    <section id="testimonials" className="py-20 md:py-32 w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 font-serif">
          <span className="gradient-text">{testimonials.title}</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {testimonials.subtitle}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.items.map((testimonial, index) => (
          <div 
            key={index} 
            className="glass-panel p-8 hover:scale-105 transition-all duration-300 group"
          >
            {/* Star rating */}
            <div className="flex justify-center mb-4 text-2xl">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="text-brand-gold">⭐</span>
              ))}
            </div>
            
            {/* Quote */}
            <p className="text-lg italic mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
              "{testimonial.quote}"
            </p>
            
            {/* Author info */}
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
              <p className="font-bold text-brand-purple dark:text-brand-gold-light">
                {testimonial.author}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.location}
              </p>
            </div>
            
            {/* Decorative corner element */}
            <div className="absolute top-4 right-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
              "
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
