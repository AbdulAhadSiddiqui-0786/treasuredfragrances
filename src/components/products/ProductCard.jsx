import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={product.img}
        alt={product.name}
        className="w-full h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
        <Link
          to={`/product/${product.id}`}
          className="mt-2 inline-block text-sm text-white bg-indigo-600 px-4 py-1 rounded-md hover:bg-indigo-500 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
