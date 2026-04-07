/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSettings, getUserPages, listGalleries } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';
import { getPageLink } from '@/lib/siteNavigation';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function GalleryPreview() {
  const { data: pages = [] } = useQuery({
    queryKey: ['user-pages'],
    queryFn: () => getUserPages(),
  });
  const { data: images = [] } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => listGalleries(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });
  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const galleryLink = getPageLink(pages, 'gallery');

  const defaultImages = [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600', title: 'Campus View', category: 'Campus' },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600', title: 'Classroom', category: 'Academics' },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600', title: 'Library', category: 'Facilities' },
    { id: 4, image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600', title: 'Sports Day', category: 'Events' },
    { id: 5, image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600', title: 'Annual Function', category: 'Events' },
    { id: 6, image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600', title: 'Science Lab', category: 'Facilities' },
  ];

  const displayImages = images.length > 0 ? images : defaultImages;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(accentColor, 0.2, DEFAULT_ACCENT), color: primaryColor }}>
            Photo Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Glimpses of <span style={{ color: primaryColor }}>School Life</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the vibrant moments and memories captured at Malhotra Public School
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayImages.slice(0, 6).map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-2xl ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={image.image_url}
                alt={image.title}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  index === 0 ? 'h-64 md:h-full' : 'h-48 md:h-64'
                }`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6" style={{ background: `linear-gradient(to top, ${withAlpha(primaryColor, 0.8, DEFAULT_PRIMARY)}, transparent, transparent)` }}>
                <div className="text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accentColor }}>
                    {image.category}
                  </span>
                  <h4 className="text-lg font-bold mt-1">{image.title}</h4>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <ZoomIn className="w-5 h-5" style={{ color: primaryColor }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={galleryLink}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 group"
            style={{ backgroundColor: primaryColor }}
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
