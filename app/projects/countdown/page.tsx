"use client";


import { useState, useEffect } from "react";
import { Great_Vibes } from "next/font/google";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import CountdownDisplay from "@/components/countdown/CountdownDisplay";
import LapList from "@/components/countdown/LapList";
import LapChart from "@/components/countdown/LapChart";
import { Play, Pause, RotateCcw, Flag, Gift, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

interface Lap {
    id: number;
    timeRemaining: number;
    difference: number;
    timestamp: any;
}

const greatVibes = Great_Vibes({ weight: "400", subsets: ["latin"] });

export default function CountdownPage() {
    const { user } = useAuth();
    const [targetDate, setTargetDate] = useState<number>(new Date("2026/12/25 23:59:59").getTime());
    const [timeLeft, setTimeLeft] = useState(0);
    const [laps, setLaps] = useState<Lap[]>([]);
    const [loading, setLoading] = useState(true);

    // Load data from Firestore
    useEffect(() => {
        const loadData = async () => {
            if (user) {
                try {
                    const docRef = doc(db, "users", user.uid, "projects", "project1");
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setTargetDate(data.targetDate);
                        setLaps(data.laps || []);
                    }
                } catch (error) {
                    console.error("Error loading data:", error);
                }
            }
            setLoading(false);
        };

        loadData();
    }, [user]);

    const handleTick = (time: number) => {
        setTimeLeft(time);
    };

    const handleLap = async () => {
        const lastLap = laps[laps.length - 1];
        const difference = lastLap ? lastLap.timeRemaining - timeLeft : 0;

        const newLap: Lap = {
            id: laps.length + 1,
            timeRemaining: timeLeft,
            difference: difference,
            timestamp: new Date(),
        };

        const newLaps = [...laps, newLap];
        setLaps(newLaps);

        if (user) {
            try {
                const docRef = doc(db, "users", user.uid, "projects", "project1");
                await updateDoc(docRef, {
                    laps: newLaps,
                    lapCount: newLaps.length,
                    lastActivity: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error saving lap:", error);
            }
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className={`${greatVibes.className} flex flex-col sm:flex-row items-center justify-center gap-3 text-5xl font-extrabold text-red-600 dark:text-red-500 sm:text-6xl sm:tracking-tight lg:text-7xl drop-shadow-sm`}>
                        <Gift className="w-12 h-12 text-green-600 dark:text-green-500 animate-bounce hidden sm:block" />
                        <span>Countdown to Christmas 2026</span>
                        <Gift className="w-12 h-12 text-green-600 dark:text-green-500 animate-bounce hidden sm:block" />
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl font-medium text-green-700 dark:text-green-400 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                        Get into the festive spirit and track the time!
                        <Sparkles className="w-5 h-5 text-yellow-500" />
                    </p>
                </div>

                <CountdownDisplay targetDate={targetDate} onTick={handleTick} />

                <div className="mt-8 flex justify-center space-x-4">
                    <Button onClick={handleLap} size="lg">
                        <Flag className="mr-2 h-5 w-5" />
                        Lap
                    </Button>
                </div>

                {laps.length > 5 && <LapChart laps={laps} />}

                {laps.length > 0 && <LapList laps={laps} />}
            </div>
        </div>
    );
}
