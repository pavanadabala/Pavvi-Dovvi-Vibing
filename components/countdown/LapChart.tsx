"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface Lap {
    id: number;
    difference: number;
}

interface LapChartProps {
    laps: Lap[];
}

export default function LapChart({ laps }: LapChartProps) {
    const data = {
        labels: laps.map((lap) => `Lap ${lap.id}`),
        datasets: [
            {
                label: "Time Difference (ms)",
                data: laps.map((lap) => Math.abs(lap.difference)),
                borderColor: "rgb(79, 70, 229)",
                backgroundColor: "rgba(79, 70, 229, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Lap Differences",
            },
        },
    };

    return (
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lap Differences Analysis</h2>
            <div className="h-64">
                <Line options={options} data={data} />
            </div>
        </div>
    );
}
