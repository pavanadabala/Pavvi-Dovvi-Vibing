'use client';

interface LapButtonProps {
    onLap: () => void;
    disabled?: boolean;
}

export default function LapButton({ onLap, disabled }: LapButtonProps) {
    return (
        <button
            onClick={onLap}
            disabled={disabled}
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 text-white font-semibold text-lg rounded-xl
                 hover:scale-105 active:scale-95 transition-transform duration-200
                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                 shadow-lg hover:shadow-xl"
        >
            🏁 Record Lap
        </button>
    );
}
