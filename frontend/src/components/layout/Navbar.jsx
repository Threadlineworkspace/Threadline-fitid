import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Find Your Fit', path: '/fitid/questionnaire' },
  { name: 'About Us', path: '/about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  // Only go transparent on the home page before scrolling
  const isTransparent = isHome && !scrolled && !isOpen;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? 'bg-transparent border-b border-white/10'
            : 'bg-black border-b border-white/10'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo — always white SVG since navbar is always dark */}
            <Link to="/" className="flex items-center gap-2 group relative z-50">
              <img 
                src="/threadline-logo-white.svg"
                alt="Threadline" 
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === link.path
                      ? 'text-[#EAD8C3]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#fa6902]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
              {/* Button is always #fa6902 regardless of scroll or page */}
              <Button 
                asChild 
                className="rounded-xl px-6 font-bold cursor-pointer bg-[#fa6902] hover:bg-[#e05e00] text-white transition-colors duration-300"
              >
                <Link to="/fitid/questionnaire">Get Your Fit ID</Link>
              </Button>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden relative z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group hover:bg-white/10"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute left-0 w-6 h-0.5 rounded-full bg-white"
                  animate={{ top: isOpen ? '50%' : '0%' }}
                />
                <motion.span
                  className="absolute left-0 w-6 h-0.5 rounded-full bg-white"
                  animate={{ opacity: isOpen ? 0 : 1 }}
                  style={{ top: '50%' }}
                />
                <motion.span
                  className="absolute left-0 w-6 h-0.5 rounded-full bg-white"
                  animate={{ top: isOpen ? '50%' : 'auto', bottom: isOpen ? 'auto' : '0%' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-black md:hidden overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col pt-28 px-8 pb-8">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fa6902]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#fa6902]/5 rounded-full blur-3xl" />

              <div className="relative mb-8">
                <img 
                  src="/threadline-logo-white.svg" 
                  alt="Threadline" 
                  className="h-10 w-auto"
                />
              </div>

              <div className="relative flex-1 flex flex-col justify-center">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className={`flex items-center justify-between py-5 border-b border-white/10 group ${
                        location.pathname === link.path
                          ? 'text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      <span className={`text-2xl font-medium transition-colors ${
                        location.pathname === link.path ? 'font-bold' : ''
                      }`}>
                        {link.name}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-all ${
                        location.pathname === link.path 
                          ? 'text-[#fa6902] translate-x-0' 
                          : 'text-white/30 -translate-x-2 group-hover:translate-x-0'
                      }`} />
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Button 
                    asChild 
                    className="w-full bg-[#fa6902] hover:bg-[#e05e00] text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-[#fa6902]/20"
                    onClick={handleLinkClick}
                  >
                    <Link to="/fitid/questionnaire">
                      Get Your Fit ID
                    </Link>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative pt-8 border-t border-white/10 text-center"
              >
                <p className="text-white/30 text-sm">
                  © {new Date().getFullYear()} Threadline
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
