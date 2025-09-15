import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Package, Leaf, Droplet, X } from 'lucide-react';

// --- Import local banner images with corrected paths ---
import productImg from '../assets/product.webp';
import productImg2 from '../assets/product2.webp';
import textureBg from '../assets/texture.webp';

// --- Type definition for a product ---
interface Product {
    name: string;
    category: string;
    image: string;
    description: string;
    packageOptions: string[];
}

const Products = () => {
    // --- UPDATED Product Categories Data ---
    const categories = [
        { name: 'All Products', icon: Package },
        { name: 'Grains & Flour', icon: Leaf },
        { name: 'Rice Varieties', icon: Package },
        { name: 'Beverages', icon: Droplet },
        { name: 'Household Essentials', icon: Package },
    ];

    // --- UPDATED Product Data with new descriptions and package options ---
    const products: Product[] = [
        {
            name: 'Chakke Fresh Atta',
            category: 'Grains & Flour',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/pr1.webp?raw=true',
            description: 'Stone-ground from the finest whole wheat grains, Chakke Fresh Atta is packed with fiber and nutrients. It produces exceptionally soft and fluffy rotis and chapatis every time.',
            packageOptions: ['1kg', '5kg', '10kg']
        },
        {
            name: 'Creamy Sella Rice',
            category: 'Rice Varieties',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/pr2.webp?raw=true',
            description: 'A premium parboiled Basmati rice known for its long, non-sticky grains and creamy texture after cooking. Perfect for creating exquisite biryanis, pulao, and fried rice.',
            packageOptions: ['1kg', '5kg', '20kg']
        },
        {
            name: 'Namlet Goli Soda',
            category: 'Beverages',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/soda.webp?raw=true',
            description: 'Experience the nostalgic fizz of classic Goli Soda. This refreshing, lemon-flavored carbonated drink is a timeless favorite for quenching thirst on a hot day.',
            packageOptions: ['200ml Bottle', 'Pack of 6', 'Pack of 24']
        },
        {
            name: 'Noora Basmati Rice',
            category: 'Rice Varieties',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/pr4.webp?raw=true',
            description: 'Characterized by its delightful aroma and slender grains that elongate beautifully when cooked. Noora Basmati Rice is the choice for those who appreciate authentic, aromatic Indian cuisine.',
            packageOptions: ['1kg', '5kg', '10kg']
        },
        {
            name: 'Fajar Tandoori Maida',
            category: 'Grains & Flour',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/pr5.webp?raw=true',
            description: 'Specially milled for high elasticity and fine texture, Fajar Tandoori Maida is the perfect all-purpose flour for making fluffy naans, bhaturas, and delectable baked goods.',
            packageOptions: ['500g', '1kg', '2kg']
        },
        {
            name: 'Fajar Plastic Product',
            category: 'Household Essentials',
            image: 'https://github.com/alfajarsadiq/alfajarsadiq/blob/main/src/assets/pr6.webp?raw=true',
            description: 'A range of high-quality, durable, and food-safe plastic containers. Ideal for storing grains, spices, and leftovers, keeping your kitchen organized and your food fresh.',
            packageOptions: ['Small Container', 'Medium Set', 'Large Jar']
        },
    ];

    const [activeCategory, setActiveCategory] = useState('All Products');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(product => {
        const matchesCategory = activeCategory === 'All Products' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // --- Carousel State and Data ---
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
        <div
            className="pt-0 relative"
            style={{
                backgroundImage: `url(${textureBg})`,
                backgroundColor: '#FAFAFA'
            }}
        >
            {/* --- Hero Carousel Section --- */}
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

            {/* --- Products Section --- */}
            <section className="py-20 sm:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center gap-8 mb-16">
                        <div className="relative w-full max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none z-10">
                                <Search className="text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-14 pr-6 py-4 rounded-full bg-white/40 backdrop-blur-md shadow-lg border border-white/20 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C6A664] transition-all duration-300"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-4">
                            {categories.map(category => {
                                const isActive = activeCategory === category.name;
                                return (
                                    <button
                                        key={category.name}
                                        onClick={() => setActiveCategory(category.name)}
                                        className={`relative flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out overflow-hidden group shadow-md
                                        ${ isActive
                                            ? 'bg-[#234E70] text-white'
                                            : 'bg-white/40 backdrop-blur-md text-gray-700 hover:text-white'
                                        }`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#234E70] to-[#C6A664] opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                        <div className="relative z-10 flex items-center gap-3">
                                            <category.icon className={`w-5 h-5 transition-colors duration-300 ${isActive ? 'text-[#C6A664]' : ''}`} />
                                            {category.name}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* --- Product Grid with Horizontal Cards --- */}
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.name}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, type: 'spring' }}
                                    className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-xl hover:translate-y-1 transition-all duration-300 flex flex-row h-48"
                                >
                                    {/* Image container (Left side) - fixed width */}
                                    <div className="flex-shrink-0 w-48 h-full overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                        />
                                    </div>

                                    {/* Content container (Right side) - flexible width - ALIGNMENT FIX APPLIED HERE */}
                                    <div className="p-5 pb-14 relative flex-grow">
                                        {/* Text content */}
                                        <div>
                                            <h3 className="text-lg font-bold text-[#234E70] mb-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500">
                                                {product.category}
                                            </p>
                                        </div>

                                        {/* Button container - Absolutely positioned for consistent alignment */}
                                        <div className="absolute bottom-5 right-5">
                                            <button
                                                onClick={() => setSelectedProduct(product)}
                                                className="px-5 h-9 rounded-full bg-[#234E70] text-white text-xs font-bold uppercase hover:bg-[#C6A664] hover:text-black transition-colors duration-300 shadow-[0_4px_10px_rgba(35,78,112,0.3)] flex items-center"
                                            >
                                                Inquiry
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* --- Premium Product Modal --- */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                            className="bg-[#1A1A1A] text-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative grid grid-cols-1 md:grid-cols-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="md:rounded-l-2xl overflow-hidden">
                                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover"/>
                            </div>

                            <div className="p-8 flex flex-col">
                                <h2 className="text-3xl font-bold text-[#C6A664] mb-4">{selectedProduct.name}</h2>
                                <p className="text-gray-300 mb-6 flex-grow">{selectedProduct.description}</p>
                                
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-400 mb-3">Package Options:</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedProduct.packageOptions.map(option => (
                                            <button key={option} className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-[#C6A664] hover:text-black transition-colors duration-200">
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button className="w-full mt-auto bg-[#C6A664] text-black font-bold py-3 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-[0_4px_14px_0_rgba(198,166,100,0.39)]">
                                    Request Quote
                                </button>
                            </div>

                             <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-gray-300 hover:text-white hover:bg-black/80 transition-all duration-200">
                                <X size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


export default Products;

