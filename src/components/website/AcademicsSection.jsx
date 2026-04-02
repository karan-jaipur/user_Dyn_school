/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Lightbulb, Palette, Dumbbell, FlaskConical, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { listAcademicPrograms } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

const iconMap = {
  BookOpen, Users, Lightbulb, Palette, Dumbbell, FlaskConical
};

export default function AcademicsSection() {
  const { data: programs = [] } = useQuery({
    queryKey: ['academicPrograms'],
    queryFn: () => listAcademicPrograms(),
  });

  const defaultPrograms = [
    {
      title: 'Primary School',
      description: 'Building strong foundations with play-based and activity-based learning for young minds.',
      icon: 'BookOpen',
      grades: 'Nursery - Grade 5',
    },
    {
      title: 'Middle School',
      description: 'Developing critical thinking and analytical skills through interactive teaching methods.',
      icon: 'Lightbulb',
      grades: 'Grade 6 - Grade 8',
    },
    {
      title: 'Senior Secondary',
      description: 'Preparing students for competitive exams and higher education with expert guidance.',
      icon: 'FlaskConical',
      grades: 'Grade 9 - Grade 12',
    },
    {
      title: 'Sports Academy',
      description: 'Nurturing athletic talent with professional coaching and modern facilities.',
      icon: 'Dumbbell',
      grades: 'All Grades',
    },
    {
      title: 'Arts & Culture',
      description: 'Fostering creativity through music, dance, art, and cultural programs.',
      icon: 'Palette',
      grades: 'All Grades',
    },
    {
      title: 'Life Skills',
      description: 'Developing essential life skills for personal and professional success.',
      icon: 'Users',
      grades: 'All Grades',
    },
  ];

  const displayPrograms = programs.length > 0 ? programs : defaultPrograms;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
            Academic <span className="text-[#1E3A8A]">Excellence</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Comprehensive education programs designed to nurture every aspect of your child's development
          </p>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPrograms.map((program, index) => {
            const IconComponent = iconMap[program.icon] || BookOpen;

            return (
              <motion.div
                key={program.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-[#FACC15] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors">
                    <IconComponent className="w-8 h-8 text-[#1E3A8A]" />
                  </div>

                  {/* Grades Badge */}
                  <span className="inline-block px-3 py-1 bg-[#1E3A8A]/10 text-[#1E3A8A] text-xs font-semibold rounded-full mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors">
                    {program.grades}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-['Poppins'] group-hover:text-white transition-colors">
                    {program.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 group-hover:text-gray-200 transition-colors">
                    {program.description}
                  </p>

                  {/* Learn More Link */}
                  <Link
                    to={'/academics'}
                    className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold group-hover:text-[#FACC15] transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to={'/academics'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-semibold rounded-full hover:bg-[#1E40AF] transition-all hover:shadow-lg hover:-translate-y-0.5 group"
          >
            View All Programs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}