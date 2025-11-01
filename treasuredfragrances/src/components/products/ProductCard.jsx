// src/components/products/ProductCard.jsx
import { Link } from "react-router-dom";
import { Eye, ShoppingBag, CheckCircle, XCircle } from "lucide-react";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const productUrl = encodeURIComponent(product.name);
    const handleWhatsApp = () => {
    window.open('https://wa.me/918178036494', '_blank');
  };

  // --- LIST VIEW ---
  if (viewMode === "list") {
    return (
      <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <Link
            to={`/products/${productUrl}`}
            className="relative overflow-hidden bg-stone-100 dark:bg-neutral-700 md:w-64 h-64 md:h-auto flex-shrink-0"
          >
            <img
              src={product.img || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full text-xs font-medium shadow-md">
                {product.category || "Fragrance"}
              </span>
            </div>

            {/* Stock Availability */}
            {product.isAvailable !== undefined && (
              <div className="absolute top-3 right-3">
                {product.isAvailable ? (
                  <span className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                    <CheckCircle size={14} />
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                    <XCircle size={14} />
                    Out of Stock
                  </span>
                )}
              </div>
            )}
          </Link>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col">
            <Link to={`/products/${productUrl}`}>
              <h3 className="text-2xl font-medium text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3">
                {product.name}
              </h3>
            </Link>

            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed flex-1">
              {product.description ||
                "Experience the luxury of this exquisite fragrance."}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-neutral-700 mt-auto">
              <div>
                {product.oldPrice && (
                  <span className="text-sm text-stone-400 line-through block mb-1">
                    ₹{product.oldPrice}
                  </span>
                )}
                <span className="text-3xl font-light text-stone-900 dark:text-white">
                  ₹{product.price}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link to={`/products/${productUrl}`}>
                  <button className="p-3 bg-stone-100 dark:bg-neutral-700 text-stone-700 dark:text-stone-300 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
                    <Eye size={20} />
                  </button>
                </Link>

                <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 dark:border-neutral-700 flex flex-col h-[560px]">
      {/* Image Section */}
      <Link
        to={`/products/${productUrl}`}
        className="block relative overflow-hidden bg-stone-100 dark:bg-neutral-700 aspect-square"
      >
        <img
          src={product.img || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button className="p-2.5 bg-white/90 backdrop-blur-md text-stone-700 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
            <Eye size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full text-xs font-medium shadow-md">
            {product.category || "Fragrance"}
          </span>
        </div>

        {/* Stock Badge */}
        <div className="absolute bottom-3 left-3">
          {!product.isAvailable ? (
            <span className="px-3 py-1 bg-red-500/90 text-white rounded-full text-xs font-medium shadow-lg">
              Out of Stock
            </span>
          ) : product.onSale ? (
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-md">
              SALE
            </span>
          ) : null}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <Link to={`/products/${productUrl}`}>
          <h3 className="text-lg font-medium text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {product.description ||
            "Experience the luxury of this exquisite fragrance."}
        </p>

        <div className="mt-auto pt-4 border-t border-stone-200 dark:border-neutral-700 flex items-center justify-between">
          <div>
            {product.oldPrice && (
              <span className="text-sm text-stone-400 line-through block mb-1">
                ₹{product.oldPrice}
              </span>
            )}
            <span className="text-2xl font-light text-stone-900 dark:text-white">
              ₹{product.price}
            </span>
          </div>

          <button onClick={handleWhatsApp} className="group/btn p-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            BUY
          </button>
        </div>

        {/* Stock Indicator */}
        {product.isAvailable !== undefined && (
          <div className="mt-4">
            {product.isAvailable ? (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  In Stock
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-600 dark:text-red-400 font-medium">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;
