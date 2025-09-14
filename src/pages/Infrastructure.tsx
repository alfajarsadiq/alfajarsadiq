import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Warehouse, Truck, Clock, Shield, Award, Recycle, Sun, PackageCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Imported assets ---
import textureBg from '/src/assets/texture.webp';
import infraBg from '/src/assets/infrastructre.webp';

const Infrastructure = () => {
  const facilities = [
    {
      name: 'Dubai Central Warehouse',
      location: 'Business Bay, Dubai',
      area: '15,000 sq ft',
      image: 'https://images.pexels.com/photos/4481532/pexels-photo-4481532.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Abu Dhabi Distribution Center',
      location: 'Industrial Zone, Abu Dhabi',
      area: '12,000 sq ft',
      image: 'https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Sharjah Logistics Hub',
      location: 'Industrial Area, Sharjah',
      area: '10,000 sq ft',
      image: 'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    },
    {
      name: 'Northern Emirates Office',
      location: 'Ras Al Khaimah',
      area: '5,000 sq ft',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop'
    }
  ];

  const coverage = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ];

  const capabilities = [
    {
      icon: Warehouse,
      title: 'Storage Capacity',
      value: '50,000+ sq ft',
      description: 'Climate-controlled warehouses with advanced inventory management'
    },
    {
      icon: Truck,
      title: 'Fleet Size',
      value: '25+ Vehicles',
      description: 'Modern delivery fleet covering all Emirates with GPS tracking'
    },
    {
      icon: Clock,
      title: 'Delivery Time',
      value: '24-48 Hours',
      description: 'Fast and reliable delivery across the UAE with real-time tracking'
    },
    {
      icon: Shield,
      title: 'Quality Control',
      value: '100% Inspection',
      description: 'Comprehensive quality checks and temperature-controlled storage'
    }
  ];

  return (
    <div 
      className="pt-0"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA',
      }}
    >
      <section id="infra-hero" className="relative h-screen flex items-center justify-center rounded-b-[3rem] sm:rounded-b-[4rem] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${infraBg})`,
          }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 text-center text-[#FAFAFA]">
          <motion.h1
            // UPDATED: Adjusted font sizes for better mobile view
            className="font-carsole text-4xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Strategic <span style={{ color: '#C6A664' }}>Infrastructure</span>
          </motion.h1>
          <motion.p
            // UPDATED: Adjusted font sizes for better mobile view
            className="text-lg sm:text-xl max-w-3xl mx-auto mb-8 leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            State-of-the-art facilities and comprehensive coverage across all seven Emirates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#facilities" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">
              Explore Facilities
            </a>
            <Link to="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300">
              Logistics Inquiry
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#FAFAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* UPDATED: Reduced vertical padding for better mobile view */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            // UPDATED: Adjusted font sizes for better scaling
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Capabilities
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                className="bg-[#FAFAFA] p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <capability.icon className="h-12 w-12 mx-auto mb-4" style={{ color: '#C6A664' }} />
                <div className="text-2xl font-bold mb-2" style={{ color: '#234E70' }}>{capability.value}</div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#234E70' }}>{capability.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATED: Reduced vertical padding for better mobile view */}
      <section id="facilities" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            // UPDATED: Adjusted font sizes for better scaling
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Facilities
          </motion.h2>
          
          {/* UPDATED: Reduced gap for mobile view */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                className="bg-[#FAFAFA] rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#C6A664] text-[#1A1A1A] px-3 py-1 rounded-full text-sm font-semibold">
                    {facility.area}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#234E70' }}>{facility.name}</h3>
                  <div className="flex items-center" style={{ color: '#334155' }}>
                    <MapPin className="h-4 w-4 mr-2" style={{ color: '#C6A664' }} />
                    <span>{facility.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATED: Reduced vertical padding for better mobile view */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            // UPDATED: Adjusted font sizes for better scaling
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Complete UAE Coverage
          </motion.h2>
          
          <div className="bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl shadow-md">
            {/* UPDATED: Changed grid layout for small screens */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
              {coverage.map((emirate, index) => (
                <motion.div
                  key={emirate}
                  className="text-center p-3 sm:p-4 bg-[#FAFAFA] shadow-inner rounded-lg hover:bg-[#C6A664]/10 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <MapPin className="h-6 w-6 mx-auto mb-2" style={{ color: '#C6A664' }} />
                  <span className="text-xs sm:text-sm font-medium" style={{ color: '#234E70' }}>{emirate}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-base sm:text-lg mb-6" style={{ color: '#334155' }}>
                Our strategic network ensures efficient distribution and timely delivery to every corner of the United Arab Emirates.
              </p>
              <div className="inline-flex items-center px-6 py-3 bg-[#C6A664] text-[#1A1A1A] font-semibold rounded-lg">
                <Award className="h-5 w-5 mr-2" />
                100% UAE Coverage
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* UPDATED: Reduced vertical padding for better mobile view */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* UPDATED: Reduced gap for mobile view */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#234E70' }}>
                Modern Technology & Systems
              </h2>
              {/* UPDATED: Adjusted font size for mobile readability */}
              <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: '#334155' }}>
                Our infrastructure is powered by cutting-edge technology, including automated inventory management, real-time tracking systems, and advanced logistics software that ensures optimal efficiency.
              </p>
              <ul className="space-y-3 text-sm sm:text-base" style={{ color: '#334155' }}>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#C6A664' }}></div>
                  Automated inventory management systems
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#C6A664' }}></div>
                  Real-time GPS tracking for all deliveries
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#C6A664' }}></div>
                  Climate-controlled storage facilities
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0" style={{ backgroundColor: '#C6A664' }}></div>
                  24/7 security and monitoring systems
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Modern warehouse technology"
                className="w-full h-80 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEW SUSTAINABILITY SECTION --- */}
      {/* UPDATED: Reduced vertical padding for better mobile view */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* UPDATED: Reduced gap for mobile view */}
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* UPDATED: Changed order for better mobile layout (image first, then text) */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl md:order-last"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/8993222/pexels-photo-8993222.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Sustainable warehouse with green initiatives"
                className="w-full h-80 object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:order-first"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#234E70' }}>
                Our Commitment to Sustainability
              </h2>
              {/* UPDATED: Adjusted font size for mobile readability */}
              <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: '#334155' }}>
                We believe in responsible growth. Our sustainability initiatives are integrated into every aspect of our operations, from energy-efficient warehouses to eco-friendly logistics.
              </p>
              <ul className="space-y-4 text-sm sm:text-base" style={{ color: '#334155' }}>
                <li className="flex items-start">
                  <Recycle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" style={{ color: '#C6A664' }} />
                  <span><strong>Waste Reduction:</strong> Minimizing packaging and implementing comprehensive recycling programs.</span>
                </li>
                <li className="flex items-start">
                  <Sun className="h-5 w-5 mr-3 mt-1 flex-shrink-0" style={{ color: '#C6A664' }} />
                  <span><strong>Energy Efficiency:</strong> Utilizing solar power and LED lighting to reduce our carbon footprint.</span>
                </li>
                <li className="flex items-start">
                  <Truck className="h-5 w-5 mr-3 mt-1 flex-shrink-0" style={{ color: '#C6A664' }} />
                  <span><strong>Green Logistics:</strong> Optimizing delivery routes and investing in a modern, low-emission fleet.</span>
                </li>
                 <li className="flex items-start">
                  <PackageCheck className="h-5 w-5 mr-3 mt-1 flex-shrink-0" style={{ color: '#C6A664' }} />
                  <span><strong>Sustainable Sourcing:</strong> Partnering with suppliers who share our commitment to ethical practices.</span>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* --- CUSTOM DOWNLOAD SECTION --- */}
          <motion.div
            // UPDATED: Adjusted margin for mobile
            className="mt-16 sm:mt-20 text-center bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: '#234E70' }}>Read Our Full Report</h3>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6" style={{ color: '#334155' }}>
              Get an in-depth look at our goals, progress, and future plans for building a truly sustainable supply chain.
            </p>
            <a 
              href="/path-to-your-report.pdf" // IMPORTANT: Replace with the actual path to your PDF file
              download
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] shadow-lg hover:shadow-xl"
            >
              <Download className="h-5 w-5 mr-2" />
              Download 2025 Sustainability Report
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Infrastructure;