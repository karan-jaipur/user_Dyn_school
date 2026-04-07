/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  GraduationCap,
  ChevronRight,
  Send,
} from 'lucide-react';
import { getFooter, getSettings, getUserPages, listNavItems } from '@/api/adminClient';
import { useQuery } from '@tanstack/react-query';
import { buildNavigation, getPageLink, isExternalLink } from '@/lib/siteNavigation';

export default function Footer() {
  const { data: footer = {} } = useQuery({
    queryKey: ['footerData'],
    queryFn: () => getFooter(),
  });
  const { data: settings = {} } = useQuery({
    queryKey: ['site-settings'],
    queryFn: () => getSettings(),
  });
  const { data: userPages = [] } = useQuery({
    queryKey: ['user-pages'],
    queryFn: () => getUserPages(),
  });
  const { data: navItems = [] } = useQuery({
    queryKey: ['navItems'],
    queryFn: () => listNavItems(),
  });

  const schoolName = settings.school_name || 'Malhotra Public School';
  const tagline = settings.tagline || 'Learning Today, Leading Tomorrow';
  const address = settings.address || footer.address || 'NH-48, Kotputli, Rajasthan 303108';
  const phone = settings.phone || footer.phone || '+91 9876543210';
  const email = settings.email || footer.email || 'info@malhotrapublicschool.edu';
  const primaryColor = settings.primary_color || '#1E3A8A';
  const accentColor = settings.accent_color || '#FACC15';
  const copyrightText =
    footer.copyrightText || `© ${new Date().getFullYear()} ${schoolName}. All Rights Reserved.`;

  const socialIconMap = { Facebook, Twitter, Instagram, Youtube, Linkedin };
  const settingsSocialLinks = [
    settings.facebook ? { platform: 'Facebook', url: settings.facebook } : null,
    settings.twitter ? { platform: 'Twitter', url: settings.twitter } : null,
    settings.instagram ? { platform: 'Instagram', url: settings.instagram } : null,
    settings.youtube ? { platform: 'Youtube', url: settings.youtube } : null,
    settings.linkedin ? { platform: 'Linkedin', url: settings.linkedin } : null,
  ].filter(Boolean);
  const socialLinks =
    footer.socialLinks?.length > 0
      ? footer.socialLinks
      : settingsSocialLinks.length > 0
        ? settingsSocialLinks
        : [
            { platform: 'Facebook', url: '#' },
            { platform: 'Twitter', url: '#' },
            { platform: 'Instagram', url: '#' },
            { platform: 'Youtube', url: '#' },
          ];

  const navigationLinks = buildNavigation(navItems, userPages).filter((item) => !item.parent_id);
  const quickLinks = navigationLinks.slice(0, 6);
  const academicLinks = navigationLinks.filter((item) => item.link !== '/').slice(0, 5);
  const contactLink = getPageLink(userPages, 'contact');
  const [newsletterEmail, setNewsletterEmail] = React.useState('');

  const handleNewsletterSubscribe = () => {
    if (!newsletterEmail.trim()) return;
    const subject = encodeURIComponent(`Newsletter Subscription - ${schoolName}`);
    const body = encodeURIComponent(`Please subscribe this email to school updates: ${newsletterEmail.trim()}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer className="text-white" style={{ backgroundColor: primaryColor }}>
      <div className="py-12" style={{ backgroundColor: accentColor }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-['Poppins']" style={{ color: primaryColor }}>
                Subscribe to Our Newsletter
              </h3>
              <p style={{ color: `${primaryColor}CC` }}>Stay updated with latest news and events</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(event) => setNewsletterEmail(event.target.value)}
                className="px-6 py-3 rounded-l-full w-full md:w-80 text-gray-800 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleNewsletterSubscribe}
                className="px-6 py-3 text-white rounded-r-full transition-colors flex items-center gap-2"
                style={{ backgroundColor: primaryColor }}
              >
                <Send className="w-5 h-5" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {settings.logo ? (
                  <img src={settings.logo} alt={schoolName} className="h-12 w-12 rounded-full object-cover" />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <GraduationCap className="w-7 h-7" style={{ color: primaryColor }} />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-xl font-['Poppins']">{schoolName}</h3>
                  <p className="text-sm text-gray-300">{tagline}</p>
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
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center transition-all"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {isExternalLink(link.link) ? (
                      <a href={link.link} target={link.open_in_new_tab ? '_blank' : undefined} rel={link.open_in_new_tab ? 'noreferrer' : undefined} className="text-gray-300 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.link} className="text-gray-300 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Academics</h4>
              <ul className="space-y-3">
                {academicLinks.map((link, index) => (
                  <li key={index}>
                    {isExternalLink(link.link) ? (
                      <a href={link.link} target={link.open_in_new_tab ? '_blank' : undefined} rel={link.open_in_new_tab ? 'noreferrer' : undefined} className="text-gray-300 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.link} className="text-gray-300 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4" />
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 font-['Poppins']">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-300">{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                  <a href={`tel:${phone}`} className="text-gray-300">
                    {phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                  <a href={`mailto:${email}`} className="text-gray-300">
                    {email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
                  <span className="text-gray-300">Mon - Sat: 8:00 AM - 3:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">{copyrightText}</p>
          <div className="flex gap-6 text-sm">
            <Link to={contactLink} className="text-gray-400">
              Privacy Policy
            </Link>
            <Link to={contactLink} className="text-gray-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
