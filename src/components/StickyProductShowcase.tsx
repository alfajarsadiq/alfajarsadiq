import React, { useState, useRef, useEffect } from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';

// --- Type Definition ---
type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  features: string[];
};

// --- Animation Variants ---
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const imageVariants: Variants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] } },
};

const contentContainerVariants: Variants = {
    visible: { transition: { staggerChildren: 0.1 } }
};

// --- Reusable Panel Component (Internal to this file) ---
const ProductDetailPanel = ({ product, setActiveProductId, onEnquiry }: { product: Product, setActiveProductId: (id: string) => void, onEnquiry: (productName: string) => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        if (isInView) {
            setActiveProductId(product.id);
        }
    }, [isInView, setActiveProductId, product.id]);

    return (
        <div ref={ref} className="min-h-screen flex items-center">
            <motion.div
                className="w-full"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={contentContainerVariants}
            >
                <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-trusted font-bold text-gray-900 mb-4">{product.name}</motion.h3>
                <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-lg">{product.description}</motion.p>
                <motion.div variants={itemVariants} className="space-y-3 mb-8">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <Award className="h-5 w-5 text-gray-800 mr-3 flex-shrink-0" />
                        <span className="text-md text-gray-700">{feature}</span>
                      </div>
                    ))}
                </motion.div>
                <motion.div variants={itemVariants}>
                    <motion.button
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:bg-gray-700 transition-all duration-300 ease-in-out"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEnquiry(product.name)}
                    >
                        Enquiry
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>
    );
};


// --- Main Sticky Product Showcase Component ---
const StickyProductShowcase = ({
  title,
  subtitle,
  products,
  onEnquiry,
  imagePosition = 'left'
}: {
  title: string;
  subtitle: string;
  products: Product[];
  onEnquiry: (productName: string) => void;
  imagePosition?: 'left' | 'right';
}) => {
    const [activeProductId, setActiveProductId] = useState(products[0].id);
    const activeProduct = products.find(p => p.id === activeProductId) || products[0];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
                </div>

                {/* --- DESKTOP VIEW: Sticky Layout --- */}
                <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    <div className={`lg:sticky top-0 lg:h-screen flex items-center justify-center py-8 ${imagePosition === 'right' ? 'lg:order-last' : ''}`}>
                        <div className="relative w-full aspect-square max-w-md bg-gray-100 rounded-2xl shadow-2xl overflow-hidden">
                            <AnimatePresence initial={false}>
                                <motion.img
                                    key={activeProduct.id}
                                    src={activeProduct.image}
                                    alt={activeProduct.name}
                                    variants={imageVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="absolute inset-0 w-full h-full object-contain p-4"
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                    <div>
                        {products.map((product) => (
                            <ProductDetailPanel key={product.id} product={product} setActiveProductId={setActiveProductId} onEnquiry={onEnquiry} />
                        ))}
                    </div>
                </div>

                {/* --- MOBILE VIEW: Card Stack Layout --- */}
                <div className="lg:hidden space-y-16">
                    {products.map(product => (
                        <motion.div 
                            key={product.id}
                            className="text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <div className="w-full aspect-square max-w-md mx-auto bg-gray-100 rounded-2xl shadow-xl overflow-hidden mb-6">
                                <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
                            </div>
                            <div className="max-w-lg mx-auto">
                                <h3 className="text-3xl font-trusted font-bold text-gray-900 mb-3">{product.name}</h3>
                                <p className="text-lg text-gray-600 mb-6">{product.description}</p>
                                <div className="inline-block text-left space-y-3 mb-8">
                                    {product.features.map((feature, idx) => (
                                      <div key={idx} className="flex items-center">
                                        <Award className="h-5 w-5 text-gray-800 mr-3 flex-shrink-0" />
                                        <span className="text-md text-gray-700">{feature}</span>
                                      </div>
                                    ))}
                                </div>
                                <div>
                                    <motion.button
                                        className="group flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => onEnquiry(product.name)}
                                    >
                                        Enquiry
                                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StickyProductShowcase;