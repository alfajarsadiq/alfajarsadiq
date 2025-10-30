import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ChevronLeft, X } from 'lucide-react';

// --- COMPONENT IMPORTS ---
import ProductHero from '../components/ProductHero';
import StickyProductShowcase from '../components/StickyProductShowcase';
import FerrariFoodsCategories from '../components/FerrariFoodsCategories'; // The category component

// --- BRAND LOGO & ASSET IMPORTS ---
import textureBg from '../assets/texture.webp';
import ferrariLogo from '../assets/ferrarilogo.png';
import iffcoLogo from '../assets/iffcologo.png';
import alghurairlogo from '../assets/alghurairlogo.png';
import grandmillslogo from '../assets/grandlogo.png';
import alainlogo from '../assets/alain.png';
// import sounlogo from '../assets/sounlogo.png';

// --- PRODUCT IMAGE IMPORTS ---

// Al Ghurair Imports
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

// Al Ain Imports
import superimg from '../assets/super.png';
import kbullimg from '../assets/kbull.png';
import allpurposeimg from '../assets/allpurpos.png';
import parathaimg from '../assets/paratha.png';

// IFFCO Imports
import pakoneimg from '../assets/pak1.png';
import classiconeimg from '../assets/classic1.png';
import classictwoimg from '../assets/classic2.png';
import parathaMaidaImg from '../assets/parathamaida.png';
import iffcoAllPurposeImg from '../assets/allpurpose.png';
import paktwoimg from '../assets/pak2.png';
import tazaimg from '../assets/taza.png';

// Grand Mills Imports
import hareeswheatImg from '../assets/hareeswheat.png';
import flourn1Img from '../assets/flourn1.png';
import flourn2Img from '../assets/flourn2.png';
import malabarImg from '../assets/malabar.png';
import allbakingImg from '../assets/allbaking.png';
import semolineImg from '../assets/semolina.png';
import flourn3Img from '../assets/flourn3.png';
import pashtunimg from '../assets/pashtun.png';

// --- NEW: Ferrari Foods Rice Product Imports ---
import jeerakasalaImg from '../assets/jeerakasala.png';
import palakkadanImg from '../assets/palakkadan.png';
import creamysellaImg from '../assets/creamysella.png';
import basmati1121Img from '../assets/1121bas.png';
import goldenSellaImg from '../assets/goldensella.png';
import sonaimg from '../assets/sona.png';

// ferrari wheat
import arabicimg from '../assets/arabic.png';
import bakersimg from '../assets/bakers.png';
import allflourimg from '../assets/allflour.png';
import sspecialimg from '../assets/sspecial.png';
import sparathaimg from '../assets/sparatha.png';
import abakersimg from '../assets/bakers.png'; // Assuming this is the image for Ferrari Arabic Bakers Flour


// --- Type definition for a product ---
interface Product {
    id: string; // Unique ID including brand
    name: string;
    image: string;
    description: string;
    features: string[];
}

// --- Brands Data ---
const brands = [
  { name: 'Ferrari Foods LLC', logo: ferrariLogo, key: 'ferrari' },
  { name: 'IFFCO', logo: iffcoLogo, key: 'iffco' },
  { name: 'Al Ghurair', logo: alghurairlogo, key: 'alghurair' },
  { name: 'Grand Mills', logo: grandmillslogo, key: 'grandmills' },
  { name: 'Al Ain Flour Mill', logo: alainlogo, key: 'alignfloor' },
  // { name: 'Sounbula Mills', logo: sounlogo, key: 'sounbula' },
];

