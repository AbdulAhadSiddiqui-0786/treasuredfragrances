import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto p-6 text-center min-h-[70vh] flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-yellow-600 mb-4">404</h1>
      <p className="text-xl mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-500 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
