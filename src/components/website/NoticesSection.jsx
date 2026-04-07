/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Bell, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { getSettings, getUserPages, listNotices } from '@/api/adminClient';
import { getPageLink } from '@/lib/siteNavigation';
import { DEFAULT_ACCENT, DEFAULT_PRIMARY, withAlpha } from '@/lib/siteTheme';

export default function NoticesSection() {
  const { data: pages = [] } = useQuery({
    queryKey: ['user-pages'],
    queryFn: () => getUserPages(),
  });
  const { data: notices = [] } = useQuery({
    queryKey: ['notices'],
    queryFn: () => listNotices(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });
  const primaryColor = settings.primary_color || DEFAULT_PRIMARY;
  const accentColor = settings.accent_color || DEFAULT_ACCENT;
  const noticesLink = getPageLink(pages, 'notices');

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
            <span className="inline-block px-4 py-2 text-sm font-semibold rounded-full mb-4" style={{ backgroundColor: withAlpha(primaryColor, 0.1, DEFAULT_PRIMARY), color: primaryColor }}>
              Latest Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
              News & <span style={{ color: primaryColor }}>Notices</span>
            </h2>
            <p className="text-gray-600 mb-8">
              Stay updated with the latest announcements, events, and important information from Malhotra Public School.
            </p>

            <div className="flex items-center gap-4 p-6 rounded-2xl mb-6" style={{ backgroundColor: withAlpha(accentColor, 0.1, DEFAULT_ACCENT) }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                <Bell className="w-6 h-6" style={{ color: primaryColor }} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Subscribe to Updates</p>
                <p className="text-sm text-gray-600">Get notified about new notices</p>
              </div>
            </div>

            <Link
              to={noticesLink}
              className="inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all"
              style={{ color: primaryColor }}
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
                    ? 'border-l-4 border-t-0 border-r-0 border-b-0'
                    : 'bg-white border-gray-100'
                }`}
                style={notice.is_highlighted
                  ? { background: `linear-gradient(to right, ${withAlpha(primaryColor, 0.05, DEFAULT_PRIMARY)}, transparent)`, borderLeftColor: accentColor }
                  : { borderColor: '#f3f4f6' }}
              >
                {notice.is_highlighted && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: accentColor }}>
                    <Star className="w-4 h-4" style={{ color: primaryColor }} fill="currentColor" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Date Badge */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                    <span className="text-2xl font-bold">
                      {format(new Date(notice.date), 'd')}
                    </span>
                    <span className="text-xs uppercase">
                      {format(new Date(notice.date), 'MMM')}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 transition-colors font-['Poppins']" style={{ color: notice.is_highlighted ? primaryColor : undefined }}>
                      {notice.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {notice.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-all flex-shrink-0" style={{ color: primaryColor }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
