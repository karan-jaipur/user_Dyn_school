/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { listNotices } from '@/api/adminClient';

export default function NoticesSection() {
  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: () => listNotices(),
  });

  const defaultNotices = [
    {
      id: 1,
      title: 'Admissions Open for 2026-27',
      description: 'We are now accepting applications for the academic year 2026-27. Limited seats available.',
      date: '2026-03-01',
      is_highlighted: true,
    },
    {
      id: 2,
      title: 'Annual Function on 15 March',
      description: 'Join us for our grand annual function. Parents are invited to attend.',
      date: '2026-03-15',
      is_highlighted: false,
    },
    {
      id: 3,
      title: 'Science Exhibition Registration Open',
      description: 'Students can register for the annual science exhibition until March 10.',
      date: '2026-03-05',
      is_highlighted: true,
    },
    {
      id: 4,
      title: 'Parent-Teacher Meeting',
      description: 'PTM scheduled for all classes. Please check your class schedule.',
      date: '2026-02-28',
      is_highlighted: false,
    },
  ];

  const displayNotices = notices.length > 0 ? notices : defaultNotices;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Section Header & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <span className="inline-block px-4 py-2 bg-[#1E3A8A]/10 text-[#1E3A8A] text-sm font-semibold rounded-full mb-4">
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
              News & <span className="text-[#1E3A8A]">Notices</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest announcements, events, and important information from Malhotra Public School.
            </p>

            <div className="flex items-center gap-4 p-6 bg-[#FACC15]/10 rounded-2xl mb-6">
              <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Subscribe to Updates</p>
                <p className="text-sm text-gray-600">Get notified about new notices</p>
              </div>
            </div>

            <Link
              to={('/Notices')}
              className="inline-flex items-center gap-2 text-[#1E3A8A] font-semibold hover:gap-3 transition-all"
            >
              View All Notices
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {/* Notices List */}
          <div className="lg:col-span-2 space-y-4">
            {displayNotices.slice(0, 4).map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all hover:shadow-lg cursor-pointer group ${
                  notice.is_highlighted
                    ? 'bg-gradient-to-r from-[#1E3A8A]/5 to-transparent border-l-4 border-l-[#FACC15] border-t-0 border-r-0 border-b-0'
                    : 'bg-white border-gray-100 hover:border-[#1E3A8A]/30'
                }`}
              >
                {notice.is_highlighted && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FACC15] rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-[#1E3A8A]" fill="currentColor" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1E3A8A] rounded-xl flex flex-col items-center justify-center text-white">
                    <span className="text-2xl font-bold">
                      {format(new Date(notice.date), 'd')}
                    </span>
                    <span className="text-xs uppercase">
                      {format(new Date(notice.date), 'MMM')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#1E3A8A] transition-colors font-['Poppins']">
                      {notice.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {notice.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#1E3A8A] group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}