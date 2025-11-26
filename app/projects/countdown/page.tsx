'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase-config';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import CountdownDisplay from '@/components/countdown-timer/CountdownDisplay';
import LapButton from '@/components/countdown-timer/LapButton';
import LapList, { LapRecord } from '@/components/countdown-timer/LapList';
import LapChart from '@/components/countdown-timer/LapChart';

export default function CountdownTimerPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [targetDate, setTargetDate] = useState<number>(new Date('2025/12/31 23:59:59').getTime());
    const [laps, setLaps] = useState<LapRecord[]>([]);
    const [lastLapTime, setLastLapTime] = useState<number>(new Date().getTime());

    // Check authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                // Not authenticated, redirect to login
                // For now, we'll just proceed without auth (development mode)
                setLoading(false);
                return;
            }

            setUser(currentUser);

            // Load project data from Firestore
            try {
                const projectRef = doc(db, 'users', currentUser.uid, 'projects', 'project1');
                const projectDoc = await getDoc(projectRef);

                if (projectDoc.exists()) {
                    const data = projectDoc.data();
                    setTargetDate(new Date(data.targetDate).getTime());

                    if (data.laps && data.laps.length > 0) {
                        setLaps(data.laps);
                        setLastLapTime(data.laps[data.laps.length - 1].timestamp);
                    }
                }
            } catch (error) {
                console.error('Error loading project data:', error);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLap = async () => {
        const now = new Date().getTime();
        const currentTimerElement = document.querySelector('[data-timer-display]');
        const currentTimerText = currentTimerElement?.textContent;

        if (!currentTimerText || currentTimerText.includes('Finished')) {
            return;
        }

        const diff = now - lastLapTime;
        const diffInSeconds = diff / 1000;

        const newLap: LapRecord = {
            lapNumber: laps.length + 1,
            timestamp: now,
            remainingTime: currentTimerText,
            difference: diffInSeconds
        };

        const updatedLaps = [...laps, newLap];
        setLaps(updatedLaps);
        setLastLapTime(now);

        // Save to Firestore if user is logged in
        if (user) {
            try {
                const projectRef = doc(db, 'users', user.uid, 'projects', 'project1');
                await updateDoc(projectRef, {
                    laps: arrayUnion(newLap),
                    lapCount: updatedLaps.length,
                    lastActivity: serverTimestamp()
                });
            } catch (error) {
                console.error('Error saving lap:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => router.push('/projects')}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 
                       text-white rounded-lg transition-colors"
                    >
                        ← Back to Projects
                    </button>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">Daily Working Task Countdown</h1>
                    <div className="w-32"></div> {/* Spacer for centering */}
                </div>

                {/* Countdown Display */}
                <div className="mb-8" data-timer-display>
                    <CountdownDisplay targetDate={targetDate} />
                </div>

                {/* Lap Button */}
                <div className="flex justify-center mb-12">
                    <LapButton onLap={handleLap} />
                </div>

                {/* Lap List */}
                <div className="mb-8">
                    <LapList laps={laps} />
                </div>

                {/* Lap Chart (appears after 5 laps) */}
                <LapChart laps={laps} />
            </div>
        </div>
    );
}
