// src/pages/ProductDetail.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Share2,
  ShoppingBag,
  Star,
  Minus,
  Plus,
  Check,
  Truck,
  Shield,
  RotateCcw,
  Gift,
  ChevronDown,
  ChevronUp,
  X,
  Link2,
  Mail,
  Package,
  Sparkles as SparklesIcon,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from 'lucide-react';
import { HiSparkles } from 'react-icons/hi';
import ProductCard from '../components/products/ProductCard';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axiosInstance from '@/api/axiosInstance';

const ProductDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [notification, setNotification] = useState(null);




  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const decodedName = decodeURIComponent(name);

        const res = await axiosInstance.get(`/products/name/${encodeURIComponent(decodedName)}`);



        setProduct(res.data);


      } catch (err) {
        setError(err.message);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchProduct();
      window.scrollTo(0, 0);
    }
  }, [name]);



  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };









  // Simulate sending message


  const handleCallNow = () => {
    window.location.href = 'tel:+918178036494';
  };

  const handleEmailNow = () => {
    window.location.href = 'mailto:ujeebakhtar70@gmail.com';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/918178036494', '_blank');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out ${product.name} on Treasured Fragrances`;

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      copy: url,
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      showNotification('Link copied to clipboard!', 'success');
      setShowShareModal(false);
    } else {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
      setShowShareModal(false);
    }
  };




  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
            Loading luxury fragrance...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900">
        <Package size={64} className="text-stone-400 mb-4" />
        <h2 className="text-2xl font-light text-stone-900 dark:text-white mb-2">
          {error}
        </h2>
        <p className="text-stone-500 dark:text-stone-400 mb-6">
          The fragrance you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate('/products')}
          className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 shadow-lg"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  if (!product) return null;


  const images = product.images || [product.img];

  return (
    <div className="min-h-screen bg-white py-16 dark:bg-neutral-900">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl ${notification.type === 'success'
                ? 'bg-emerald-500 text-white'
                : 'bg-red-500 text-white'
              }`}
          >
            <Check size={20} />
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareModal(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-medium text-stone-900 dark:text-white">
                  Share this fragrance
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'email', icon: Mail, label: 'Email', color: 'bg-stone-600' },
                  { id: 'copy', icon: Link2, label: 'Copy Link', color: 'bg-amber-600' },
                ].map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleShare(platform.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 ${platform.color} text-white rounded-xl hover:opacity-90 transition-opacity`}
                  >
                    <platform.icon size={20} />
                    <span className="font-medium">{platform.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-stone-400">/</span>
          <Link to="/products" className="text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Products
          </Link>
          <span className="text-stone-400">/</span>
          <span className="text-stone-900 dark:text-white">{product.name}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate('/products')}
          className="group flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-8"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Collection</span>
        </button>

        {/* Product Main Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery - Previous code stays the same */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-100 dark:bg-neutral-800 aspect-square shadow-xl">
              <img
                src={images[selectedImage] || product.img || '/placeholder.svg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badges */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm text-stone-700 dark:text-stone-300 rounded-full text-sm font-medium shadow-lg">
                  {product.category}
                </span>
              </div>

              <div className="absolute top-6 right-6">
                {product.countInStock > 0 ? (
                  <span className="px-4 py-2 bg-emerald-500/95 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    In Stock
                  </span>
                ) : (
                  <span className="px-4 py-2 bg-red-500/95 backdrop-blur-sm text-white rounded-full text-sm font-semibold shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="absolute bottom-6 right-6 flex gap-2">

                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-3 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md text-stone-700 dark:text-stone-300 rounded-full hover:bg-amber-500 hover:text-white transition-all shadow-lg"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${selectedImage === index
                        ? 'border-amber-500 scale-95'
                        : 'border-transparent hover:border-stone-300 dark:hover:border-neutral-600'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <HiSparkles className="text-amber-500" size={20} />
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Luxury Fragrance
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-white mb-4 leading-tight">
                {product.name}
              </h1>


              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl md:text-5xl font-light text-stone-900 dark:text-white">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-2xl text-stone-400 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="p-6 bg-stone-50 dark:bg-neutral-800 rounded-xl border border-stone-200 dark:border-neutral-700">
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {product.description || 'Experience the luxury of this exquisite fragrance, crafted with the finest ingredients from around the world.'}
              </p>
            </div>

            {/* Stock Info */}
            {product.isAvailable && (
              <div className="flex items-center gap-2 text-sm">
                <Check className="text-emerald-500" size={18} />
                <span className="text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {product.isAvailable ? "In Stock" : "Currently Unavailable"}
                  </span>{' '}
                </span>
              </div>
            )}

            {/* Action Buttons - UPDATED SECTION */}
            <div className="space-y-3 pt-6 border-t border-stone-200 dark:border-neutral-700">

              {/* Contact Us Dialog Button */}
              <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                    <MessageCircle size={20} />
                    Contact Us About This Product
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border-stone-200 dark:border-neutral-700">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-light flex items-center gap-2">
                      <HiSparkles className="text-amber-500" size={24} />
                      Get in Touch
                    </DialogTitle>
                    <DialogDescription className="text-stone-600 dark:text-stone-400">
                      Have questions about {product.name}? We're here to help!
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 mt-4">
                    {/* Quick Contact Methods */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <button
                        onClick={handleCallNow}
                        className="flex flex-col items-center gap-2 p-4 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-xl transition-colors group"
                      >
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Phone className="text-white" size={20} />
                        </div>
                        <span className="text-sm font-medium text-stone-900 dark:text-white">
                          Call Now
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Quick Response
                        </span>
                      </button>

                      <button
                        onClick={handleWhatsApp}
                        className="flex flex-col items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-xl transition-colors group"
                      >
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MessageCircle className="text-white" size={20} />
                        </div>
                        <span className="text-sm font-medium text-stone-900 dark:text-white">
                          WhatsApp
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Chat Live
                        </span>
                      </button>

                      <button
                        onClick={handleEmailNow}
                        className="flex flex-col items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl transition-colors group"
                      >
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Mail className="text-white" size={20} />
                        </div>
                        <span className="text-sm font-medium text-stone-900 dark:text-white">
                          Email Us
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Detailed Help
                        </span>
                      </button>
                    </div>

                    <div className="pt-6 border-t border-stone-200 dark:border-neutral-700">
                      <h4 className="font-medium text-stone-900 dark:text-white mb-4">
                        Contact Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-sm">
                          <Phone className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-stone-900 dark:text-white">
                              Phone
                            </p>
                            <div className="flex flex-col">
                              <a href="tel:+918178036494" className="text-stone-400 hover:text-amber-400 transition-colors">
                                +91 8178036494


                              </a>
                              <a href="tel:+917007607290" className="text-stone-400 hover:text-amber-400 transition-colors">
                                +91 7007607290

                              </a>
                            </div>

                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                          <Mail className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-stone-900 dark:text-white">
                              Email
                            </p>
                            <a
                              href="mailto:ujeebakhtar70@gmail.com"
                              className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                            >
                              info@treasuredfragrances.in
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                          <MapPin className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-stone-900 dark:text-white">
                              Location
                            </p>
                            <p className="text-stone-600 dark:text-stone-400">
                              180/1, SultanPur Bhawa, Roshan Bagh,<br></br>
                              Prayagraj, Uttar Pradesh 211003
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                          <Clock className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" size={18} />
                          <div>
                            <p className="font-medium text-stone-900 dark:text-white">
                              Business Hours
                            </p>
                            <p className="text-stone-600 dark:text-stone-400">
                              Mon-Sat: 10:00 AM - 8:00 PM<br />
                              Sunday: 11:00 AM - 6:00 PM
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-stone-200 dark:border-neutral-700">
              {[
                { icon: Truck, text: 'Free Shipping' },
                { icon: Shield, text: '100% Authentic' },
                { icon: RotateCcw, text: 'Easy Returns' },
                { icon: Gift, text: 'Gift Wrapping' },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
                    <item.icon className="text-amber-600 dark:text-amber-400" size={20} />
                  </div>
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Rest of the component (tabs, related products) stays the same... */}
      </div>
    </div>
  );
};

export default ProductDetail;