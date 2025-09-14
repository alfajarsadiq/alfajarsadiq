import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Globe, Handshake, TrendingUp, Quote, Target, Package, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Imported assets ---
import textureBg from '/src/assets/texture.webp';
import partnerBg from '/src/assets/partner.webp';

// --- Partner logos ---
import iffcoLogo from '/src/assets/iffcologo.png';
import alghurairLogo from '/src/assets/alghurairlogo.png';
import grandLogo from '/src/assets/grandlogo.png';
import amirLogo from '/src/assets/amirlogo.png';
import khaleejLogo from '/src/assets/khaleejlogo.png';
import jenanLogo from '/src/assets/jenanlogo.png';

// --- Funded Company logos ---
import hostLogo from '/src/assets/logo.png';
import habibiLogo from '/src/assets/habibilogo.png';
import safariLogo from '/src/assets/safarilogo.png';
import ferrariLogo from '/src/assets/ferrarilogo.png';
import namletLogo from '/src/assets/namletlogo.png';

// --- Event images ---
import event1 from '/src/assets/event1.webp';
import event2 from '/src/assets/event2.webp';
import event3 from '/src/assets/event3.webp';

const Partners = () => {
  const detailedPartners = [
    {
      name: 'IFFCO',
      logoUrl: iffcoLogo,
      industry: 'FMCG Conglomerate',
      partnershipYear: '2005',
      description: 'A leading international group manufacturing and marketing a diverse range of food products and services, known for their commitment to quality.',
      testimonial: 'Our long-standing partnership with Al-Fajar Sadiq has been pivotal in expanding our reach across the UAE. Their market expertise is unmatched.'
    },
    {
      name: 'Al Ghurair Foods',
      logoUrl: alghurairLogo,
      industry: 'Food Manufacturing',
      partnershipYear: '2008',
      description: 'A diversified industrial group with a strong presence in the food sector, providing essential food staples to the region.',
      testimonial: 'Al-Fajar Sadiq\'s distribution network is unparalleled. Their efficiency and reliability have been instrumental to our brand\'s growth in the Emirates.'
    },
    {
      name: 'Grand Mills',
      logoUrl: grandLogo,
      industry: 'Flour & Grain Milling',
      partnershipYear: '2010',
      description: 'A key player in the UAE\'s food industry, renowned for producing high-quality flour and grain-based products.',
      testimonial: 'Their commitment to timely delivery and understanding of our product requirements is something we can always rely on. They are a true partner.'
    },
    {
      name: 'Omani Gulf Food',
      logoUrl: amirLogo,
      industry: 'Food Distribution',
      partnershipYear: '2012',
      description: 'A prominent name in the regional food distribution sector, specializing in premium imported and locally sourced food items.',
      testimonial: 'Working with Al-Fajar Sadiq has streamlined our entire supply chain. Their market insights and professional approach are a huge asset.'
    },
    {
      name: 'AL-Khaleej Sugar',
      logoUrl: khaleejLogo,
      industry: 'Sugar Refining & Production',
      partnershipYear: '2015',
      description: 'The world\'s largest port-based sugar refinery, located in Dubai. AL-Khaleej Sugar is a global leader in producing high-quality refined white sugar for international markets.',
      testimonial: 'Al-Fajar Sadiq\'s logistical prowess ensures that our refined sugar reaches every corner of the UAE market efficiently. They are a vital link in our regional supply chain.'
    },
    {
      name: 'Jenan',
      logoUrl: jenanLogo,
      industry: 'Healthy Foods & Grains',
      partnershipYear: '2009',
      description: 'A flagship brand of Al Ghurair Foods, Jenan is synonymous with healthy living, offering a premium range of oats, barley, and whole-wheat flour products trusted by families.',
      testimonial: 'For a health-focused brand like Jenan, reliable distribution is key. Al-Fajar Sadiq ensures our products maintain their freshness from the mill to the shelf, every single time.'
    }
  ];

  const fundedCompanies = [
    {
      name: 'Al-Fajar Sadiq',
      logoUrl: hostLogo,
      category: 'Host & Incubator',
      description: 'The parent company fostering growth and providing the foundational distribution network for our family of brands.',
      performanceMetric: 'Market Share Growth',
      performanceValue: '+15%',
      Icon: Target,
    },
    {
      name: 'Habibi',
      logoUrl: habibiLogo,
      category: 'Snacks & Confectionery',
      description: 'A vibrant brand known for its innovative snacks that blend traditional flavors with modern appeal, capturing a loyal youth market.',
      performanceMetric: 'Year-over-Year Revenue',
      performanceValue: '+45%',
      Icon: TrendingUp,
    },
    {
      name: 'Safari Foods',
      logoUrl: safariLogo,
      category: 'Staple Grains & Pulses',
      description: 'A provider of high-quality essential food staples, Safari Foods is a trusted name in households across the UAE for its consistency.',
      performanceMetric: 'Retail Placements',
      performanceValue: '1,200+',
      Icon: Package,
    },
    {
      name: 'Namlet',
      logoUrl: namletLogo,
      category: 'Artisanal Beverages',
      description: 'Namlet revives classic Emirati beverages with a modern twist, using all-natural ingredients to create refreshing and nostalgic drinks.',
      performanceMetric: 'Customer Acquisition',
      performanceValue: '+30K',
      Icon: Users,
    },
    {
      name: 'Ferrari Foods',
      logoUrl: ferrariLogo,
      category: 'Premium Pasta & Sauces',
      description: 'Offering authentic Italian flavors, Ferrari Foods specializes in gourmet pasta and sauce products for the discerning consumer.',
      performanceMetric: 'Sales Volume (Units)',
      performanceValue: '500K+',
      Icon: DollarSign,
    },
  ];

  const benefits = [
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Rigorous quality control ensures only premium products reach our customers'
    },
    {
      icon: Globe,
      title: 'Wide Reach',
      description: 'Extensive distribution network covering all seven Emirates of the UAE'
    },
    {
      icon: Handshake,
      title: 'Strong Relationships',
      description: 'Long-term partnerships built on trust, reliability, and mutual success'
    },
    {
      icon: TrendingUp,
      title: 'Growth Focus',
      description: 'Dedicated to helping our partners expand and succeed in the UAE market'
    }
  ];

  const eventImages = [
    {
      src: event1,
      title: 'Grand Mills Company Members',
      description: 'Collaboration in action. Here, our team engages in a strategic planning session with key members from Grand Mills, ensuring our goals are aligned for seamless market distribution.'
    },
    {
      src: event2,
      title: 'Al Ghurair Foods Team Meetup',
      description: 'Celebrating shared success. This moment captures the camaraderie and strong professional bond we share with the Al Ghurair Foods team, a cornerstone of our long-standing partnership.'
    },
    {
      src: event3,
      title: 'Leadership Summit with Al Ghurair',
      description: 'Marking another milestone with leadership from Al Ghurair Foods. These events reinforce the trust and mutual respect that define our most valued business relationships.'
    }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- Carousel Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [eventImages.length]);


  return (
    <div 
      className="pt-0"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA',
      }}
    >
      <section id="partners-hero" className="relative h-screen flex items-center justify-center rounded-b-[4rem] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${partnerBg})`,
          }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAFAFA]">
          <motion.h1
            className="font-carsole text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our <span style={{ color: '#C6A664' }}>Trusted Partners</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building lasting relationships with premium manufacturers and suppliers across the globe.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#benefits" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">
              Partnership Benefits
            </a>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300">
              Partner With Us
              <Handshake className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#FAFAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      <section id="benefits" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Why Partners Choose Us
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-[#FAFAFA] p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <benefit.icon className="h-12 w-12 mx-auto mb-4" style={{ color: '#C6A664' }} />
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#234E70' }}>{benefit.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#707070' }}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Esteemed Partners
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {detailedPartners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="bg-[#FAFAFA] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-1/3 p-8 bg-[#FAFAFA] flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                  <img src={partner.logoUrl} alt={`${partner.name} logo`} className="max-h-24 object-contain"/>
                </div>
                <div className="w-full md:w-2/3 p-8">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold" style={{ color: '#234E70' }}>{partner.name}</h3>
                    <span className="text-sm font-medium bg-[#C6A664]/20 text-[#b5955a] px-3 py-1 rounded-full">
                      Partner Since {partner.partnershipYear}
                    </span>
                  </div>
                  <p className="text-sm font-semibold mb-4" style={{ color: '#707070' }}>
                    Industry: {partner.industry}
                  </p>
                  <p className="text-base mb-5 leading-relaxed" style={{ color: '#707070' }}>
                    {partner.description}
                  </p>
                  <div className="relative border-l-4 p-4" style={{ borderColor: '#C6A664' }}>
                    <Quote className="absolute -top-2 -left-3 h-8 w-8 opacity-15" style={{ color: '#C6A664' }} />
                    <p className="italic text-sm" style={{ color: '#707070' }}>
                      "{partner.testimonial}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Network of Funded Companies
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {fundedCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                className="bg-[#FAFAFA] rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-full md:w-1/3 p-8 bg-[#FAFAFA] flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
                  <img src={company.logoUrl} alt={`${company.name} logo`} className="max-h-24 object-contain"/>
                </div>
                <div className="w-full md:w-2/3 p-8">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-2xl font-bold" style={{ color: '#234E70' }}>{company.name}</h3>
                    <span className="text-sm font-medium bg-[#C6A664]/20 text-[#b5955a] px-3 py-1 rounded-full">
                      {company.category}
                    </span>
                  </div>
                  <p className="text-base mb-5 leading-relaxed" style={{ color: '#707070' }}>
                    {company.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4">
                    <company.Icon className="h-8 w-8 opacity-50" style={{ color: '#C6A664' }} />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: '#707070' }}>{company.performanceMetric}</p>
                      <p className="text-2xl font-bold" style={{ color: '#234E70' }}>{company.performanceValue}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AUTOMATIC CAROUSEL SECTION --- */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    className="relative"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="relative aspect-[4/3] rounded-2xl shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={eventImages[currentImageIndex].src}
                                alt={eventImages[currentImageIndex].title}
                                className="absolute inset-0 w-full h-full object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                            />
                        </AnimatePresence>
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                        {eventImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    currentImageIndex === index ? 'bg-[#C6A664] scale-125' : 'bg-gray-400/50 hover:bg-gray-400'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
                
                <motion.div
                    className="text-center lg:text-left"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 
                        className="text-3xl md:text-4xl font-bold mb-4"
                        style={{ color: '#234E70' }}
                    >
                        Moments of Collaboration
                    </h2>
                    <p 
                        className="text-lg mb-6 leading-relaxed"
                        style={{ color: '#707070' }}
                    >
                        Our success is built on more than just logistics; it's forged in the strong, personal relationships we cultivate with our partners. These moments reflect our shared journey and commitment to mutual growth.
                    </p>
                    <div className="bg-white/50 p-6 rounded-xl shadow-inner border border-gray-200/80 min-h-[150px] overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                          >
                              <h3 className="text-xl font-bold mb-2" style={{ color: '#234E70' }}>
                                  {eventImages[currentImageIndex].title}
                              </h3>
                              <p className="text-base" style={{ color: '#707070' }}>
                                  {eventImages[currentImageIndex].description}
                              </p>
                          </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>
      <section className="py-20 sm:py-24 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Become Our Next Success Story
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: '#707070' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join our network of successful partners and leverage our 27+ years of experience in the UAE market.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] transform hover:scale-105"
            >
              Partner With Us
              <Handshake className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Partners;