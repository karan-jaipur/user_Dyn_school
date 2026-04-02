/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
// import { createPageUrl } from '@/utils';

export default function CTABanner() {
  return (
    <section className="py-20 bg-[#FACC15] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E3A8A]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3A8A] mb-6 font-['Poppins'] leading-tight">
              Ready to Give Your Child the Best Education?
            </h2>
            <p className="text-[#1E3A8A]/80 text-lg mb-8">
              Join the Malhotra Public School family today. Admissions are now open for the 
              academic year 2026-27. Limited seats available.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to={'/admissions'}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#1E3A8A] text-white font-semibold rounded-full hover:bg-[#1E40AF] transition-all hover:shadow-xl hover:-translate-y-1 group"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1E3A8A] font-semibold rounded-full hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Us Now
              </a>
            </div>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-['Poppins']">
                Admission Dates
              </h3>
              <p className="text-gray-600 text-sm">
                March 1 - April 30, 2026
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-[#1E3A8A]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 font-['Poppins']">
                Contact Admissions
              </h3>
              <p className="text-gray-600 text-sm">
                +91 9876543210
              </p>
            </div>

            <div className="sm:col-span-2 bg-[#1E3A8A] rounded-2xl p-6 text-white">
              <h3 className="font-bold mb-2 font-['Poppins']">
                🎓 Scholarship Available
              </h3>
              <p className="text-gray-300 text-sm">
                Merit-based scholarships for outstanding students. Contact us to learn more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}