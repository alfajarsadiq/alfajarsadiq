import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Award, Truck, Globe, Users, Quote, Play, Pause, ArrowUpRight } from 'lucide-react';

// Video assets
import promoVideo from '/src/assets/hvid.webm';
import heroVideo from '/src/assets/hvid.webm';

// Partner logos
import iffcoLogo from '/src/assets/iffcologo.png';
import alghurairLogo from '/src/assets/alghurairlogo.png';
import grandLogo from '/src/assets/grandlogo.png';
import amirLogo from '/src/assets/amirlogo.png';
import khaleejLogo from '/src/assets/khaleejlogo.png';
import jenanLogo from '/src/assets/jenanlogo.png';

// Brand Network Logos
import hostLogo from '/src/assets/logo.png';
import habibiLogo from '/src/assets/habibilogo.png';
import safariLogo from '/src/assets/safarilogo.png';
import ferrariLogo from '/src/assets/ferrarilogo.png';
import namletLogo from '/src/assets/namletlogo.png';

// Imported background texture
import textureBg from '/src/assets/texture.webp';


interface AnimatedCounterProps {
  to: number;
  suffix: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ to, suffix }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      if (node) {
        const value = parseInt(node.textContent || '0', 10);
        const controls = animate(value, to, {
          duration: 1.5,
          ease: "easeOut",
          onUpdate(latest) {
            node.textContent = String(Math.round(latest));
          }
        });
        return () => controls.stop();
      }
    }
  }, [isInView, to]);
  
  return (
    <span className="flex items-center justify-center">
      <span ref={nodeRef}>0</span>
      <span>{suffix}</span>
    </span>
  );
};

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const volume = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const unsubscribe = volume.on("change", (latestVolume) => {
        if (!isMuted) video.volume = latestVolume;
      });
      return () => unsubscribe();
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isMuted) setIsMuted(false);
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <video
        ref={videoRef}
        src={promoVideo}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button 
        onClick={togglePlay} 
        className="absolute bottom-4 right-4 z-10 p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors duration-300"
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>
    </motion.div>
  );
};

