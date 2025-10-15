import React from "react";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white px-4">
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

      <button className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full shadow-lg hover:scale-105 transition-transform">
        Notify Me
      </button>
    </div>
  );
}
