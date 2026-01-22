"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function WindmillLogo() {
    const controls = useAnimation();
    const { isLoading, triggerPageLoad } = useLoading();

    // Color from reference: Copper/Orange
    const logoColor = "#DCA376"; // Light copper/sand color

    useEffect(() => {
        // Determine speed based on loading state
        const duration = isLoading ? 0.3 : 10; // 0.3s (very fast) if loading, 10s (slow) otherwise

        controls.start({
            rotate: 360,
            transition: {
                repeat: Infinity,
                ease: "linear",
                duration: duration,
            },
        });
    }, [isLoading, controls]);

    const handleHoverStart = () => {
        if (!isLoading) {
            controls.start({
                rotate: 360,
                transition: {
                    repeat: Infinity,
                    ease: "linear",
                    duration: 2, // Medium fast on hover
                }
            });
        }
    };

    const handleHoverEnd = () => {
        if (!isLoading) {
            controls.start({
                rotate: 360,
                transition: {
                    repeat: Infinity,
                    ease: "linear",
                    duration: 10, // Back to slow
                }
            });
        }
    };

    return (
        <div
            className="flex items-center h-20 w-32 relative cursor-pointer"
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onClick={triggerPageLoad}
            style={{ color: logoColor }}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full overflow-visible"
            >
                {/* Concept Reference: Dome/Semicircle Background & Clean Lines */}

                {/* The Base/Dome Structure */}
                {/* Semicircle arch starting from bottom */}
                <path d="M20 70 A 30 30 0 0 1 80 70" />

                {/* Bottom Line (Ground) */}
                <path d="M15 70 L 85 70" />

                {/* Clouds / Bushes at bottom (semicircles) */}
                <path d="M25 70 Q 30 60 35 70" />
                <path d="M65 70 Q 70 60 75 70" />

                {/* Central Windmill Tower */}
                <path d="M 42 70 L 45 40 L 55 40 L 58 70" />

                {/* Door - Arched */}
                <path d="M 48 70 L 48 65 A 2 2 0 0 1 52 65 L 52 70" />

                {/* Spinning Fan Group */}
                {/* Centered at 50, 40 (Top of tower) */}
                <motion.g
                    animate={controls}
                    initial={{ originX: 0.5, originY: 0.5 }} // Use relative center if bounding box is correct
                    style={{ transformOrigin: "50px 40px" }} // Explicit pixel fallback
                >
                    {/* 4 Blades (X shape) - Symmetrical around 50,40 */}
                    <path d="M50 40 L 40 25 L 45 22 L 50 40" fill="none" />
                    <path d="M50 40 L 60 25 L 65 22 L 50 40" fill="none" />
                    <path d="M50 40 L 60 55 L 65 58 L 50 40" fill="none" />
                    <path d="M50 40 L 40 55 L 35 58 L 50 40" fill="none" />

                    {/* Center Hub */}
                    <circle cx="50" cy="40" r="3" fill="currentColor" stroke="none" />
                </motion.g>


            </motion.svg>
        </div>
    );
}
