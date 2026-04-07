/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSettings, getUserPages } from '@/api/adminClient';
import { getPageLink } from '@/lib/siteNavigation';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';
// import { createPageUrl } from '@/utils';

export default function AboutPreview() {
  const { data: pages = [] } = useQuery({
    queryKey: ['user-pages'],
    queryFn: () => getUserPages(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });
  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const aboutLink = getPageLink(pages, 'about');
  const contactLink = getPageLink(pages, 'contact');

  const highlights = [
    'CBSE Affiliated School',
    'Modern Smart Classrooms',
    'Experienced Faculty',
    'Sports & Cultural Activities',
    'Safe & Secure Campus',
    'Transportation Facility',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800"
                  alt="School Building"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Link to={aboutLink} className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform" style={{ backgroundColor: accentColor }}>
                    <Play className="w-8 h-8 ml-1" style={{ color: primaryColor }} fill="currentColor" />
                  </Link>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 rounded-2xl -z-10" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY) }} />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full -z-10" style={{ backgroundColor: withAlpha(accentColor, 0.3, DEFAULT_ACCENT) }} />

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-8 left-8 text-white p-6 rounded-2xl shadow-xl z-20"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="text-4xl font-bold font-['Poppins']">18+</div>
                <div className="text-sm text-gray-300">Years of<br />Excellence</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: primaryColor }}>
              About Us
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins'] leading-tight">
              Nurturing Young Minds Since{' '}
              <span style={{ color: primaryColor }}>2008</span>
            </h2>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Malhotra Public School is committed to academic excellence and character 
              development. We provide modern education with traditional values, preparing 
              students for the challenges of tomorrow while instilling strong moral foundations.
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Our holistic approach to education ensures that every child receives 
              personalized attention, enabling them to discover and nurture their unique 
              talents and abilities.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to={aboutLink}
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                style={{ backgroundColor: primaryColor }}
              >
                Discover More
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to={contactLink}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 font-semibold rounded-full transition-all"
                style={{ borderColor: primaryColor, color: primaryColor }}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
