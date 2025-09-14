import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram, Send } from 'lucide-react';
import logo from '/src/assets/logo.png';

// --- Imported background texture ---
import textureBg from '/src/assets/texture.webp';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
  ];

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/partners', label: 'Our Partners' },
    { to: '/infrastructure', label: 'Infrastructure' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
  ];

  const productLinks = [
    'Premium Atta & Flour',
    'Quality Rice Varieties',
    'Cooking & Edible Oils',
    'Food & Beverages',
    'General Commodities',
  ];

  return (
    <div 
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA', // Ivory White
      }}
    >
      <footer 
        className="text-[#FAFAFA] rounded-t-3xl sm:rounded-t-[3rem] md:rounded-t-[4rem] lg:rounded-t-[5rem] mx-4"
        style={{ backgroundColor: '#1A1A1A' }} // Charcoal Black
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to="/">
                <img src={logo} alt="Al-Fajar Sadiq Logo" className="h-16 w-auto" />
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed">
                Celebrating over 27 years of excellence in general trading and distribution, connecting trusted partners with retailers across the UAE.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#C6A664] transition-all duration-300 group" // Champagne Gold on hover
                  >
                    <social.icon className="h-5 w-5 text-[#FAFAFA] transition-all duration-300 group-hover:scale-110 group-hover:text-[#1A1A1A]" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-wider" style={{ color: '#C6A664' }}>Quick Links</h3> {/* Champagne Gold */}
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-300 hover:text-[#C6A664] hover:pl-2 transition-all duration-300 block" // Champagne Gold on hover
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Products */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-wider" style={{ color: '#C6A664' }}>Our Products</h3> {/* Champagne Gold */}
              <ul className="space-y-3">
                {productLinks.map((product) => (
                  <li key={product} className="text-gray-300 text-sm">{product}</li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-wider" style={{ color: '#C6A664' }}>Contact Info</h3> {/* Champagne Gold */}
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#C6A664' }} /> {/* Champagne Gold */}
                  <div className="text-gray-300">
                    <p className="font-semibold text-[#FAFAFA]">Dubai Office:</p>
                    <p>Ferrari Foods LLC </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" style={{ color: '#C6A664' }} /> {/* Champagne Gold */}
                  <span className="text-gray-300 hover:text-[#C6A664] transition-colors cursor-pointer">+971 558867751</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" style={{ color: '#C6A664' }} /> {/* Champagne Gold */}
                  <span className="text-gray-300 hover:text-[#C6A664] transition-colors cursor-pointer">info@alfajarsadiq.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Integrated Newsletter Section --- */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold tracking-wider" style={{ color: '#C6A664' }}>Stay Updated</h3> {/* Champagne Gold */}
                <p className="text-gray-300 text-sm mt-2">Get the latest news and offers from Al-Fajar Sadiq.</p>
              </div>
              <form className="flex items-center bg-white/10 p-2 rounded-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border-none text-[#FAFAFA] placeholder-gray-400 px-4 text-sm focus:outline-none focus:ring-0"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full hover:bg-[#b5955a] transition-all duration-300 transform hover:scale-105"
                  style={{ backgroundColor: '#C6A664' }} // Champagne Gold
                  aria-label="Submit newsletter"
                >
                  <Send className="h-5 w-5 text-[#1A1A1A]" /> {/* Charcoal Black */}
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Al-Fajar Sadiq General Trading LLC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;