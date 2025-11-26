'use client';

import { useEffect, useState } from 'react';

interface CountdownDisplayProps {
    targetDate: number; // timestamp
}

export default function CountdownDisplay({ targetDate }: CountdownDisplayProps) {
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        display: ''
    });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const remaining = targetDate - now;

            if (remaining < 0) {
                setIsFinished(true);
                clearInterval(timer);
                return;
            }

            const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

            setTimeRemaining({
                days,
                hours,
                minutes,
                seconds,
                display: `${days}d ${hours}h ${minutes}m ${seconds}s`
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (isFinished) {
        return (
            <div className="text-center py-12">
                <div className="text-5xl md:text-7xl font-bold text-white animate-pulse">
                    🎉 Countdown Finished! 🎉
                </div>
            </div>
        );
    }

    return (
        <div className="text-center py-12">
            <div className="text-6xl md:text-8xl font-bold text-white font-mono tracking-wider">
                {timeRemaining.display}
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4 max-w-2xl mx-auto text-white/70">
                <div>
                    <div className="text-3xl font-bold">{timeRemaining.days}</div>
                    <div className="text-sm uppercase">Days</div>
                </div>
                <div>
                    <div className="text-3xl font-bold">{timeRemaining.hours}</div>
                    <div className="text-sm uppercase">Hours</div>
                </div>
                <div>
                    <div className="text-3xl font-bold">{timeRemaining.minutes}</div>
                    <div className="text-sm uppercase">Minutes</div>
                </div>
                <div>
                    <div className="text-3xl font-bold">{timeRemaining.seconds}</div>
                    <div className="text-sm uppercase">Seconds</div>
                </div>
            </div>
        </div>
    );
}
