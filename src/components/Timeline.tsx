import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the shape of a single timeline item, adopted from the new design
type TimelineItem = {
  year: string;
  title: string;
  description: string;
  height: number; // Represents the height of the bar
  color: string;
};

// --- Data for Section: 8 milestones selected for the new design ---
const timelineData: TimelineItem[] = [
    { year: '1998', title: 'Foundation', description: 'Company founded in Dubai with a vision to revolutionize general trading.', height: 100, color: '#4a7c9b' },
    { year: '2005', title: 'UAE Expansion', description: 'Expanded operations to cover all seven Emirates of the UAE.', height: 140, color: '#3d6983' },
    { year: '2010', title: 'Strategic Partnerships', description: 'Established strategic partnerships with leading international suppliers.', height: 180, color: '#31566c' },
    { year: '2015', title: 'Warehouse Facilities', description: 'Opened state-of-the-art warehouse facilities in key locations.', height: 220, color: '#c6a664' },
    { year: '2018', title: 'Product Diversification', description: 'Diversified our product lines to serve a broader market.', height: 260, color: '#b5955a' },
    { year: '2020', title: 'Digital Transformation', description: 'Implemented advanced logistics technology and digital processes.', height: 300, color: '#a38550' },
    { year: '2023', title: 'Market Leadership', description: 'Recognized as a leading distributor in the region for service and reliability.', height: 340, color: '#927446' },
    { year: '2025', title: 'Celebrating Growth', description: 'Celebrating over 27 years of excellence and continued growth.', height: 380, color: '#80633c' },
];

const Timeline = () => {
    const [hoveredYear, setHoveredYear] = useState<string | null>(null);

    return (
        <section className="py-20 sm:py-24 relative overflow-hidden">
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

                <div className="relative flex justify-center items-end h-[480px] gap-4 md:gap-6 px-4">
                    {timelineData.map((item, index) => (
                        <div
                            key={item.year}
                            className="relative flex-1 h-full flex flex-col justify-end items-center"
                            onMouseEnter={() => setHoveredYear(item.year)}
                            onMouseLeave={() => setHoveredYear(null)}
                        >
                            {/* Description Tooltip */}
                            <AnimatePresence>
                                {hoveredYear === item.year && (
                                    <motion.div
                                        className="absolute -top-4 w-48 p-3 bg-[#1A1A1A] text-white rounded-lg shadow-xl z-10 text-center"
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <h3 className="font-bold text-md text-[#C6A664]">{item.title}</h3>
                                        <p className="text-xs text-gray-300 mt-1">{item.description}</p>
                                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#1A1A1A] transform rotate-45"></div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* The Bar */}
                            <motion.div
                                className="w-full rounded-t-lg cursor-pointer"
                                style={{ backgroundColor: item.color }}
                                initial={{ height: 0 }}
                                whileInView={{ height: item.height }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            />
                            
                            {/* Year Label */}
                            <p className="mt-3 font-bold text-sm text-[#234E70]">{item.year}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;