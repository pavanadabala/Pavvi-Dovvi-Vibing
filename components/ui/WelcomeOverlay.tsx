"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

interface WelcomeOverlayProps {
    show: boolean;
    onComplete: () => void;
}

export default function WelcomeOverlay({ show, onComplete }: WelcomeOverlayProps) {
    useEffect(() => {
        if (show) {
            // Trigger confetti
            const duration = 3000;
            const end = Date.now() + duration;

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#4f46e5', '#818cf8', '#c7d2fe'] // Indigo shades
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#4f46e5', '#818cf8', '#c7d2fe']
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            frame();

            // Auto-dismiss after animation
            const timer = setTimeout(() => {
                onComplete();
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [show, onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -50 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
                            Welcome Back!
                        </h1>
                        <p className="text-xl text-gray-600">
                            Ready to be productive?
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
