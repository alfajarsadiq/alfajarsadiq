import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Placeholder image imports - replace with your actual images ---
import riceBg from '../assets/rice-bg.webp';
import wheatBg from '../assets/wheat-bg.webp';

interface FerrariFoodsCategoriesProps {
  onCategorySelect: (category: 'rice' | 'wheat') => void; // Callback function
}

const categories = [
    {
        name: 'Rice',
        key: 'rice', // Added key for identification
        description: 'Explore our premium selection of the finest rice grains from around the world.',
        backgroundImage: riceBg,
    },
    {
        name: 'Wheat',
        key: 'wheat', // Added key for identification
        description: 'Discover our high-quality wheat products, perfect for all your baking and cooking needs.',
        backgroundImage: wheatBg,
    },
];

const FerrariFoodsCategories: React.FC<FerrariFoodsCategoriesProps> = ({ onCategorySelect }) => {
    return (
        <div className="w-full">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="font-trusted text-3xl sm:text-4xl font-bold mb-4 text-[#234E70]">Our Core Products</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Ferrari Foods LLC specializes in the highest quality rice and wheat, sourced globally.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {categories.map((category) => (
                    <motion.div
                        key={category.name}
                        onClick={() => onCategorySelect(category.key as 'rice' | 'wheat')} // Trigger callback on click
                        className="group relative block rounded-2xl shadow-lg overflow-hidden h-96 cursor-pointer" // Added cursor-pointer
                        whileHover="hover"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-105"
                            style={{ backgroundImage: `url(${category.backgroundImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        
                        <div className="relative h-full flex flex-col justify-end p-8 text-white">
                            <h3 className="text-4xl font-bold mb-2">{category.name}</h3>
                            <p className="text-lg text-gray-200">{category.description}</p>
                            
                            <motion.div
                                className="absolute top-6 right-6 h-12 w-12 rounded-full border border-white/50 flex items-center justify-center text-white/80 transition-colors duration-300 group-hover:bg-white group-hover:text-black"
                                variants={{ rest: { rotate: 0 }, hover: { rotate: 45 } }}
                                transition={{ duration: 0.3 }}
                            >
                                <ArrowUpRight className="h-6 w-6" />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FerrariFoodsCategories;