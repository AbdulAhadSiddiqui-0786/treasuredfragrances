// src/pages/Home.js
import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { FiArrowRight, FiSend, FiCheckCircle } from "react-icons/fi";
import { 
  HiSparkles, 
  HiHeart, 
  HiStar,
  HiTruck,
  HiShieldCheck,
  HiGift 
} from "react-icons/hi";
import ProductCard from "../components/products/ProductCard";

// --- Hero Section ---
const HeroSection = () => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden dark:bg-gradient-to-br dark:from-stone-900 dark:via-neutral-900 dark:to-black ">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="/background.png"
        alt="Luxury Perfume"
        className="w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t dark:from-black dark:via-black/50 to-transparent from-black via-black/50"></div>
    </div>

    {/* Floating Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>

    {/* Content */}
    <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <div className="animate-fadeIn">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <HiSparkles className="text-amber-400" />
       
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold  tracking-tight dark:text-white mb-6">
          Unveil your scented 
          <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mt-2">
           Treasure
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto mb-12 leading-relaxed">
           Immerse yourself in an exquisite collection of artisanal fragrances, crafted with the finest ingredients from around the world.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/products"
            className="group px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 flex items-center gap-2 shadow-2xl hover:shadow-amber-400/50 hover:scale-105"
          >
            Explore Collection
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a 
            href="#Story"
            className="px-8 py-4 bg-transparent text-white font-medium rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
          >
            Our Story
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20 pt-12 border-t border-white/10">
          {[
            { number: "200+", label: "Unique Fragrances" },
            { number: "2K+", label: "Happy Customers" },
            { number: "25+", label: "Awards Won" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-light text-amber-400 mb-2">{stat.number}</div>
              <div className="text-sm text-stone-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  </section>
);

// --- Featured Collections ---
const CollectionsSection = () => {
  const collections = [
    {
      name: "Floral Essence",
      description: "Delicate & romantic garden blooms",
      image: "/Floral.png",
      color: "from-rose-500/20 to-pink-500/20"
    },
    {
      name: "Woody Notes",
      description: "Warm & sophisticated earthiness",
      image: "/woddy.jpg",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      name: "Fresh Citrus",
      description: "Vibrant & energizing freshness",
      image: "/oriental.png",
      color: "from-emerald-500/20 to-teal-500/20"
    },
    {
      name: "Oriental Spice",
      description: "Exotic & mysterious allure",
      image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800",
      color: "from-purple-500/20 to-violet-500/20"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            Fragrance <span className="font-serif italic">Collections</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Each collection tells a unique story, designed to complement every mood and moment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((collection, index) => (
            <Link 
              key={index}
              to={`/products?collection=${collection.name.toLowerCase().replace(' ', '-')}`}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              {/* Image */}
              <img 
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-light text-white mb-2 transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                  {collection.name}
                </h3>
                <p className="text-sm text-white/90 mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {collection.description}
                </p>
                <div className="flex items-center text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Explore <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Featured Products Section (Enhanced) ---
const FeaturedProductsSection = ({ products }) => (
  <section className="bg-stone-50 dark:bg-neutral-800 py-24">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium mb-4">
          <HiStar className="text-amber-500" />
          Bestsellers
        </div>
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
          Featured <span className="font-serif italic">Fragrances</span>
        </h2>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
          Discover our most loved scents, carefully curated for the discerning perfume enthusiast
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-16">
        <Link 
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-medium rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
        >
          View All Products
          <FiArrowRight />
        </Link>
      </div>
    </div>
  </section>
);

// --- Brand Story Section ---
const BrandStorySection = () => (
  <section className="py-24 bg-gradient-to-br from-amber-50 via-white to-rose-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Side */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl"></div>
          <div className="relative grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?q=80&w=600"
              alt="Ingredients"
              className="rounded-2xl shadow-xl"
            />
            <img 
              src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=600"
              alt="Perfume bottles"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Content Side */}
        <div id="Story">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-neutral-700 shadow-md text-sm font-medium mb-6">
            <HiHeart className="text-rose-500" />
            Our Story
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
            Crafted with
            <span className="block font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 mt-2">
              Passion & Precision
            </span>
          </h2>

          <p className="text-lg text-stone-600 dark:text-stone-300 mb-6 leading-relaxed">
            For over many years, we've been creating exceptional fragrances that capture 
            the essence of luxury and sophistication. Each bottle is a masterpiece, 
            blending rare ingredients with artisanal expertise.
          </p>

          <p className="text-stone-600 dark:text-stone-400 mb-8 leading-relaxed">
            Our perfumers travel the world to source the finest essences—from Bulgarian rose 
            to Indonesian patchouli—ensuring every fragrance tells a unique and unforgettable story.
          </p>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {[
              "Sustainable ingredients",
              "Handcrafted by master perfumers",
              "Cruelty-free & eco-conscious",
              "Exclusive limited editions"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <FiCheckCircle className="text-emerald-500 text-xl flex-shrink-0" />
                <span className="text-stone-700 dark:text-stone-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Why Choose Us Section ---
const WhyChooseUsSection = () => {
  const features = [
    {
      icon: <HiTruck className="text-4xl" />,
      title: "Free Shipping",
      description: "Free delivery on orders over  ₹500"
    },
    {
      icon: <HiShieldCheck className="text-4xl" />,
      title: "Authenticity Guaranteed",
      description: "100% genuine luxury fragrances"
    },
    {
      icon: <HiGift className="text-4xl" />,
      title: "Luxury Packaging",
      description: "Beautifully wrapped for gifting"
    },
    {
      icon: <HiHeart className="text-4xl" />,
      title: "Sample Program",
      description: "Try before you commit to full size"
    }
  ];

  return (
    <section className="py-24 dark:bg-black  ">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
            The <span className="font-serif italic text-amber-400">Luxury</span> Experience
          </h2>
          <p className="text-stone-400 max-w-2xl mx-auto">
            We're committed to providing an unparalleled shopping experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-400/10 text-amber-400 mb-6 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
              <p className="text-stone-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- Main Home Component ---
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
      const res = await axiosInstance.get("/products");
        setFeaturedProducts(res.data.slice(0, 4));
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️ Error</div>
          <p className="text-stone-600 dark:text-stone-400">{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 dark:text-stone-400">Loading luxury...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-stone-100 min-h-screen">
      <HeroSection />
      <CollectionsSection />
      <FeaturedProductsSection products={featuredProducts} />
      <BrandStorySection />
      <WhyChooseUsSection />
    </div>
  );
};

export default Home;