const Home = () => {
  const brandData = {
      host: { id: 'al-fajar-sadiq', name: 'Al-Fajar Sadiq', logo: hostLogo },
      brands: [
          { id: 'habibi', name: 'Habibi', logo: habibiLogo, url: '#' },
          { id: 'safari-foods', name: 'Safari Foods', logo: safariLogo, url: '#' },
          { id: 'namlet', name: 'Namlet', logo: namletLogo, url: '#' },
          { id: 'ferrari-foods', name: 'Ferrari Foods', logo: ferrariLogo, url: '#' },
      ],
  };

  const stats = [
    { icon: Award, label: 'Years of Excellence', value: 27, suffix: '+' },
    { icon: Users, label: 'Trusted Partners', value: 500, suffix: '+' },
    { icon: Globe, label: 'Emirates Covered', value: 7, suffix: '' },
    { icon: Truck, label: 'Products Distributed', value: 1000, suffix: '+' },
  ];
  
  const partners = [
    { name: 'IFFCO', logoUrl: iffcoLogo },
    { name: 'Al Ghurair Foods', logoUrl: alghurairLogo },
    { name: 'Grand Mills', logoUrl: grandLogo },
    { name: 'Omani Gulf Food', logoUrl: amirLogo },
    { name: 'Al-Khaleej Sugar', logoUrl: khaleejLogo },
    { name: 'Jenan', logoUrl: jenanLogo },
  ];

  const testimonials = [
    { quote: "Al-Fajar Sadiq's distribution network is unparalleled. Their efficiency has been instrumental to our brand's growth.", name: "Ahmed Al Mansoori", title: "CEO, Global Food Group" },
    { quote: "Their commitment to quality and timely delivery is something we can always rely on. They are a true partner.", name: "Fatima Al Kuwaiti", title: "Supply Chain Manager, Pure Grains Co." },
    { quote: "Working with Al-Fajar Sadiq has streamlined our entire supply chain. Their market insights are a huge asset.", name: "John Smith", title: "Regional Director, Prime Beverages" }
  ];
  const products = [
    { name: 'Creamy Sella Rice', description: 'Premium, long-grain aromatic rice.', image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/rice.webp?raw=true' },
    { name: 'Vegetable Oil', description: 'Light, healthy, and perfect for all your cooking needs.', image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/oil.webp?raw=true' },
    { name: 'Kiwi Goli Soda', description: 'Nutritious, high-fiber flour for soft rotis.', image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/soda.webp?raw=true' },
    { name: 'Wheat Flour', description: 'Aromatic spices to elevate your dishes.', image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/flour.webp?raw=true' }
  ];
  return (
    <div 
      className="pt-24"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundAttachment: 'fixed',
        backgroundColor: '#FAFAFA',
      }}
    >
      <section className="relative h-screen -mt-24 overflow-hidden rounded-b-[4rem] shadow-2xl">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-b-[4rem]"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 z-10 rounded-b-[4rem]" />
        <div className="relative h-full flex items-center justify-center z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <h1 className="font-carsole tracking-wide text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-md" style={{ color: '#FAFAFA' }}>
                27+ Years of Excellence in 
                <span className="block" style={{ color: '#C6A664' }}>Trading & Distribution</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
                Connecting trusted partners with retailers across the UAE with premium commodities.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link to="/partners" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">
                Our Partners
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <stat.icon className="h-8 w-8 mx-auto mb-2" style={{ color: '#C6A664' }} />
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#234E70' }}><AnimatedCounter to={stat.value} suffix={stat.suffix} /></div>
                <div className="text-sm sm:text-base" style={{ color: '#707070' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div className="md:order-last" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}><VideoPlayer /></motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#234E70' }}>Our Legacy of Trust & Excellence</h2>
              <p className="text-base sm:text-lg mb-6 leading-relaxed" style={{ color: '#707070' }}>Since 1998, Al-Fajar Sadiq has been more than a name it has been a benchmark for excellence. But this reputation wasn't given it was earned in the trenches of a competitive landscape. We started with a simple, powerful conviction to build a distribution network powered by unwavering quality and unshakable reliability. We faced hurdles that seemed insurmountable, but our passion for the vision was greater than any fear of failure. We fought for every partnership, honored every promise, and delivered excellence when it would have been easier to compromise. Today, we are proud to be a cornerstone of the UAE's distribution network, a symbol of what is possible when a team's spirit refuses to be broken.</p>
              <Link to="/about" className="inline-flex items-center font-semibold transition-opacity" style={{ color: '#C6A664' }}>Learn More About Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#234E70' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Trusted by Leading Brands
          </motion.h2>
          <motion.p className="text-base sm:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#707070' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            Building lasting partnerships with premium manufacturers and suppliers from across the globe.
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{ backgroundColor: '#FAFAFA' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} logo`}
                  className="h-20 w-full object-contain"
                />
                <p className="mt-4 text-center text-sm font-semibold" style={{ color: '#234E70' }}>
                  {partner.name}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div className="mt-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
            <Link to="/partners" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">View All Partners <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
                className="text-3xl sm:text-4xl font-bold mb-4" 
                style={{ color: '#234E70' }} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6 }} 
                viewport={{ once: true }}
            >
                Our Network of Funded Companies
            </motion.h2>
            <motion.p 
                className="text-base sm:text-lg mb-12 max-w-2xl mx-auto" 
                style={{ color: '#707070' }} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.6, delay: 0.1 }} 
                viewport={{ once: true }}
            >
                Al-Fajar Sadiq proudly hosts and supports a growing family of innovative food brands.
            </motion.p>
            {/* --- UPDATED: New grid layout for funded companies --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {[brandData.host, ...brandData.brands].map((company, index) => (
                  <motion.div
                      key={company.id}
                      className="flex flex-col items-center justify-center p-8 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                      style={{ backgroundColor: '#FAFAFA' }}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                  >
                      <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="h-20 w-full object-contain"
                      />
                      <p className="mt-4 text-center text-sm font-semibold" style={{ color: '#234E70' }}>
                          {company.name}
                      </p>
                  </motion.div>
              ))}
            </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#234E70' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>What Our Partners Say</motion.h2>
          <motion.p className="text-base sm:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#707070' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>Our success is measured by the success of our partners.</motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={testimonial.name} className="p-8 rounded-lg shadow-lg relative" style={{ backgroundColor: '#FAFAFA' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <Quote className="absolute top-4 left-4 h-12 w-12 opacity-10" style={{ color: '#C6A664' }} />
                <p className="italic mb-6 text-left relative z-10" style={{ color: '#707070' }}>"{testimonial.quote}"</p>
                <div className="text-right">
                  <p className="font-bold" style={{ color: '#234E70' }}>{testimonial.name}</p>
                  <p className="text-sm" style={{ color: '#707070' }}>{testimonial.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#234E70' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            Our Flagship Products
          </motion.h2>
          <motion.p className="text-base sm:text-lg mb-12 max-w-2xl mx-auto" style={{ color: '#707070' }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
            A selection of our finest products, trusted by businesses across the UAE for their superior quality.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div key={index} className="group relative rounded-3xl overflow-hidden shadow-lg" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                <img src={product.image} alt={product.name} className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-[#FAFAFA]/80 backdrop-blur-sm p-2 rounded-full">
                  <ArrowUpRight className="h-6 w-6" style={{ color: '#234E70' }} />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <motion.div className="absolute bottom-0 left-0 w-full p-6 text-left" initial={{ y: '100%' }} whileHover={{ y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
                    <div className="bg-[#FAFAFA]/90 backdrop-blur-md p-4 rounded-xl -mb-24 group-hover:mb-0 transition-all duration-300">
                      <h3 className="text-lg font-bold" style={{ color: '#234E70' }}>{product.name}</h3>
                      <p className="text-sm" style={{ color: '#707070' }}>{product.description}</p>
                    </div>
                  </motion.div>
                   <h3 className="text-xl font-bold text-white relative z-10 transition-opacity duration-300 group-hover:opacity-0">{product.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative p-8 sm:p-12 rounded-2xl shadow-2xl overflow-hidden bg-cover bg-center" style={{ backgroundColor: '#1A1A1A', backgroundImage: `url('https://www.transparenttextures.com/patterns/az-subtle.png')` }}>
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center opacity-20" style={{ backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Simple_World_Map.svg/1280px-Simple_World_Map.svg.png')`}}></div>
            <div className="relative z-10 text-center">
              <motion.h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
                Ready to Expand Your Reach?
              </motion.h2>
              <motion.p className="text-base sm:text-lg mb-8 max-w-2xl mx-auto text-gray-200" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
                Partner with Al-Fajar Sadiq and leverage our extensive distribution network to grow your brand across the UAE.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
                <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">Get In Touch <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
