"use client";

import { useEffect, useState } from "react";

interface CountdownDisplayProps {
    targetDate: number;
    onTick?: (timeLeft: number) => void;
}

export default function CountdownDisplay({ targetDate, onTick }: CountdownDisplayProps) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft(0);
            } else {
                setTimeLeft(distance);
            }

            if (onTick) {
                onTick(distance > 0 ? distance : 0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, onTick]);

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-200">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">{days}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Days</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-200">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">{hours}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Hours</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-200">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">{minutes}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Minutes</div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-800 transition-colors duration-200">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-300">{seconds}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-2">Seconds</div>
            </div>
        </div>
    );
}
