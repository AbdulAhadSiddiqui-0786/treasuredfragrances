import React, { useEffect, useState } from "react";

export default function HomePage() {
  const launchDate = new Date("2025-12-01T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-white overflow-hidden">
      
      {/* Background Image using img tag */}
      <img
        src="https://github.com/AbdulAhadSiddiqui-0786/treasuredfragrances/blob/main/public/bgimg.svg" // <-- replace with your image URL
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 opacity-70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 animate-pulse">
          TreasureFragrance
        </h1>
        <p className="text-xl sm:text-2xl mb-8">Launching Soon 🚀</p>

        <div className="flex gap-4 text-center">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="bg-white/20 backdrop-blur-md rounded-xl p-4 w-20 sm:w-24"
            >
              <p className="text-2xl sm:text-3xl font-bold">{timeLeft[unit]}</p>
              <span className="uppercase text-sm sm:text-base">{unit}</span>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 fixed bottom-0 w-full py-2 bg-white">
          © 2025 All Rights Reserved. mujeebakhtar70@gmail.com
        </p>
      </div>
    </div>
  );
}
