import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkModeContext";

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
        >
          Treasured Fragrances
        </Link>

        <nav className="space-x-6 flex items-center">
          <Link
            to="/"
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="hover:text-indigo-500 dark:hover:text-indigo-300"
          >
            Login
          </Link>

          <button
            onClick={toggleDarkMode}
            className="ml-4 px-3 py-1 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
