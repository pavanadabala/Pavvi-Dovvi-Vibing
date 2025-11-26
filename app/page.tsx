'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-violet-900 flex items-center justify-center px-4">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <div className="text-8xl">⏱️</div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Welcome to My Portfolio
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
          Explore my projects and see what I've been working on
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            href="/projects"
            className="px-8 py-4 bg-gradient-to-r from-red-900 to-red-800 text-white font-semibold text-lg rounded-xl
                       hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            View Projects →
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white font-semibold text-lg rounded-xl
                       hover:scale-105 active:scale-95 transition-transform duration-200 hover:bg-white/30"
          >
            About Me
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
