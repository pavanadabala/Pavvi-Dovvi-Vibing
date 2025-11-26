'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import type { LapRecord } from './LapList';

Chart.register(...registerables);

interface LapChartProps {
    laps: LapRecord[];
}

export default function LapChart({ laps }: LapChartProps) {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartRef.current || laps.length <= 5) {
            // Don't show chart until there are more than 5 laps
            return;
        }

        const ctx = chartRef.current.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create new chart with all lap data
        const labels = laps.map(lap => `Lap ${lap.lapNumber}`);
        const data = laps.map(lap => lap.difference);

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Lap Difference (Seconds)',
                    data,
                    borderColor: '#930d0d',
                    backgroundColor: 'rgba(147, 13, 13, 0.1)',
                    tension: 0.1,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: 'rgba(255, 255, 255, 0.7)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'rgba(255, 255, 255, 0.9)'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [laps]);

    // Only render if we have more than 5 laps
    if (laps.length <= 5) {
        return null;
    }

    return (
        <div className="w-full max-w-4xl mx-auto mt-8">
            <h3 className="text-2xl font-bold text-white mb-4">Lap Difference Chart</h3>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6">
                <div className="h-64 md:h-96">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
}
