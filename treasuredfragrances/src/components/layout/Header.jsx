// src/components/layout/Header.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";
import { useAuth } from "../../context/AuthContext"; // Correct path
import {
  Menu,
  X,
  Moon,
  Sun,
  User,
  Search,
  Settings, // Added
  LogOut, // Added
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // Added motion
import { HiSparkles } from "react-icons/hi";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { user, isLoggedIn, logout } = useAuth(); // Added 'user'
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/"); // <-- CHANGED: Redirect to Home
    setMenuOpen(false);
  };

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-lg border-b border-stone-200 dark:border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ... (Logo remains the same) ... */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/android-chrome-512x512.png" alt="Logo" className="w-15 h-15 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-light tracking-wider text-stone-900 dark:text-white">
                TREASURED
              </span>
              <span className="text-xs tracking-widest text-amber-600 dark:text-amber-400 font-medium -mt-1">
                FRAGRANCES
              </span>
            </div>
          </Link>

          {/* ... (Desktop Navigation remains the same) ... */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium tracking-wide text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 dark:bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/products"
              className="text-sm font-medium tracking-wide text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors relative group"
            >
              Collections
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 dark:bg-amber-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* ... (Search and Dark Mode Toggle remain the same) ... */}
            <button className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors">
              <Search size={20} className="text-stone-700 dark:text-stone-300" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {darkMode ? (
                <Moon size={20} className="text-stone-700 dark:text-stone-300" />
              ) : (
                <Sun size={20} className="text-stone-700 dark:text-stone-300" />
              )}
            </button>


            {/* --- MODIFIED: Login/Logout Logic --- */}
            {isLoggedIn && user?.role === "admin" ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-neutral-800 hover:bg-stone-200 dark:hover:bg-neutral-700 transition-colors">
                  <User size={18} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Admin
                  </span>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-xl border border-stone-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2">
                  <Link
                    to="/admin"
                    className="w-full text-left px-4 py-3 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-neutral-700 transition-colors rounded-lg flex items-center gap-3"
                  >
                    <Settings size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors rounded-lg flex items-center gap-3 mt-1"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-md"
              >
                Admin Login {/* <-- CHANGED */}
              </Link>
            )}
            {/* --- END OF MODIFICATION --- */}
          </div>

          {/* ... (Mobile Menu Button remains the same) ... */}
           <button
            className="lg:hidden p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-stone-700 dark:text-stone-300" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700 dark:text-stone-300" />
            )}
          </button>
        </div>
      </div>

      {/* --- MODIFIED: Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-white dark:bg-neutral-900 shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-stone-200 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <HiSparkles className="text-xl text-amber-600 dark:text-amber-400" />
                  <span className="font-medium text-stone-900 dark:text-white">Menu</span>
                </div>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800"
                >
                  <X className="w-5 h-5 text-stone-700 dark:text-stone-300" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="p-6 space-y-1">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  Collections
                </Link>
                {/* --- REMOVED About, Wishlist, Cart --- */}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-stone-50 dark:bg-neutral-800 border-t border-stone-200 dark:border-neutral-700">
                <button
                  onClick={toggleDarkMode}
                  className="w-full mb-3 px-4 py-3 rounded-lg border border-stone-300 dark:border-neutral-600 hover:bg-stone-100 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
                >
                  {/* ... (dark mode toggle icon) ... */}
                </button>

                {/* Login/Logout */}
                {isLoggedIn && user?.role === "admin" ? (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="w-full mb-3 px-4 py-3 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors text-center"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-3 bg-black dark:bg-white text-white dark:text-black text-center rounded-lg font-medium hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-colors"
                  >
                    Admin Login
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;