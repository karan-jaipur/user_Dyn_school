/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { listTestimonials } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials = [] } = useQuery({
    queryKey: ['testimonials'],
    queryFn: () => listTestimonials(),
  });

  const defaultTestimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Parent',
      content: 'Excellent education and discipline. My child has shown tremendous improvement since joining Malhotra Public School. The teachers are dedicated and the facilities are world-class.',
      rating: 5,
      image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    {
      id: 2,
      name: 'Sunita Sharma',
      role: 'Parent',
      content: 'Best infrastructure in Kotputli. The school provides a perfect blend of academics and extracurricular activities. Highly recommended for quality education.',
      rating: 5,
      image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
      id: 3,
      name: 'Amit Malhotra',
      role: 'Alumni (Batch 2020)',
      content: 'The values and education I received here shaped my career. The school prepared me well for competitive exams and gave me confidence to succeed.',
      rating: 5,
      image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  if (displayTestimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#3B82F6] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl" />
      
      {/* Quote Pattern */}
      <div className="absolute top-20 right-20 opacity-10">
        <Quote className="w-32 h-32 text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#FACC15]/20 text-[#FACC15] text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
            What Parents & Students Say
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from our community about their experience with Malhotra Public School
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={displayTestimonials[currentIndex].image_url || `https://ui-avatars.com/api/?name=${displayTestimonials[currentIndex].name}&background=1E3A8A&color=fff&size=128`}
                      alt={displayTestimonials[currentIndex].name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-[#FACC15]"
                    />
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FACC15] rounded-full flex items-center justify-center">
                      <Quote className="w-5 h-5 text-[#1E3A8A]" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex gap-1 justify-center md:justify-start mb-4">
                    {[...Array(displayTestimonials[currentIndex].rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#FACC15]" fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 italic">
                    "{displayTestimonials[currentIndex].content}"
                  </p>

                  {/* Author */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 font-['Poppins']">
                      {displayTestimonials[currentIndex].name}
                    </h4>
                    <p className="text-[#1E3A8A] font-medium">
                      {displayTestimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1E3A8A] transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {displayTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[#FACC15]'
                      : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1E3A8A] transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}