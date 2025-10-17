import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, X } from 'lucide-react';

// --- COMPONENT IMPORTS ---
import ProductHero from '../components/ProductHero';
import StickyProductShowcase from '../components/StickyProductShowcase';

// --- BRAND LOGO & ASSET IMPORTS ---
import textureBg from '../assets/texture.webp';
// import fajarLogo from '../assets/logo.png';
import iffcoLogo from '../assets/iffcologo.png';
import alghurairlogo from '../assets/alghurairlogo.png';
import grandmillslogo from '../assets/grandlogo.png';
// import sounlogo from '../assets/sounlogo.png';
import alainlogo from '../assets/alain.png';

// --- PRODUCT IMAGE IMPORTS ---
import alparathaimg from '../assets/alparatha.png';
import alafghanimg from '../assets/alafghan.png';
import jatta from '../assets/jatta.png';
import almaidaimg from '../assets/almaida.png';
import rawanpureimg from '../assets/rawanpure.png';
import rawanimg from '../assets/rawan.png';
import jmaida from '../assets/jmaida.png';
import zeinImg from '../assets/zein.png';
import rodhaoneImg from '../assets/rodhaone.png';
import rodhatwoImg from '../assets/rodhatwo.png';
import alharrisImg from '../assets/alharris.png';
import rotiImg from '../assets/roti.png';
import pakistanflourImg from '../assets/pakistanflour.png';
import alsemolinaImg from '../assets/alsemolina.png';

// --- NEW AL AIN PRODUCT IMPORTS ---
import superimg from '../assets/super.png';
import kbullimg from '../assets/kbull.png';
import allpurposeimg from '../assets/allpurpos.png';
import parathaimg from '../assets/paratha.png';


// --- Type definition for a product ---
interface Product {
    id: string; // Unique ID including brand
    name: string;
    image: string;
    description: string;
    features: string[];
}

// --- Brands Data (Updated to only show Al Ghurair and Al Ain) ---
const brands = [
  // { name: 'Al Fajar Al Sadiq', logo: fajarLogo, key: 'fajar' },
  { name: 'IFFCO', logo: iffcoLogo, key: 'iffco' },
  { name: 'Al Ghurair', logo: alghurairlogo, key: 'alghurair' },
  { name: 'Grand Mills', logo: grandmillslogo, key: 'grandmills' },
  { name: 'Al Ain Flour Mill', logo: alainlogo, key: 'alignfloor' },
  // { name: 'Sounbula Mills', logo: sounlogo, key: 'sounbula' },
];

// --- All Products Data (Updated with new Al Ain products) ---
const allProducts: Product[] = [
    // Al Fajar Products (Commented out)
    // ...

    // IFFCO Products (Commented out)
    // ...
    
    // Al Ghurair Products
    { id: 'alghurair-jenan-maida', name: 'Jenan Maida No 1', image: jmaida, description: 'Fine, silky maida perfect for authentic sweets and specialty breads.', features: ["Fine & Silky", "For Sweets", "Specialty Breads", "Premium Quality"] },
    { id: 'alghurair-jenan-atta', name: 'Jenan Atta No 2', image: jatta, description: 'A versatile, high-quality flour for all your baking and cooking needs.', features: ["All-Purpose", "Consistent Quality", "Ideal for Baking", "Fine Texture"] },
    { id: 'alghurair-afghan-maida', name: 'Afghan Maida', image: almaidaimg, description: 'Fine, silky maida perfect for authentic Afghan sweets and specialty breads.', features: ["Fine & Silky", "For Afghan Sweets", "Specialty Breads", "Premium Quality"] },
    { id: 'alghurair-afghan-atta', name: 'Afghan Atta', image: alafghanimg, description: 'Traditional Afghan whole wheat flour for making authentic, flavorful flatbreads.', features: ["Authentic Afghan Style", "Whole Wheat", "Rich Flavor", "Perfect for Naan"] },
    { id: 'alghurair-rawan-maida', name: 'Rawan Maida', image: rawanimg, description: 'A premium, pure refined flour known for its exceptional quality and baking performance.', features: ["Premium & Pure", "Fine Texture", "Excellent for Baking", "Consistent Results"] },
    { id: 'alghurair-rawan-atta', name: 'Rawan Atta', image: rawanpureimg, description: 'A premium, pure flour known for its exceptional quality and baking performance.', features: ["Premium & Pure", "Excellent for Baking", "Consistent Results", "High Quality"] },
    { id: 'alghurair-rodha-1', name: 'Rodha 1', image: rodhaoneImg, description: 'Premium quality flour, ideal for traditional bread making and daily culinary needs.', features: ["Premium Quality", "For Traditional Breads", "Versatile Use", "Consistent Results"] },
    { id: 'alghurair-rodha-2', name: 'Rodha 2', image: rodhatwoImg, description: 'A finer grade flour perfect for delicate pastries and specialized baking applications.', features: ["Fine Grade", "For Pastries & Cakes", "Silky Texture", "Excellent Performance"] },
    { id: 'alghurair-paratha-maida', name: 'Paratha Maida', image: alparathaimg, description: 'The perfect choice for deliciously flaky and layered parathas every time.', features: ["For Layered Parathas", "Fine Texture", "Easy to Knead", "Authentic Taste"] },
    { id: 'alghurair-harris', name: 'Harris', image: alharrisImg, description: 'Coarsely ground wheat for the traditional, hearty dish of Harees.', features: ["Coarsely Ground", "For Traditional Harees", "Nutritious & Hearty", "Authentic Texture"] },
    { id: 'alghurair-roti-flour', name: 'Roti Flour', image: rotiImg, description: 'Specially milled for soft, fluffy rotis that stay fresh for longer.', features: ["For Soft Rotis", "Easy to Knead", "Wholesome Goodness", "Stays Fresh Longer"] },
    { id: 'alghurair-pakistan-flour', name: 'Pakistan Flour', image: pakistanflourImg, description: 'A versatile flour ideal for making traditional Pakistani breads and snacks.', features: ["For Pakistani Cuisine", "Versatile Use", "Authentic Taste", "Great for Breads & Snacks"] },
    { id: 'alghurair-semolina-fine', name: 'Semolina Fine', image: alsemolinaImg, description: 'Fine semolina for smooth pasta, delicate desserts, and light coatings.', features: ["Fine Grade", "For Pasta & Desserts", "Smooth Texture", "High in Protein"] },
    { id: 'alghurair-zein-flour', name: 'Zein Flour', image: zeinImg, description: 'A specialty corn-based protein flour, ideal for gluten-free baking and creating edible food coatings.', features: ["Gluten-Free", "High in Protein", "Corn-Based", "Edible Food Coatings"] },

    // --- NEW: Al Ain Flour Mill Products ---
    { id: 'alignfloor-super-atta', name: 'Super Atta', image: superimg, description: 'A premium quality whole wheat atta, perfect for making soft and fluffy chapatis.', features: ["100% Whole Wheat", "Rich in Fiber", "Stone-Ground", "For Soft Rotis"] },
    { id: 'alignfloor-kbull-maida', name: 'K Bull Maida', image: kbullimg, description: 'A high-quality, all-purpose refined flour ideal for baking and traditional sweets.', features: ["All-Purpose Flour", "Fine & Silky Texture", "Excellent for Baking", "Premium Quality"] },
    { id: 'alignfloor-all-purpose', name: 'All Purpose Flour', image: allpurposeimg, description: 'A versatile and reliable all-purpose flour from Al Ain, suitable for everyday cooking and baking needs.', features: ["Multi-Purpose Use", "Reliable for Baking", "Enriched Flour", "For Everyday Cooking"] },
    { id: 'alignfloor-paratha-maida', name: 'Paratha Maida', image: parathaimg, description: 'Specially milled flour for creating delicious, flaky, and layered parathas with a perfect texture.', features: ["Ideal for Parathas", "Fine Refined Flour", "Soft Dough", "Ensures Flaky Layers"] },


    // Grand Mills Products (Commented out)
    // ...
    
    // Sounbula Mills Products (Commented out)
    // ...
];


