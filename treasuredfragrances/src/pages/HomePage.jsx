import React from "react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <img
        src="/logo.jpg" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay Gradient for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 animate-fadeIn">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 animate-text-shimmer">
          Treasured Fragrances
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-gray-200 animate-fadeInDelay">
          Launching Soon 🚀
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full text-center py-3 text-sm text-gray-300 bg-black/50 backdrop-blur-md">
        © 2025 All Rights Reserved.{" "}
        <a
          href="mailto:mujeebakhtar70@gmail.com"
          className="underline text-amber-400 hover:text-pink-400 transition"
        >
          mujeebakhtar70@gmail.com
        </a>
      </footer>
    </div>
  );
}
