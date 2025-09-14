import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Partners from './pages/Partners';
import Infrastructure from './pages/Infrastructure';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';

// --- This is a simple hook for window size, it can be moved to its own file ---
const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  React.useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};

// --- Floating Customer Care button ---
const FloatingCustomerCare = () => {
  const navigate = useNavigate();
  const [width] = useWindowSize();

  return (
    <motion.div
      drag
      dragConstraints={{ left: 8, right: width - 80, top: 8, bottom: window.innerHeight - 80 }}
      dragMomentum={false}
      className="fixed bottom-6 right-6 z-40 cursor-pointer"
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/contact')}
    >
       <div className="group relative flex items-center justify-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#234E70] shadow-lg transition-all duration-300 md:h-16 md:w-16 md:group-hover:w-48">
          <Headphones className="h-7 w-7 text-[#C6A664] transition-transform duration-300 md:h-8 md:w-8 md:group-hover:-translate-x-12" />
          <span className="absolute right-6 text-lg font-semibold text-[#C6A664] opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
            Contact Us
          </span>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [isPreloading, setIsPreloading] = useState(true);
  const mainContentRef = useRef<HTMLElement>(null);

  // --- UPDATED: Added audio file to the critical assets list ---
  const criticalAssets = [
    '/truckaudio.wav', // Audio file
    '/pretruck.webm',   // Main video file
    '/pretruck.mp4',    // Fallback video file
    '/hero-image.jpg',  // Example hero image
    '/some-data.json',  // Example JSON data
  ];

  const handleFinish = () => {
    setIsPreloading(false);
    // Return focus to the main content for accessibility
    setTimeout(() => mainContentRef.current?.focus(), 0);
  };
  
  const isFinished = !isPreloading;

  return (
    <Router>
      <ScrollToTop />
      
      <AnimatePresence>
        {isPreloading && (
          <Preloader
            videoSrc="/pretruck.webm"
            mp4Fallback="/pretruck.mp4"
            poster="/preloader-poster.jpg"
            criticalAssets={criticalAssets}
            onFinish={handleFinish}
          />
        )}
      </AnimatePresence>
      
      <div 
        className={`min-h-screen bg-[#FAFAFA] flex flex-col transition-opacity duration-500 ${isFinished ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden={!isFinished}
      >
        <Navbar />
        <main 
          ref={mainContentRef} 
          tabIndex={-1} 
          className="flex-grow outline-none"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/infrastructure" element={<Infrastructure />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <FloatingCustomerCare />
        <Footer />
      </div>
    </Router>
  );
}

export default App;