/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Award, BookOpen, Calendar, GraduationCap, Trophy, Building, Star } from 'lucide-react';
import { listStatistics } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

const iconMap = {
  Users, Award, BookOpen, Calendar, GraduationCap, Trophy, Building, Star
};

function AnimatedCounter({ value, suffix = '', inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: stats = [] } = useQuery({
    queryKey: ['stats'],
    queryFn: () => listStatistics(),
  });

  const defaultStats = [
    { label: 'Students Enrolled', value: 850, suffix: '+', icon: 'Users' },
    { label: 'Expert Teachers', value: 25, suffix: '+', icon: 'GraduationCap' },
    { label: 'Awards Won', value: 15, suffix: '+', icon: 'Trophy' },
    { label: 'Years of Excellence', value: 18, suffix: '', icon: 'Calendar' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section ref={ref} className="relative py-20 bg-[#1E3A8A] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FACC15]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#FACC15]/20 text-[#FACC15] text-sm font-semibold rounded-full mb-4">
            Our Achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Poppins']">
            Numbers That Speak
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => {
            const IconComponent = iconMap[stat.icon] || Users;
            
            return (
              <motion.div
                key={stat.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative inline-flex items-center justify-center mb-4">
                  <div className="absolute w-20 h-20 bg-[#FACC15]/20 rounded-full group-hover:scale-110 transition-transform" />
                  <div className="relative w-16 h-16 bg-[#FACC15] rounded-full flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-[#1E3A8A]" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Poppins']">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix || ''} 
                    inView={isInView}
                  />
                </div>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}