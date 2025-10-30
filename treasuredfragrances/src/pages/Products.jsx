// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
  X,
  Filter,
  Sparkles,
} from "lucide-react";
import { HiSparkles } from "react-icons/hi";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [stockFilter, setStockFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = products;

    // Category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Stock filter
    if (stockFilter === "in-stock") {
      filtered = filtered.filter((p) => p.countInStock > 0);
    } else if (stockFilter === "out-of-stock") {
      filtered = filtered.filter((p) => p.countInStock === 0);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return sorted;
  };

  const filteredProducts = getFilteredAndSortedProducts();

  // Clear all filters
  const clearFilters = () => {
    setCategoryFilter("All");
    setSearchQuery("");
    setSortBy("featured");
    setPriceRange([0, 10000]);
    setStockFilter("all");
  };

  const activeFiltersCount =
    (categoryFilter !== "All" ? 1 : 0) +
    (searchQuery ? 1 : 0) +
    (stockFilter !== "all" ? 1 : 0) +
    (priceRange[0] !== 0 || priceRange[1] !== 10000 ? 1 : 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
            Loading our exquisite collection...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-light text-stone-900 dark:text-white mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-stone-600 dark:text-stone-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-stone-900 via-neutral-900 to-black py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <HiSparkles className="text-5xl text-amber-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              Our <span className="font-serif italic text-amber-400">Collection</span>
            </h1>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto">
              Discover your signature scent from our curated collection of luxury fragrances
            </p>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-stone-400">
              <span>{products.length} Products</span>
              <span>•</span>
              <span>{categories.length - 1} Categories</span>
              <span>•</span>
              <span>Premium Quality</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-stone-50 dark:bg-neutral-800 border border-stone-300 dark:border-neutral-700 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Left: Category Filters */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    categoryFilter === cat
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-lg scale-105"
                      : "bg-stone-100 dark:bg-neutral-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right: Sort, Filter, View Controls */}
            <div className="flex items-center gap-2">
              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-stone-50 dark:bg-neutral-800 border border-stone-300 dark:border-neutral-700 rounded-lg text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
              </div>

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg border transition-all ${
                  showFilters
                    ? "bg-amber-600 border-amber-600 text-white"
                    : "bg-stone-50 dark:bg-neutral-800 border-stone-300 dark:border-neutral-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-neutral-700"
                }`}
              >
                <SlidersHorizontal size={20} />
              </button>

              {/* View Mode Toggle */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-stone-100 dark:bg-neutral-800 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-neutral-700 shadow-sm"
                      : "text-stone-500 dark:text-stone-400"
                  }`}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-white dark:bg-neutral-700 shadow-sm"
                      : "text-stone-500 dark:text-stone-400"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-stone-50 dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        Price Range
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([+e.target.value, priceRange[1]])
                            }
                            className="flex-1 px-3 py-2 bg-white dark:bg-neutral-700 border border-stone-300 dark:border-neutral-600 rounded-lg text-sm"
                            placeholder="Min"
                          />
                          <span className="text-stone-400">-</span>
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], +e.target.value])
                            }
                            className="flex-1 px-3 py-2 bg-white dark:bg-neutral-700 border border-stone-300 dark:border-neutral-600 rounded-lg text-sm"
                            placeholder="Max"
                          />
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="10000"
                          step="100"
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], +e.target.value])
                          }
                          className="w-full accent-amber-600"
                        />
                      </div>
                    </div>

                    {/* Stock Filter */}
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                        Availability
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: "all", label: "All Products" },
                          { value: "in-stock", label: "In Stock" },
                          { value: "out-of-stock", label: "Out of Stock" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="stock"
                              value={option.value}
                              checked={stockFilter === option.value}
                              onChange={(e) => setStockFilter(e.target.value)}
                              className="accent-amber-600"
                            />
                            <span className="text-sm text-stone-700 dark:text-stone-300">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                      <button
                        onClick={clearFilters}
                        className="w-full px-4 py-2 bg-stone-200 dark:bg-neutral-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-neutral-600 transition-colors text-sm font-medium"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Filters Summary */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
              <Filter size={16} />
              <span>
                {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} active
              </span>
              <button
                onClick={clearFilters}
                className="text-amber-600 dark:text-amber-400 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-stone-600 dark:text-stone-400">
            Showing <span className="font-medium text-stone-900 dark:text-white">{filteredProducts.length}</span> of{" "}
            <span className="font-medium text-stone-900 dark:text-white">{products.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-stone-50 dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-stone-300 dark:border-neutral-700"
          >
            <Sparkles size={48} className="text-stone-400 dark:text-stone-500 mb-4" />
            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-2">
              No fragrances found
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-center max-w-md mb-6">
              Try adjusting your filters or search terms to discover more products
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;