const Products = () => {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const productSectionRef = useRef<HTMLDivElement>(null);

    const handleBrandSelect = (brandKey: string) => {
        setSelectedBrand(brandKey);
    };

    const handleGoBack = () => {
        setSelectedBrand(null);
        productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const filteredProducts = selectedBrand
        ? allProducts.filter(p => p.id.startsWith(selectedBrand))
        : [];
  
    const currentBrand = brands.find(b => b.key === selectedBrand);

    return (
        <div
            className="pt-0 relative"
            style={{
                backgroundImage: `url(${textureBg})`,
                backgroundColor: '#FAFAFA'
            }}
        >
            <ProductHero />

            <div ref={productSectionRef} className="py-20 sm:py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {!selectedBrand ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-16">
                      <h2 className="font-trusted text-3xl sm:text-4xl font-bold mb-6 text-[#234E70]">Our Family of Brands</h2>
                      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Explore our diverse range of products from trusted brands, each committed to quality and excellence.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      {brands.map((brand) => (
                        <motion.div
                          key={brand.key}
                          onClick={() => handleBrandSelect(brand.key)}
                          className="group cursor-pointer"
                          whileHover="hovered"
                        >
                          <div className="bg-white/80 backdrop-blur rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300 h-full flex flex-col justify-between aspect-square border border-gray-200/80">
                            <div className="p-6 flex-grow flex flex-col items-center justify-center">
                                <img src={brand.logo} alt={`${brand.name} logo`} className="h-20 md:h-24 object-contain" />
                            </div>
                            <div className="flex items-center justify-between p-4 border-t border-gray-200/80">
                                <h3 className="text-md font-semibold text-[#234E70]">{brand.name}</h3>
                                <motion.div 
                                    className="h-10 w-10 flex-shrink-0 rounded-full border border-gray-300 flex items-center justify-center text-neutral-500 transition-colors duration-300 group-hover:bg-[#234E70] group-hover:text-white"
                                    variants={{ rest: { rotate: 0 }, hovered: { rotate: 45 } }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowUpRight className="h-5 w-5" />
                                </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={selectedBrand}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                     <button 
                        onClick={handleGoBack} 
                        className="flex items-center gap-2 mb-10 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <ArrowLeft size={20} />
                        Back to Brands
                     </button>

                     {currentBrand && (
                        <StickyProductShowcase
                          title={`${currentBrand.name} Products`}
                          subtitle={`Our selection of premium products from ${currentBrand.name}.`}
                          products={filteredProducts}
                          imagePosition="right"
                          onEnquiry={(productName) => {
                            const product = allProducts.find(p => p.name === productName);
                            if (product) setSelectedProduct(product);
                          }}
                        />
                     )}

                    <div className="mt-20 text-center">
                        <motion.button
                            onClick={handleGoBack}
                            className="inline-flex items-center gap-3 px-8 py-3 bg-[#234E70] text-white rounded-full font-semibold shadow-lg"
                            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ChevronLeft size={20} />
                            View Other Brands
                        </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

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