// --- All Products Data (Includes NEW Ferrari Rice & Wheat) ---
const allProducts: Product[] = [
    // --- NEW: Ferrari Foods Rice Products ---
    {
      id: 'ferrari-rice-noora-jeerakasala-rice', // Use 'ferrari-rice-' prefix
      name: 'Noora Jeerakasala Rice',
      image: jeerakasalaImg,
      description: 'A premium, aromatic short-grain rice known for its distinctive fragrance and flavor. Perfect for traditional dishes and biryanis.',
      features: ["Aromatic Short-Grain", "Perfect for Biryani", "Distinctive Fragrance", "Available in 18kg"]
    },
    {
      id: 'ferrari-rice-noora-palakkadan-matta-rice',
      name: 'Noora Palakkadan Matta Rice',
      image: palakkadanImg,
      description: 'Authentic Kerala Brown rice with a rich, earthy flavor and high nutritional value. Ideal for daily consumption and traditional recipes.',
      features: ["Authentic Kerala Brown Rice", "Rich, earthy Flavor", "High Nutritional Value", "Available in 18kg"]
    },
    {
      id: 'ferrari-rice-noora-creamy-sella-rice',
      name: 'Noora Creamy Sella Rice',
      image: creamysellaImg,
      description: 'A parboiled basmati rice known for its creamy texture and rich aroma. The grains are firm and separate, ideal for pilafs and biryanis.',
      features: ["Creamy Parboiled Basmati", "Rich Aroma", "Firm & Separate Grains", "Available in 40kg"]
    },
    {
      id: 'ferrari-rice-noora-1121-basmati-rice',
      name: 'Noora 1121 Basmati Rice',
      image: basmati1121Img,
      description: "Globally renowned for having the longest grain, the 1121 variety elongates to twice its length post-cooking, offering exceptional visual appeal.",
      features: ["World's Longest Grain", "Maximum Elongation", "Delicate Texture", "Premium Export Quality"]
    },
    {
      id: 'ferrari-rice-noora-1121-golden-sella',
      name: 'Noora 1121 Golden Sella',
      image: goldenSellaImg,
      description: "Parboiled 1121 Basmati that undergoes a process to retain more nutrients. The grains are golden, firm, and separate beautifully when cooked.",
      features: ["Golden Parboiled Grains", "Nutrient-Rich", "Firm & Non-Sticky", "Perfect for Biryani & Pilaf"]
    },
    {
      id: 'ferrari-rice-noora-indian-sonamasoori',
      name: 'Noora Indian Sonamasoori',
      image: sonaimg,
      description: "A lightweight and aromatic medium-grain rice, prized for its delicate texture and low starch content. A versatile and healthy choice for everyday meals, from steamed rice to flavorful pulao.",
      features: ["Lightweight & Aromatic", "Authentic South Indian Variety", "Low Starch & Easy to Digest", "Versatile for Daily Cooking"]
    },

    // --- NEW: Ferrari Foods Wheat Products ---
    {
        id: 'ferrari-wheat-arabic-flour',
        name: 'Ferrari Arabic Flour',
        image: arabicimg,
        description: 'Premium, high-quality flour specially formulated for authentic Arabic bread and bakery items, ensuring perfect texture and rise.',
        features: ["Ideal for Arabic Bread", "Excellent Rise", "Premium Quality", "Consistent Baking"]
    },
    {
        id: 'ferrari-wheat-bakers-flour',
        name: 'Ferrari Bakers Flour',
        image: bakersimg,
        description: 'A strong, high-protein flour preferred by professional bakers for achieving voluminous, soft, and chewy yeast breads.',
        features: ["High-Protein Content", "For Professional Baking", "Excellent for Yeast Breads", "Voluminous Rise"]
    },
    {
        id: 'ferrari-wheat-all-purpose-flour',
        name: 'Ferrari All Purpose Flour',
        image: allflourimg,
        description: 'A versatile, finely-milled flour suitable for almost any recipe, from cakes and cookies to thickening sauces.',
        features: ["Versatile & Multi-Purpose", "Finely Milled", "For Baking & Cooking", "Reliable Results"]
    },
    {
        id: 'ferrari-wheat-special-flour',
        name: 'Ferrari Special Flour',
        image: sspecialimg,
        description: 'A specialty blend designed for specific regional delicacies and professional culinary applications where a unique flour blend is required.',
        features: ["Specialty Blend", "Unique Texture & Taste", "For Specific Delicacies", "Professional Grade"]
    },
    {
        id: 'ferrari-wheat-paratha-flour',
        name: 'Ferrari Paratha Flour',
        image: sparathaimg,
        description: 'Specially crafted maida for making soft, thin, and perfectly layered parathas and other flaky flatbreads.',
        features: ["For Flaky Parathas", "Soft Dough", "Perfect Layering", "Easy to Roll"]
    },
    {
        id: 'ferrari-wheat-arabic-bakers-flour',
        name: 'Ferrari Arabic Bakers Flour',
        image: abakersimg,
        description: 'A unique blend combining the qualities of Arabic flour with the strength of a baker\'s flour, perfect for enhanced Arabic baked goods.',
        features: ["Unique Arabic & Baker's Blend", "Enhanced Baking Performance", "For Superior Flatbreads", "Reliable Consistency"]
    },


    // --- (Keep all your other brand product data below) ---
    // IFFCO Products
    { id: 'iffco-all-purpose-flour', name: 'All Purpose Wheat Flour', image: iffcoAllPurposeImg, description: 'A versatile and reliable all-purpose flour from IFFCO, suitable for everyday cooking and baking.', features: ["Multi-Purpose Use", "Reliable for Baking", "Enriched Flour", "Perfect for Everyday Cooking"] },
    { id: 'iffco-chakki-atta-pak-2', name: 'Pak 2 Wheat Flour', image: paktwoimg, description: 'Authentic stone-ground whole wheat flour, perfect for making soft and fluffy rotis.', features: ["Stone-Ground", "100% Whole Wheat", "High in Fiber", "For Soft Rotis"] },
    { id: 'iffco-taza-atta', name: 'Taza Flour', image: tazaimg, description: 'Freshly milled atta packed with nutrients, ideal for healthy and wholesome meals.', features: ["Freshly Milled", "Nutrient-Rich", "High in Dietary Fiber", "Perfect for Daily Cooking"] },
    { id: 'iffco-chakki-atta-pak-1', name: 'Pak 1 Wheat Flour', image: pakoneimg, description: 'Premium quality whole wheat atta, stone-ground to preserve its natural goodness.', features: ["Premium Whole Wheat", "Stone-Ground Goodness", "Natural Aroma", "Excellent for Flatbreads"] },
    { id: 'iffco-classic-flour-1', name: 'Classic Flour No. 1', image: classiconeimg, description: 'A superior quality all-purpose flour, finely milled for baking fluffy cakes and soft breads.', features: ["Superior All-Purpose Flour", "Fine & Silky Texture", "Excellent for Baking", "Consistent Performance"] },
    { id: 'iffco-classic-flour-2', name: 'Classic Flour No. 2', image: classictwoimg, description: 'A versatile flour perfect for a wide range of culinary uses, from traditional breads to fried delicacies.', features: ["Versatile & Multi-purpose", "Ideal for Breads & Frying", "Consistent Quality", "Reliable Results"] },
    { id: 'iffco-paratha-maida', name: 'Paratha Maida', image: parathaMaidaImg, description: 'Specially milled for creating flaky, layered parathas with a soft dough and perfect texture.', features: ["Ideal for Parathas", "Fine Refined Flour", "Soft Dough", "Ensures Flaky Layers"] },
    
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

    // Al Ain Flour Mill Products
    { id: 'alignfloor-super-atta', name: 'Super Atta', image: superimg, description: 'A premium quality whole wheat atta, perfect for making soft and fluffy chapatis.', features: ["100% Whole Wheat", "Rich in Fiber", "Stone-Ground", "For Soft Rotis"] },
    { id: 'alignfloor-kbull-maida', name: 'K Bull Maida', image: kbullimg, description: 'A high-quality, all-purpose refined flour ideal for baking and traditional sweets.', features: ["All-Purpose Flour", "Fine & Silky Texture", "Excellent for Baking", "Premium Quality"] },
    { id: 'alignfloor-all-purpose', name: 'All Purpose Flour', image: allpurposeimg, description: 'A versatile and reliable all-purpose flour from Al Ain, suitable for everyday cooking and baking needs.', features: ["Multi-Purpose Use", "Reliable for Baking", "Enriched Flour", "For Everyday Cooking"] },
    { id: 'alignfloor-paratha-maida', name: 'Paratha Maida', image: parathaimg, description: 'Specially milled flour for creating delicious, flaky, and layered parathas with a perfect texture.', features: ["Ideal for Parathas", "Fine Refined Flour", "Soft Dough", "Ensures Flaky Layers"] },

    // Grand Mills Products
    { id: 'grandmills-harees-wheat', name: 'Harees Wheat', image: hareeswheatImg, description: 'Premium quality crushed wheat, perfect for preparing the traditional dish, Harees.', features: ["Premium Crushed Wheat", "Ideal for Harees", "Nutritious & Hearty", "Available in 40kg"] },
    { id: 'grandmills-flour-no1', name: 'Flour No. 1', image: flourn1Img, description: 'A premium, high-quality patent flour perfect for making fine breads, cakes, and pastries.', features: ["Premium Patent Flour", "Ideal for Fine Breads", "Perfect for Cakes & Pastries", "Superior White Texture"] },
    { id: 'grandmills-chappati-atta', name: 'Chappati Atta', image: flourn2Img, description: 'An excellent quality atta milled to produce exceptionally soft and delicious chapatis.', features: ["Fine Milled Atta", "For Soft Chapatis", "Easy to Knead", "Wholesome Goodness"] },
    { id: 'grandmills-malabar-paratha-maida', name: 'Malabar Paratha Maida', image: malabarImg, description: 'The secret to perfect, flaky Malabar parottas. Formulated for high elasticity.', features: ["Specialty Paratha Flour", "For Flaky Layers", "High Elasticity", "Authentic Malabar Style"] },
    { id: 'grandmills-all-baking-flour', name: 'All Baking Flour', image: allbakingImg, description: 'Your go-to flour for all baking adventures. Perfectly balanced for cakes, cookies, and muffins.', features: ["Versatile Baking Flour", "Perfect for Cakes & Cookies", "Consistent Results", "Enriched & Pre-sifted"] },
    { id: 'grandmills-semolina', name: 'Semolina', image: semolineImg, description: 'Coarsely ground durum wheat, ideal for making traditional pasta, couscous, and upma.', features: ["Coarse Durum Wheat", "Ideal for Pasta & Upma", "Used in Desserts", "Rich in Protein"] },
    { id: 'grandmills-chakki-atta', name: 'Chakki Atta', image: flourn3Img, description: 'Authentic stone-ground whole wheat flour that locks in natural dietary fiber and aroma.', features: ["Authentic Chakki Fresh", "100% Whole Wheat", "High in Fiber", "For Soft & Fluffy Rotis"] },
    { id: 'grandmills-pashtun-flour-n1', name: 'Pashtun Flour No. 1', image: pashtunimg, description: 'A high-quality, fine Pashtun-style flour, perfect for creating authentic, soft traditional breads.', features: ["Authentic Pashtun Style", "Premium No. 1 Grade", "Ideal for Naan & Roti", "Fine, Soft Texture"] }
];


