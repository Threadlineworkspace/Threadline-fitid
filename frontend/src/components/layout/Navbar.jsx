import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Target, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Find Your Fit', path: '/fitid' },
  { name: 'About Us', path: '/about' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
          scrolled || isOpen
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
            : 'bg-white/80 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group relative z-50">
              <div className="w-10 h-10 bg-[#323352] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#323352] group-hover:text-[#C76A32] transition-colors">
                Threadline
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors relative ${
                    location.pathname === link.path
                      ? 'text-[#C76A32]'
                      : 'text-[#5C5B77] hover:text-[#323352]'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C76A32]"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
              <Button asChild className="bg-[#C76A32] hover:bg-[#B85D2A] text-white rounded-xl px-6">
                <Link to="/fitid">Get Your Fit ID</Link>
              </Button>
            </div>

            {/* Mobile Hamburger - Premium Design */}
            <button
              className="md:hidden relative z-50 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[#F5F2EA] group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className={`absolute left-0 w-6 h-0.5 bg-[#323352] rounded-full transition-all duration-300 ${
                    isOpen ? 'top-1/2 rotate-45' : 'top-0'
                  }`}
                  animate={{ top: isOpen ? '50%' : '0%' }}
                />
                <motion.span
                  className={`absolute left-0 w-6 h-0.5 bg-[#323352] rounded-full transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'top-1/2 opacity-100'
                  }`}
                  animate={{ opacity: isOpen ? 0 : 1 }}
                />
                <motion.span
                  className={`absolute left-0 w-6 h-0.5 bg-[#323352] rounded-full transition-all duration-300 ${
                    isOpen ? 'top-1/2 -rotate-45' : 'bottom-0'
                  }`}
                  animate={{ top: isOpen ? '50%' : 'auto', bottom: isOpen ? 'auto' : '0%' }}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full Screen Premium Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#323352] md:hidden overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col pt-28 px-8 pb-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C76A32]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C76A32]/5 rounded-full blur-3xl" />

              {/* Navigation Links */}
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
                          ? 'text-[#C76A32] translate-x-0' 
                          : 'text-white/30 -translate-x-2 group-hover:translate-x-0'
                      }`} />
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8"
                >
                  <Button 
                    asChild 
                    className="w-full bg-[#C76A32] hover:bg-[#B85D2A] text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-[#C76A32]/20"
                    onClick={handleLinkClick}
                  >
                    <Link to="/fitid">
                      Get Your Fit ID
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Footer in Menu */}
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