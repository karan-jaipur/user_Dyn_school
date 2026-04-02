/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listGalleries } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

export default function GalleryPreview() {
  const { data: images = [] } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => listGalleries(),
  });

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
          <span className="inline-block px-4 py-2 bg-[#FACC15]/20 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
            Photo Gallery
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Glimpses of <span className="text-[#1E3A8A]">School Life</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="text-white">
                  <span className="text-xs font-semibold text-[#FACC15] uppercase tracking-wider">
                    {image.category}
                  </span>
                  <h4 className="text-lg font-bold mt-1">{image.title}</h4>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-[#FACC15]">
                <ZoomIn className="w-5 h-5 text-[#1E3A8A]" />
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
            to={'/Gallery'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-semibold rounded-full hover:bg-[#1E40AF] transition-all hover:shadow-lg hover:-translate-y-0.5 group"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}