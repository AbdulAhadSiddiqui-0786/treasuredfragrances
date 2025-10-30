// src/components/products/ProductCard.jsx
import { Link } from 'react-router-dom';
import { Eye, Heart, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const productUrl = encodeURIComponent(product.name);

  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 500) + 50;

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 dark:border-neutral-700">
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <Link 
            to={`/products/${productUrl}`} 
            className="relative overflow-hidden bg-stone-100 dark:bg-neutral-700 md:w-64 h-64 md:h-auto flex-shrink-0"
          >
            <img
              src={product.img || '/placeholder.svg'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full text-xs font-medium shadow-md">
                {product.category || 'Fragrance'}
              </span>
            </div>

            {/* Stock Badge */}
            {product.countInStock !== undefined && (
              <div className="absolute top-3 right-3">
                {product.countInStock > 0 ? (
                  <span className="px-3 py-1 bg-emerald-500/90 text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-500/90 text-white rounded-full text-xs font-medium shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            )}
          </Link>

          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < Math.floor(rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-stone-300 dark:text-neutral-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                ({reviewCount} reviews)
              </span>
            </div>

            {/* Product Name */}
            <Link to={`/products/${productUrl}`}>
              <h3 className="text-2xl font-medium text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-3">
                {product.name}
              </h3>
            </Link>
            
            {/* Description */}
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 leading-relaxed flex-1">
              {product.description || 'Experience the luxury of this exquisite fragrance.'}
            </p>

            {/* Bottom Section */}
            <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-neutral-700">
              {/* Price */}
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

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsWishlisted(!isWishlisted);
                  }}
                  className={`p-3 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-rose-500 text-white'
                      : 'bg-stone-100 dark:bg-neutral-700 text-stone-700 dark:text-stone-300 hover:bg-rose-500 hover:text-white'
                  }`}
                >
                  <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>

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

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
      </div>
    );
  }

  // Grid View Layout (original design)
  return (
    <div className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-stone-200 dark:border-neutral-700">
      {/* Image Section */}
      <Link 
        to={`/products/${productUrl}`} 
        className="block relative overflow-hidden bg-stone-100 dark:bg-neutral-700 aspect-square"
      >
        <img
          src={product.img || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md shadow-lg transition-all duration-300 ${
              isWishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-stone-700 hover:bg-rose-500 hover:text-white'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2.5 bg-white/90 backdrop-blur-md text-stone-700 rounded-full hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg">
            <Eye size={18} />
          </button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full text-xs font-medium shadow-md">
            {product.category || 'Fragrance'}
          </span>
        </div>

        {/* Stock/Sale Badge */}
        {product.onSale && (
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold shadow-md">
              SALE
            </span>
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-6">
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-stone-300 dark:text-neutral-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-stone-500 dark:text-stone-400">
            ({reviewCount})
          </span>
        </div>

        {/* Product Name */}
        <Link to={`/products/${productUrl}`}>
          <h3 className="text-lg font-medium text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
            {product.name}
          </h3>
        </Link>
        
        {/* Description */}
        <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description || 'Experience the luxury of this exquisite fragrance.'}
        </p>

        {/* Fragrance Notes (if available) */}
        {product.notes && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.notes.slice(0, 3).map((note, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded text-xs"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-neutral-700">
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
          
          <button className="group/btn p-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg">
            <ShoppingBag size={20} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>

        {/* Stock Indicator */}
        {product.countInStock !== undefined && (
          <div className="mt-4">
            {product.countInStock > 0 ? (
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  In Stock ({product.countInStock} available)
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

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;