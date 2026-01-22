"use client";

import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useState, useRef } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function WindmillLogo() {
    const { isLoading, triggerPageLoad } = useLoading();
    const rotation = useMotionValue(0);
    const [isHovering, setIsHovering] = useState(false);

    // Color from reference: Copper/Orange
    const logoColor = "#DCA376";

    // Speed configurations (degrees per frame)
    const SLOW_SPEED = 0.5;   // ~30 deg/sec (very relaxed)
    const HOVER_SPEED = 3;    // ~180 deg/sec
    const LOAD_SPEED = 15;    // ~900 deg/sec (fast blur)

    // Use a ref to smoothly interpolate speed for momentum effect (optional but nice)
    const currentSpeed = useRef(SLOW_SPEED);

    useAnimationFrame((t, delta) => {
        // Determine target speed based on state
        let targetSpeed = SLOW_SPEED;
        if (isLoading) targetSpeed = LOAD_SPEED;
        else if (isHovering) targetSpeed = HOVER_SPEED;

        // Simple smooth acceleration (Linear interpolation for now)
        // Move currentSpeed 5% towards targetSpeed each frame for momentum
        currentSpeed.current = currentSpeed.current + (targetSpeed - currentSpeed.current) * 0.05;

        // Update rotation
        // Adjust for delta time to be consistent across frame rates (delta is in ms)
        // 60fps ~ 16.6ms per frame. 
        // Normalized speed factor: delta / 16.666
        const timeFactor = delta / 16.666;
        rotation.set(rotation.get() + (currentSpeed.current * timeFactor));
    });

    return (
        <div
            className="flex items-center h-20 w-32 relative cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
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
                {/* 
                    Method: Centered Geometry 
                    We define the blades around (0,0) so the center of rotation is naturally (0,0).
                    Then we translate the entire group to position (50, 40).
                    This prevents any bounding-box based transform origin issues.
                */}
                <motion.g
                    style={{
                        rotate: rotation,
                        translateX: 50,
                        translateY: 40,
                    }}
                >
                    {/* Blades defined relative to 0,0 */}
                    {/* Top Left (-10, -15) */}
                    <path d="M0 0 L -10 -15 L -5 -18 L 0 0" fill="none" />
                    {/* Top Right (10, -15) */}
                    <path d="M0 0 L 10 -15 L 15 -18 L 0 0" fill="none" />
                    {/* Bottom Right (10, 15) */}
                    <path d="M0 0 L 10 15 L 15 18 L 0 0" fill="none" />
                    {/* Bottom Left (-10, 15) */}
                    <path d="M0 0 L -10 15 L -5 18 L 0 0" fill="none" />

                    {/* Center Hub */}
                    <circle cx="0" cy="0" r="3" fill="currentColor" stroke="none" />
                </motion.g>


            </motion.svg>
        </div>
    );
}
