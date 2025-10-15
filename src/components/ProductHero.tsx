import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// --- Import local banner images ---
import productImg from '../assets/product.webp';
import productImg2 from '../assets/product2.webp';

const ProductHero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const heroSlides = [
        {
            image: productImg,
            title: 'Freshness in Every Grain',
            subtitle: 'Sourced from the finest fields to your table.'
        },
        {
            image: productImg2,
            title: 'The Heart of Every Kitchen',
            subtitle: 'Discover ingredients that inspire culinary excellence.'
        }
    ];

    const paginate = (newDirection: number) => {
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) return heroSlides.length - 1;
            if (nextIndex >= heroSlides.length) return 0;
            return nextIndex;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => paginate(1), 5000);
        return () => clearInterval(interval);
    }, []);

    const slideVariants = {
        enter: { opacity: 0, scale: 1.1 },
        center: { zIndex: 1, opacity: 1, scale: 1 },
        exit: { zIndex: 0, opacity: 0, scale: 1.05 }
    };

    return (
        <section className="relative h-screen overflow-hidden shadow-2xl rounded-b-[4rem]">
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentIndex}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
                        scale: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${heroSlides[currentIndex].image})` }}
                >
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
                        <div className="text-white px-4">
                            <motion.h1 className="font-carsole text-5xl sm:text-6xl md:text-7xl font-bold mb-6" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                                {heroSlides[currentIndex].title}
                            </motion.h1>
                            <motion.p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-8 text-gray-300" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                                {heroSlides[currentIndex].subtitle}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            
            <div className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20">
                <button onClick={() => paginate(-1)} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors duration-300 backdrop-blur-sm">
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>
            
            <div className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20">
                <button onClick={() => paginate(1)} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors duration-300 backdrop-blur-sm">
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                {heroSlides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${ currentIndex === index ? 'bg-white scale-125' : 'bg-white/50' }`} />
                ))}
            </div>
        </section>
    );
};

export default ProductHero;