/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion'; 
import HeroSection from './website/HeroSection';
import AboutPreview from './website/AboutPreview';
import StatsSection from './website/StatsSection';
import AcademicsSection from './website/AcademicsSection';
import GalleryPreview from './website/GalleryPreview';
import NoticesSection from './website/NoticesSection';
import TestimonialsSection from './website/TestimonialsSection';
import CTABanner from './website/CTABanner';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <AboutPreview />
      <StatsSection />
      <AcademicsSection />
      <GalleryPreview />
      <NoticesSection />
      <TestimonialsSection />
      <CTABanner/>
    </motion.div>
  );
}