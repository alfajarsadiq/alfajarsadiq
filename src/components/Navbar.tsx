import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import the logo
import logo from '/src/assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setHoveredPath(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/products', label: 'Products' },
    { path: '/partners', label: 'Partners' },
    { path: '/infrastructure', label: 'Infrastructure' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed w-full z-50 p-2 transition-all duration-300">
      <motion.nav
        className={`relative max-w-7xl mx-auto flex justify-between items-center h-20 px-4 sm:px-6 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-[#FAFAFA]/90 backdrop-blur-md shadow-lg rounded-full'
            : 'bg-transparent'
        }`}
      >
        <Link to="/" className="flex items-center space-x-3 z-10">
          <img
            src={logo}
            alt="Al-Fajar Sadiq Logo"
            className={`h-12 w-auto transition-all duration-300 hidden sm:block ${
              isScrolled 
                ? 'drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]' 
                : 'drop-shadow-[0_2px_2px_rgba(255,255,255,0.7)]'
            }`}
          />
          <div>
            <span className={`block text-2xl sm:text-3xl font-trusted leading-tight transition-colors duration-300 ${isScrolled ? 'text-[#234E70]' : 'text-[#FAFAFA] drop-shadow-md'}`}>
              Al Fajar Al Sadiq
            </span>
            <span className={`block text-[10px] sm:text-xs font-light tracking-widest uppercase transition-colors duration-300 ${isScrolled ? 'text-[#707070]' : 'text-gray-200 drop-shadow-md'}`}>
              General Trading LLC.
            </span>
          </div>
        </Link>

        <div
          className="hidden md:flex items-center h-full"
          onMouseLeave={() => setHoveredPath(location.pathname)}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
                hoveredPath === item.path
                  ? 'text-[#1A1A1A]'
                  : isScrolled
                  ? 'text-[#234E70]'
                  : 'text-[#FAFAFA] drop-shadow-sm'
              }`}
              onMouseOver={() => setHoveredPath(item.path)}
            >
              {item.label}
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-full bg-[#C6A664] rounded-full -z-10"
                  layoutId="pill"
                  transition={{ type: "spring", stiffness: 350, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden z-10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-[#234E70]" />
          ) : (
            <Menu className={`h-6 w-6 transition-colors duration-300 ${isScrolled ? 'text-[#234E70]' : 'text-[#FAFAFA]'}`} />
          )}
        </button>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="absolute top-0 left-0 w-full md:hidden bg-[#FAFAFA] shadow-lg rounded-2xl mt-24"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      location.pathname === item.path
                        ? 'text-[#1A1A1A] bg-[#C6A664]'
                        : 'text-[#234E70] hover:bg-[#C6A664]/20'
                    }`}
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
    </header>
  );
};

export default Navbar;
