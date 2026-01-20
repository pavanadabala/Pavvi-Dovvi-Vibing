"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const items = [
    {
        id: 1,
        title: "Digital Innovation",
        description: "Building the future with clean code and modern architecture.",
        image: "/images/gallery-1.png",
    },
    {
        id: 2,
        title: "Data Visualization",
        description: "Transforming complex data into beautiful, actionable insights.",
        image: "/images/gallery-2.png",
    },
    {
        id: 3,
        title: "3D Experiences",
        description: "Creating immersive web experiences that captivate users.",
        image: "/images/gallery-3.png",
    },
];

export default function ScrollGallery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="relative w-full max-w-7xl px-6 lg:px-8 h-full flex items-center justify-center">
                    {items.map((item, index) => {
                        // Calculate range for each item
                        const start = index / items.length;
                        const end = (index + 1) / items.length;

                        // Opacity transition
                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.15, end - 0.15, end],
                            [0, 1, 1, 0]
                        );

                        // Scale transition for "roll in" effect
                        const scale = useTransform(
                            scrollYProgress,
                            [start, end],
                            [0.85, 1.05]
                        );

                        // Z-index to stack correctly
                        const zIndex = useTransform(scrollYProgress, (pos) => {
                            return pos >= start && pos <= end ? 10 : 0;
                        });

                        // Alternate sides: Even index = Image Left, Odd index = Image Right
                        const isEven = index % 2 === 0;

                        return (
                            <motion.div
                                key={item.id}
                                style={{ opacity, scale, zIndex }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="relative w-full h-full max-h-[80vh] grid grid-cols-1 md:grid-cols-3 items-center gap-8 p-8">
                                    {/* Left Column (Image if Even) */}
                                    <div className={`hidden md:flex justify-center ${!isEven ? 'invisible' : ''}`}>
                                        {isEven && (
                                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl skew-y-3 transform transition-transform">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Center Column (Text) */}
                                    <div className="col-span-1 md:col-span-1 text-center space-y-6 z-10 flex flex-col items-center justify-center">
                                        <motion.h2
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
                                        >
                                            {item.title}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ y: 20, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto"
                                        >
                                            {item.description}
                                        </motion.p>

                                        {/* Mobile Image (Always visible on mobile) */}
                                        <div className="md:hidden relative w-full aspect-video rounded-xl overflow-hidden shadow-lg mt-8">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column (Image if Odd) */}
                                    <div className={`hidden md:flex justify-center ${isEven ? 'invisible' : ''}`}>
                                        {!isEven && (
                                            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl -skew-y-3 transform transition-transform">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Height spacer to allow scrolling */}
            <div className="absolute bottom-10 left-0 right-0 text-center text-gray-400 text-sm animate-pulse">
                Keep scrolling to explore
            </div>
        </div>
    );
}
