import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ChevronDown, Sun, Moon } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';

// --- Imported assets ---
import textureBg from '/src/assets/texture.webp';
import contactBg from '/src/assets/contact.webp';
import warehouseIcon from '/src/assets/warehouse.svg'; // Import the custom SVG icon

// --- Type declaration to inform TypeScript about the global initMap function ---
declare global {
  interface Window {
    initMap: () => void;
  }
}

// --- Define a type for our form data ---
interface IFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ submitted: false, message: '', isError: false });
  const [isMapDark, setIsMapDark] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const offices = [
    {
      name: 'Dubai Head Office',
      address: 'Ferrari Foods LLC Dubai Branch',
      phone: '+971 558867751',
      email: 'info@alfajarsadiq.com',
      hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
      bgImage: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/dubai.webp?raw=true',
      position: { lat: 25.295457092611727, lng: 55.389022524552274 }
    },
    {
      name: 'Abu Dhabi Branch',
      address: 'Al-Fajar Al Sadiq, Industrial Zone, Abu Dhabi, UAE',
      phone: '+971 585639040',
      email: 'info@alfajarsadiq.com',
      hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
      bgImage: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/abudubai.webp?raw=true',
      position: { lat: 24.38, lng: 54.45 }
    },
    {
      name: 'Sharjah Office',
      address: 'Al-Fajar Al Sadiq, Industrial Area, Sharjah, UAE',
      phone: '+971 585639040',
      email: 'info@alfajarsadiq.com',
      hours: 'Mon - Fri: 8:00 AM - 6:00 PM',
      bgImage: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/sharjah.webp?raw=true',
      position: { lat: 25.32, lng: 55.40 }
    }
  ];

  const faqData = [
    {
      question: "What kind of products does Al-Fajar Sadiq trade?",
      answer: "We are a general trading company dealing in a wide range of products across various sectors. For specific product inquiries, please get in touch with our sales team through the contact form."
    },
    {
      question: "How can I get a quote for a bulk order?",
      answer: "For bulk order quotations, please fill out the contact form with your detailed requirements, including product names, quantities, and delivery location. Our business development team will respond promptly."
    },
    {
      question: "What are your office hours?",
      answer: "Our standard office hours are from 8:00 AM to 6:00 PM, Sunday through Thursday. We are closed on Fridays, Saturdays, and public holidays in the UAE."
    },
    {
      question: "How can I become a supplier or partner?",
      answer: "We are always open to new partnerships. Please send your company profile and proposal to our procurement department at info@alfajarsadiq.ae, and we will review it for potential collaboration."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we have a robust logistics network and offer international shipping to many destinations worldwide. Please contact us to discuss your specific shipping and logistics needs."
    }
  ];

  // --- FORM SUBMISSION LOGIC ---
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setStatus({ submitted: false, message: '', isError: false });

    const API_URL = import.meta.env.VITE_API_URL;

    if (!API_URL) {
      console.error("API URL is missing. Please set VITE_API_URL in your .env file.");
      setStatus({ submitted: true, message: "Application configuration error. API URL is not set.", isError: true });
      setIsLoading(false);
      return;
    }

    try {
      // --- FIX: Appended '/contact' to the API URL ---
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An error occurred while sending the message.');
      }
      
      setStatus({ submitted: true, message: result.message || 'Message sent successfully!', isError: false });
      reset();
    } catch (error: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error instanceof SyntaxError) {
        // This catches the "Unexpected token '<'" error
        errorMessage = "Received an invalid response from the server. Please try again.";
      } else if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to the server. Please check your internet connection.';
      } else {
        errorMessage = error.message;
      }
      setStatus({ submitted: true, message: errorMessage, isError: true });
    } finally {
      setIsLoading(false);
    }
  };


  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  // --- Google Maps Integration ---
  useEffect(() => {
    // --- UPDATED: API Key is now fetched from the .env file ---
    const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; 

    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API key is missing. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");
      return;
    }

    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        window.initMap();
        return;
      }
      if (document.getElementById('google-maps-script')) return;

      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      window.initMap = initMap;
      document.head.appendChild(script);
    };

    const initMap = () => {
        if (!mapRef.current) return;

        const mapStyles = {
            dark: [
                { "featureType": "all", "elementType": "labels", "stylers": [{ "visibility": "on" }] },
                { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#000000" }, { "lightness": 40 }] },
                { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#000000" }, { "lightness": 16 }] },
                { "featureType": "all", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] },
                { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#000000" }, { "lightness": 17 }, { "weight": 1.2 }] },
                { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] },
                { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#c4c4c4" }] },
                { "featureType": "administrative.neighborhood", "elementType": "labels.text.fill", "stylers": [{ "color": "#e5c163" }] },
                { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 20 }] },
                { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 21 }, { "visibility": "on" }] },
                { "featureType": "poi.business", "elementType": "geometry", "stylers": [{ "visibility": "on" }] },
                { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#e5c163" }, { "lightness": "0" }] },
                { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "visibility": "off" }] },
                { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
                { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [{ "color": "#e5c163" }] },
                { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 18 }] },
                { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [{ "color": "#575757" }] },
                { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
                { "featureType": "road.arterial", "elementType": "labels.text.stroke", "stylers": [{ "color": "#2c2c2c" }] },
                { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 16 }] },
                { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#999999" }] },
                { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 19 }] },
                { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }, { "lightness": 17 }] }
            ],
            light: [],
        };

        const map = new window.google.maps.Map(mapRef.current, {
            center: { lat: 25.295457092611727, lng: 55.389022524552274 },
            zoom: 16,
            disableDefaultUI: true,
            styles: isMapDark ? mapStyles.dark : mapStyles.light,
        });

        offices.forEach(office => {
            const infoWindow = new window.google.maps.InfoWindow({
                content: `<div style="color: #1A1A1A; font-family: Inter, sans-serif; padding: 5px;"><strong>${office.name}</strong><p style="margin: 5px 0 0;">${office.address}</p></div>`,
            });

            const marker = new window.google.maps.Marker({
                position: office.position,
                map: map,
                icon: {
                    url: warehouseIcon,
                    scaledSize: new window.google.maps.Size(50, 50),
                    anchor: new window.google.maps.Point(25, 50),
                },
                animation: window.google.maps.Animation.DROP,
                title: office.name,
            });

            marker.addListener('mouseover', () => infoWindow.open({ anchor: marker, map }));
            marker.addListener('mouseout', () => infoWindow.close());
        });
    };
    
    loadGoogleMapsScript();

  }, [isMapDark]);

  return (
    <div 
      className="pt-0"
      style={{
        backgroundImage: `url(${textureBg})`,
        backgroundColor: '#FAFAFA',
      }}
    >
      {/* --- Section 1: Contact Hero --- */}
      <section id="contact-hero" className="relative h-screen flex items-center justify-center rounded-b-[4rem] overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${contactBg})` }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/50 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-[#FAFAFA]">
          <motion.h1
            className="font-carsole text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In <span style={{ color: '#C6A664' }}>Touch</span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ready to start a partnership? We're here to help you succeed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a href="#contact-form" className="inline-flex items-center justify-center px-8 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a]">
              Send a Message
            </a>
            <a href="#office-locations" className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#C6A664] text-[#C6A664] font-semibold rounded-lg hover:bg-[#C6A664] hover:text-[#1A1A1A] transition-all duration-300">
              Our Locations
            </a>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-[#FAFAFA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* --- Section 2: Contact Form --- */}
      <section id="contact-form" className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#FAFAFA] p-8 sm:p-10 rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#234E70' }}>Send Us a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Full Name *</label>
                    <input type="text" {...register('name', { required: 'Name is required' })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent transition-all duration-200" placeholder="Your full name" />
                    {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message as string}</p>)}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Email Address *</label>
                    <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent transition-all duration-200" placeholder="your.email@example.com" />
                    {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Subject *</label>
                  <input type="text" {...register('subject', { required: 'Subject is required' })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent transition-all duration-200" placeholder="What is this regarding?" />
                  {errors.subject && (<p className="text-red-500 text-sm mt-1">{errors.subject.message as string}</p>)}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#707070' }}>Message *</label>
                  <textarea {...register('message', { required: 'Message is required' })} rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C6A664] focus:border-transparent transition-all duration-200" placeholder="Tell us about your business needs..." />
                  {errors.message && (<p className="text-red-500 text-sm mt-1">{errors.message.message as string}</p>)}
                </div>
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300 bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
                {status.submitted && (
                  <p className={`text-center font-semibold mt-4 ${status.isError ? 'text-red-500' : 'text-green-600'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: Office Locations --- */}
      <section id="office-locations" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our Offices
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <motion.div
                key={office.name}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={office.bgImage} alt={`${office.name} office`} className="w-full h-32 object-cover" />
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-[#234E70] mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 text-gray-600 text-sm">
                        <MapPin className="h-5 w-5 text-[#C6A664] flex-shrink-0 mt-0.5" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Phone className="h-5 w-5 text-[#C6A664] flex-shrink-0" />
                        <span>{office.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Clock className="h-5 w-5 text-[#C6A664] flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-right">
                    <a
                      href={`mailto:${office.email}`}
                      className="inline-flex items-center px-5 py-2 rounded-full bg-[#C6A664] text-[#1A1A1A] hover:bg-[#b5955a] font-semibold transition-all duration-300 text-sm"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 4: UPDATED Map Section with Mobile Fixes --- */}
      <section id="map-section" className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Find Us
          </motion.h2>

          <div className="relative">
            <motion.div
              className="absolute top-4 left-4 right-4 z-10 md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-auto md:max-w-lg"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-black/60 backdrop-blur-md rounded-xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg border border-[#C6A664]/50 text-white text-[10px] sm:text-sm flex flex-wrap items-center justify-center text-center gap-x-3 sm:gap-x-4 gap-y-2">
                <span>📍 Ferrari Foods LLC, Dubai</span>
                <span>📞 +971 558867751</span>
                <span className="hidden xs:inline">⏰ Mon-Fri: 8AM-6PM</span>
              </div>
            </motion.div>

             <motion.div
              className="absolute top-4 right-4 z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => setIsMapDark(!isMapDark)}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-[#C6A664]/30 transition-colors duration-300"
                aria-label="Toggle map theme"
              >
                {isMapDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </motion.div>

            <motion.div
              className="rounded-2xl shadow-lg overflow-hidden border-2 border-[#C6A664]/30"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div ref={mapRef} style={{ height: '450px', width: '100%', backgroundColor: '#000000' }}></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* --- Section 5: FAQ Section --- */}
      <section className="pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12"
            style={{ color: '#234E70' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>

          <motion.div 
            className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg space-y-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {faqData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 last:border-b-0 py-2">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center text-left py-3 focus:outline-none"
                >
                  <span className="text-md md:text-lg font-medium" style={{ color: '#234E70' }}>{item.question}</span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={`h-6 w-6 transition-transform duration-300`} style={{ color: '#C6A664' }}/>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3, ease: 'easeInOut' } }}
                      exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
                      className="overflow-hidden"
                    >
                      <p className="leading-relaxed pt-2 pb-4 pr-6" style={{ color: '#707070' }}>
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
