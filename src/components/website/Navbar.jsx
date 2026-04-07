import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSettings, getUserPages, listNavItems } from "@/api/adminClient";
import { buildNavigation, isExternalLink } from "@/lib/siteNavigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: pages = [] } = useQuery({
    queryKey: ["user-pages"],
    queryFn: getUserPages,
  });
  const { data: navItems = [] } = useQuery({
    queryKey: ["navItems"],
    queryFn: listNavItems,
  });
  const { data: settings = {} } = useQuery({
    queryKey: ["site-settings"],
    queryFn: getSettings,
  });

  const schoolName = settings.school_name || "Malhotra Public School";
  const tagline = settings.tagline || "Learning Today, Leading Tomorrow";
  const phone = settings.phone || "+91 9876543210";
  const email = settings.email || "info@malhotrapublicschool.edu";
  const primaryColor = settings.primary_color || "#1E3A8A";
  const accentColor = settings.accent_color || "#FACC15";

  const navigationItems = buildNavigation(navItems, pages).filter((item) => !item.parent_id);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="py-2 hidden md:block text-white" style={{ backgroundColor: primaryColor }}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone}`} className="flex items-center gap-2" style={{ color: "white" }}>
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2" style={{ color: "white" }}>
              <Mail className="w-4 h-4" />
              {email}
            </a>
          </div>
          <div className="text-white/80">Admissions, notices, and CMS pages stay synced here.</div>
        </div>
      </div>

      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-lg" : "bg-white shadow-sm"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              {settings.logo ? (
                <img src={settings.logo} alt={schoolName} className="h-12 w-12 rounded-full object-cover shadow-sm" />
              ) : (
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                  <GraduationCap className="w-7 h-7" style={{ color: accentColor }} />
                </div>
              )}
              <div>
                <h1 className="font-bold text-lg" style={{ color: primaryColor }}>{schoolName}</h1>
                <p className="text-xs text-gray-500">{tagline}</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) =>
                isExternalLink(item.link) ? (
                  <a
                    key={item.id}
                    href={item.link}
                    target={item.open_in_new_tab ? "_blank" : undefined}
                    rel={item.open_in_new_tab ? "noreferrer" : undefined}
                    className="px-4 py-2 text-gray-700 font-medium"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="px-4 py-2 text-gray-700 font-medium"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen((open) => !open)}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" style={{ color: primaryColor }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: primaryColor }} />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                {navigationItems.map((item) =>
                  isExternalLink(item.link) ? (
                    <a
                      key={item.id}
                      href={item.link}
                      target={item.open_in_new_tab ? "_blank" : undefined}
                      rel={item.open_in_new_tab ? "noreferrer" : undefined}
                      className="block py-3 text-gray-700 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.id}
                      to={item.link}
                      className="block py-3 text-gray-700 border-b"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