const Products = () => {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<'rice' | 'wheat' | null>(null); // NEW state for category
    const productSectionRef = useRef<HTMLDivElement>(null);

    const handleBrandSelect = (brandKey: string) => {
        setSelectedBrand(brandKey);
        setSelectedCategory(null); // Reset category when a new brand is selected
    };

    const handleGoBack = () => {
        // If a category is selected within Ferrari, go back to category view
        if (selectedBrand === 'ferrari' && selectedCategory) {
            setSelectedCategory(null);
        } else { // Otherwise, go back to brand view
            setSelectedBrand(null);
            setSelectedCategory(null); // Ensure category is reset
            productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // --- NEW: Function to handle category selection ---
    const handleCategorySelect = (category: 'rice' | 'wheat') => {
        setSelectedCategory(category);
    };

    // --- UPDATED: Filter logic based on brand and category ---
    const getFilteredProducts = () => {
        if (!selectedBrand) return [];
        if (selectedBrand === 'ferrari') {
            if (selectedCategory === 'rice') {
                return allProducts.filter(p => p.id.startsWith('ferrari-rice-'));
            }
            if (selectedCategory === 'wheat') {
                // ADDED: Filter for Ferrari Wheat Products
                return allProducts.filter(p => p.id.startsWith('ferrari-wheat-'));
            }
            return []; // No category selected yet for Ferrari
        }
        // For other brands
        return allProducts.filter(p => p.id.startsWith(selectedBrand + '-'));
    };

    const filteredProducts = getFilteredProducts();
  
    const currentBrand = brands.find(b => b.key === selectedBrand);
    const isFerrariBrand = selectedBrand === 'ferrari';

    // --- Determine Title and Subtitle ---
    let showcaseTitle = currentBrand ? `${currentBrand.name} Products` : '';
    let showcaseSubtitle = currentBrand ? `Our selection of premium products from ${currentBrand.name}.` : '';

    if (isFerrariBrand && selectedCategory) {
        showcaseTitle = `Ferrari Foods ${selectedCategory === 'rice' ? 'Rice' : 'Wheat'} Products`;
        showcaseSubtitle = `Explore our premium ${selectedCategory} selection.`;
    }

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
                  // --- Brand Selection View ---
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
                  // --- Category or Product View ---
                  <motion.div
                    key={selectedBrand + (selectedCategory || '')} // Key changes on brand OR category change
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                     <button 
                        onClick={handleGoBack} 
                        className="flex items-center gap-2 mb-10 text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                      >
                        <ArrowLeft size={20} />
                        {/* Change button text based on context */}
                        {isFerrariBrand && selectedCategory ? 'Back to Categories' : 'Back to Brands'}
                     </button>

                    {/* --- LOGIC: Show Categories OR Products --- */}
                    {isFerrariBrand && !selectedCategory ? (
                        <FerrariFoodsCategories onCategorySelect={handleCategorySelect} />
                    ) : (
                         // Show products if a category is selected OR if it's not the Ferrari brand
                        <StickyProductShowcase
                          title={showcaseTitle}
                          subtitle={showcaseSubtitle}
                          products={filteredProducts}
                          imagePosition="right"
                          onEnquiry={(productName) => {
                            const product = allProducts.find(p => p.name === productName);
                            if (product) setSelectedProduct(product);
                          }}
                        />
                    )}

                    {/* Only show "View Other Brands" button if not in Ferrari category view */}
                    {!(isFerrariBrand && !selectedCategory) && (
                        <div className="mt-20 text-center">
                            <motion.button
                                onClick={() => { setSelectedBrand(null); setSelectedCategory(null); }} // Always go fully back to brands
                                className="inline-flex items-center gap-3 px-8 py-3 bg-[#234E70] text-white rounded-full font-semibold shadow-lg"
                                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft size={20} />
                                View Other Brands
                            </motion.button>
                        </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* --- Product Detail Modal (Remains the same) --- */}
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
