'use client';

export interface LapRecord {
    lapNumber: number;
    timestamp: number;
    remainingTime: string;
    difference: number; // in seconds
}

interface LapListProps {
    laps: LapRecord[];
}

function formatDiff(diffInSeconds: number): string {
    const diff = diffInSeconds * 1000;
    const diffMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const diffSeconds = Math.floor((diff % (1000 * 60)) / 1000);
    const diffMilliseconds = Math.floor((diff % 1000) / 10);

    return `+${diffMinutes < 10 ? '0' : ''}${diffMinutes}:${diffSeconds < 10 ? '0' : ''}${diffSeconds}.${diffMilliseconds < 10 ? '0' : ''}${diffMilliseconds}`;
}

export default function LapList({ laps }: LapListProps) {
    if (laps.length === 0) {
        return (
            <div className="text-center text-white/60 py-8">
                No laps recorded yet. Click "Record Lap" to start tracking!
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Lap History</h3>
            <ul className="space-y-2">
                {laps.map((lap) => (
                    <li
                        key={lap.lapNumber}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 
                       text-white hover:bg-white/15 transition-colors"
                    >
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Lap {lap.lapNumber}</span>
                            <div className="flex gap-4">
                                <span className="font-mono">{lap.remainingTime}</span>
                                <span className="font-mono text-green-400">{formatDiff(lap.difference)}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { formatDiff };
