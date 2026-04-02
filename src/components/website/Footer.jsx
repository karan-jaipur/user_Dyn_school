/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, Clock, 
  Facebook, Twitter, Instagram, Youtube, Linkedin,
  GraduationCap, ChevronRight, Send
} from 'lucide-react';
import { getFooter, getUserPages } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';

export default function Footer() {
  const { data: footer = {} } = useQuery({
    queryKey: ['footerData'],
    queryFn: () => getFooter(),
  });
  const { data: userPages = [] } = useQuery({
    queryKey: ['user-pages'],
    queryFn: () => getUserPages(),
  });

  const address = footer.address || 'NH-48, Kotputli, Rajasthan 303108';
  const phone = footer.phone || '+91 9876543210';
  const email = footer.email || 'info@malhotrapublicschool.edu';
  const copyrightText = footer.copyrightText || `© ${new Date().getFullYear()} Malhotra Public School. All Rights Reserved.`;

  const socialIconMap = { Facebook, Twitter, Instagram, Youtube, Linkedin };
  const socialLinks = footer.socialLinks?.length > 0
    ? footer.socialLinks
    : [
        { platform: 'Facebook', url: '#' },
        { platform: 'Twitter', url: '#' },
        { platform: 'Instagram', url: '#' },
        { platform: 'Youtube', url: '#' },
      ];

  const quickLinks = [
    { label: 'Home', link: '/' },
    ...userPages.map((page) => ({
      label: page.title,
      link: `/${page.slug}`,
    })),
  ];

  const academicLinks = userPages.slice(0, 5).map((page) => ({
    label: page.title,
    link: `/${page.slug}`,
  }));

  return (
    <footer className="bg-[#1E3A8A] text-white">
      {/* Newsletter Section */}
      <div className="bg-[#FACC15] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-[#1E3A8A] font-['Poppins']">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-[#1E3A8A]/80">Stay updated with latest news and events</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-l-full w-full md:w-80 text-gray-800 focus:outline-none"
              />
              <button className="px-6 py-3 bg-[#1E3A8A] text-white rounded-r-full hover:bg-[#1E40AF] transition-colors flex items-center gap-2">
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Column */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#FACC15] rounded-full flex items-center justify-center">
                  <GraduationCap className="w-7 h-7 text-[#1E3A8A]" />
                </div>
                <div>
                  <h3 className="font-bold text-xl font-['Poppins']">Malhotra Public School</h3>
                  <p className="text-sm text-gray-300">Since 2008</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Committed to academic excellence and character development. 
                We provide modern education with traditional values.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = socialIconMap[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FACC15] hover:text-[#1E3A8A] transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link}
                      className="text-gray-300 hover:text-[#FACC15] transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academics */}
            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Academics</h4>
              <ul className="space-y-3">
                {academicLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link}
                      className="text-gray-300 hover:text-[#FACC15] transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FACC15] mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#FACC15] flex-shrink-0" />
                  <a href={`tel:${phone}`} className="text-gray-300 hover:text-[#FACC15] transition-colors">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#FACC15] flex-shrink-0" />
                  <a href={`mailto:${email}`} className="text-gray-300 hover:text-[#FACC15] transition-colors">
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#FACC15] flex-shrink-0" />
                  <span className="text-gray-300">Mon - Sat: 8:00 AM - 3:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            {copyrightText}
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="#" className="text-gray-400 hover:text-[#FACC15] transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-gray-400 hover:text-[#FACC15] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
