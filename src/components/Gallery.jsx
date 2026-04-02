/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { listGalleries, listGalleryCategories } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const { data: categories = [] } = useQuery({
    queryKey: ['galleryCategories'],
    queryFn: () => listGalleryCategories(),
  });

  const { data: images = [] } = useQuery({
    queryKey: ['galleryImages'],
    queryFn: () => listGalleries(),
  });

  const defaultCategories = [
    { id: 'all', name: 'All', slug: 'all' },
    { id: 'campus', name: 'Campus', slug: 'campus' },
    { id: 'events', name: 'Events', slug: 'events' },
    { id: 'sports', name: 'Sports Day', slug: 'sports' },
    { id: 'annual', name: 'Annual Function', slug: 'annual' },
  ];

  const defaultImages = [
    { id: 1, image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800', title: 'Campus View', category: 'campus' },
    { id: 2, image_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800', title: 'Classroom Learning', category: 'campus' },
    { id: 3, image_url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800', title: 'Library', category: 'campus' },
    { id: 4, image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800', title: 'Sports Day', category: 'sports' },
    { id: 5, image_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800', title: 'Annual Function', category: 'annual' },
    { id: 6, image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=800', title: 'Science Lab', category: 'campus' },
    { id: 7, image_url: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800', title: 'Independence Day', category: 'events' },
    { id: 8, image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800', title: 'Book Fair', category: 'events' },
    { id: 9, image_url: 'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?w=800', title: 'Athletics', category: 'sports' },
    { id: 10, image_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', title: 'Students', category: 'campus' },
    { id: 11, image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800', title: 'Cultural Program', category: 'annual' },
    { id: 12, image_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', title: 'Computer Lab', category: 'campus' },
  ];

  const displayCategories = categories.length > 0 
    ? [{ id: 'all', name: 'All', slug: 'all' }, ...categories] 
    : defaultCategories;
  
  const displayImages = images.length > 0 ? images : defaultImages;

  const filteredImages = selectedCategory === 'all' 
    ? displayImages 
    : displayImages.filter(img => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const newIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[300px] bg-[#1E3A8A] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1920)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#1E3A8A]/80 to-transparent" />
        
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-4 py-2 bg-[#FACC15] text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              Gallery
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-['Poppins']">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-200">
              Capturing moments of excellence and joy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {displayCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === category.slug
                    ? 'bg-[#1E3A8A] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <motion.div 
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <h4 className="font-semibold">{image.title}</h4>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={lightboxImage.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightboxImage.image_url}
              alt={lightboxImage.title}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white">
              <h3 className="text-xl font-semibold">{lightboxImage.title}</h3>
              <p className="text-gray-400 mt-1">{lightboxIndex + 1} / {filteredImages.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}