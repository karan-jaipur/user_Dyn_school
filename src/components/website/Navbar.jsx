import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, GraduationCap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getUserPages } from "@/api/adminClient";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: pages = [] } = useQuery({
    queryKey: ["user-pages"],
    queryFn: getUserPages,
  });

  const navItems = [
    { id: "home", label: "Home", link: "/" },
    ...pages.map((page) => ({
      id: page._id,
      label: page.title,
      link: `/${page.slug}`,
    })),
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="bg-[#1E3A8A] text-white py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-[#FACC15]">
              <Phone className="w-4 h-4" />
              +91 9876543210
            </a>
            <a href="mailto:info@malhotrapublicschool.edu" className="flex items-center gap-2 hover:text-[#FACC15]">
              <Mail className="w-4 h-4" />
              info@malhotrapublicschool.edu
            </a>
          </div>
          <div className="text-white/80">Home is fixed. Other pages come from the CMS.</div>
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
              <div className="w-12 h-12 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-[#FACC15]" />
              </div>
              <div>
                <h1 className="font-bold text-[#1E3A8A] text-lg">Malhotra Public School</h1>
                <p className="text-xs text-gray-500">Learning Today, Leading Tomorrow</p>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="px-4 py-2 text-gray-700 hover:text-[#1E3A8A] font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button className="lg:hidden" onClick={() => setIsMobileMenuOpen((open) => !open)}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#1E3A8A]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1E3A8A]" />
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
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="block py-3 text-gray-700 border-b"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
