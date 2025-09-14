// src/pages/About.tsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Target, Eye, Heart, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';

// ✅ Use relative paths (pages -> assets)
import textureBg from '../assets/texture.webp';
import aboutHero from '../assets/about.webp';
// --- NEW: Founder's image ---
import founderImage from '../assets/founder.jpg'; 

const About = () => {
  const values = [
    { icon: Award, title: 'Excellence', description: 'Committed to delivering the highest quality products and services to our partners and customers.' },
    { icon: Target, title: 'Reliability', description: 'Building trust through consistent performance and dependable supply chain solutions.' },
    { icon: Eye, title: 'Innovation', description: 'Embracing modern technologies and methods to enhance our trading and distribution capabilities.' },
    { icon: Heart, title: 'Integrity', description: 'Conducting business with honesty, transparency, and ethical practices in all our relationships.' },
  ];

  const milestones = [
    { year: '1998', event: 'Company founded in Dubai with a vision to revolutionize general trading.' },
    { year: '2005', event: 'Expanded operations to cover all seven Emirates of the UAE.' },
    { year: '2010', event: 'Established strategic partnerships with leading international suppliers.' },
    { year: '2015', event: 'Opened state-of-the-art warehouse facilities in key locations.' },
    { year: '2020', event: 'Implemented advanced logistics technology and digital transformation.' },
    { year: '2025', event: 'Celebrating over 27 years of excellence and continued growth.' },
  ];

  const journeyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: journeyRef,
    offset: ['start center', 'end center'],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <div
      className="pt-0"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA',
      }}
    >
      {/* HERO */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden shadow-2xl rounded-b-[4rem]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutHero})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/55 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAFAFA]">
          <motion.h1
            className="font-carsole text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About <span className="text-[#C6A664]">Al-Fajar Sadiq</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A legacy of trust, excellence, and innovation in general trading and distribution.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            <Link
              to="/partners"
              className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]"
            >
              Our Partners
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="md:order-last"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="src/assets/aboutt.webp"
                alt="Al-Fajar Sadiq trading operations"
                className="w-full h-auto object-cover rounded-2xl shadow-xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-trusted text-3xl sm:text-4xl font-bold mb-6 text-[#234E70]">
                Our Story
              </h2>
              <p className="text-base sm:text-lg mb-6 leading-relaxed text-[#707070]">
                Founded in 1998, Al-Fajar Sadiq General Trading LLC started as a small trading firm in
                Dubai with little more than determination and a vision. The early years were filled with
                challenges, but with hard work, resilience, and an unshakable commitment to our mission,
                we turned every struggle into an opportunity to grow and earn the trust of our partners
                and retailers.
              </p>
              <p className="text-base sm:text-lg leading-relaxed text-[#707070]">
                Today, after over 27 years of perseverance and progress, we have grown into a trusted
                distribution powerhouse, proudly serving retailers across all seven Emirates. Our journey
                is more than business — it is a story of grit, faith, and ambition, inspired by the belief
                that with dedication and trust, success is always within reach.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Target className="h-10 w-10 mx-auto mb-4 text-[#C6A664]" />
              <h3 className="font-trusted text-2xl font-bold mb-3 text-[#234E70]">Our Mission</h3>
              <p className="leading-relaxed text-[#707070]">
                To provide exceptional trading and distribution services that connect quality suppliers
                with retailers, fostering growth and success.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Eye className="h-10 w-10 mx-auto mb-4 text-[#C6A664]" />
              <h3 className="font-trusted text-2xl font-bold mb-3 text-[#234E70]">Our Vision</h3>
              <p className="leading-relaxed text-[#707070]">
                To be the UAE&apos;s leading general trading company, recognized for excellence,
                innovation, and unwavering commitment to our partners.
              </p>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart className="h-10 w-10 mx-auto mb-4 text-[#C6A664]" />
              <h3 className="font-trusted text-2xl font-bold mb-3 text-[#234E70]">Our Values</h3>
              <p className="leading-relaxed text-[#707070]">
                Excellence, integrity, reliability, and innovation guide every aspect of our business,
                ensuring we deliver value that exceeds expectations.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <value.icon className="h-8 w-8 mb-4 text-[#C6A664]" />
                <h4 className="text-lg font-semibold mb-2 text-[#234E70]">{value.title}</h4>
                <p className="text-sm leading-relaxed text-[#707070]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- UPDATED: FOUNDER PROFILE CARD SECTION --- */}
      <section className="py-20 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8 items-center bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="md:col-span-1 flex justify-center">
              <motion.img
                src={founderImage}
                alt="Founder of Al-Fajar Sadiq, Mr. Siddique"
                className="w-48 h-48 rounded-full object-cover border-4 border-[#C6A664] shadow-md -mb-16 md:mb-0 md:-ml-4"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="md:col-span-2 text-center md:text-left pt-16 md:pt-0">
              <h2 className="font-trusted text-3xl font-bold text-[#234E70] mb-2">
                Mr. Siddique
              </h2>
              <p className="text-lg font-semibold text-[#C6A664] mb-4">
                Founder & Visionary Leader
              </p>
              <Quote className="w-8 h-8 text-[#234E70]/20 mb-2 mx-auto md:mx-0" />
              <p className="text-[#707070] italic leading-relaxed">
                "Our journey began with a simple vision: to build a distribution network founded on trust and an unwavering commitment to quality. Today, that vision is the bedrock of our success, driving us to continuously innovate and exceed the expectations of our partners."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section ref={journeyRef} className="py-20 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="font-trusted text-3xl sm:text-4xl font-bold text-center mb-20 text-[#234E70]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Journey of Excellence
          </motion.h2>

          <div className="hidden md:block relative h-[360px]">
            <svg width="100%" height="100%" viewBox="0 0 1200 360" preserveAspectRatio="none" className="absolute top-0 left-0">
              <motion.path
                d="M 40 180 C 160 40, 280 320, 480 180 S 680 40, 880 180 S 1080 320, 1160 180"
                fill="none"
                stroke="#234E70"
                strokeWidth="3"
                style={{ pathLength }}
              />
            </svg>

            <div className="absolute inset-0">
              {milestones.map((m, i) => {
                const x = [6, 24, 42, 60, 78, 92][i];
                const y = [0, -110, 110, -110, 110, 0][i];
                return (
                  <motion.div
                    key={m.year}
                    className="absolute -translate-x-1/2"
                    style={{ left: `${x}%`, top: '50%' }}
                    initial={{ opacity: 0, y: y + 30 }}
                    whileInView={{ opacity: 1, y }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    viewport={{ root: journeyRef, amount: 0.4, once: true }}
                  >
                    <div className="relative p-5 bg-white/90 backdrop-blur rounded-2xl shadow-lg w-56 text-center">
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#C6A664] text-[#1A1A1A] font-bold text-sm rounded-full shadow">
                        {m.year}
                      </div>
                      <p className="text-sm pt-3 leading-relaxed text-[#707070]">{m.event}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="md:hidden relative space-y-12 before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-[#234E70]/20">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="relative flex items-start"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-[#C6A664] text-[#1A1A1A] font-bold text-sm rounded-full z-10 shadow mt-4">
                  {m.year}
                </div>
                <div className="flex-1 bg-white/90 backdrop-blur p-4 rounded-lg shadow-md ml-6">
                  <p className="text-sm leading-relaxed text-[#707070]">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;