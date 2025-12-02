interface Lap {
    id: number;
    timeRemaining: number;
    difference: number;
    timestamp: any;
}

interface LapListProps {
    laps: Lap[];
}

export default function LapList({ laps }: LapListProps) {
    const formatTime = (ms: number) => {
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };

    const reversedLaps = laps.slice().reverse();

    return (
        <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lap History</h2>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md border border-gray-100 dark:border-gray-700 transition-colors duration-200">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {reversedLaps.map((lap, index) => (
                        <li key={lap.id}>
                            <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 truncate">
                                        Lap {laps.length - index}
                                    </p>
                                    <div className="ml-2 flex-shrink-0 flex">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                            {formatTime(lap.timeRemaining)}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            Difference: {formatTime(lap.difference)}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                                        <p>
                                            {lap.timestamp instanceof Date
                                                ? lap.timestamp.toLocaleTimeString()
                                                : new Date(lap.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
