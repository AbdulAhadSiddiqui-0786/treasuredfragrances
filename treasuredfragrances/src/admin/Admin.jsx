// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Pencil, 
  Trash2, 
  Upload, 
  X, 
  Plus, 
  Package,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MoreVertical
} from "lucide-react";
import { HiSparkles } from "react-icons/hi";
import { uploadFiles } from "../utils/uploadthing";
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
import { deleteFileFromUploadthing } from "@/utils/UtAPI";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    img: "",
    imgKey: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageKey, setImageKey] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [notification, setNotification] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      showNotification("Failed to fetch products", "error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showNotification("File size must be less than 10MB", "error");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 150);

    try {
      const uploaded = await uploadFiles("imageUploader", { files: [file] });
      const imageUrl = uploaded[0].url;
      const uploadedKey = uploaded[0].key;

      setUploadedImage(imageUrl);
      setImageKey(uploadedKey);
      setFormData((prev) => ({
        ...prev,
        img: imageUrl,
        imgKey: uploadedKey,
      }));
      setUploadProgress(100);
      showNotification("Image uploaded successfully", "success");
    } catch (err) {
      console.error("Error uploading:", err);
      showNotification("Upload failed. Please try again", "error");
      setUploadProgress(0);
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  const handleDeleteImage = async () => {
    if (!imageKey) {
      clearImage();
      return;
    }

    setDeleting(true);

    try {
      const deleted = await deleteFileFromUploadthing(imageKey);

      if (deleted) {
        clearImage();
        showNotification("Image removed successfully", "success");
      } else {
        throw new Error("Failed to delete from UploadThing");
      }
    } catch (err) {
      console.error("Error deleting image:", err);
      showNotification("Failed to remove image", "error");
    } finally {
      setDeleting(false);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    setImageKey(null);
    setFormData((prev) => ({
      ...prev,
      img: null,
      imgKey: null,
    }));
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        countInStock: parseInt(formData.countInStock) || 0,
      };

      if (editingId) {
        await axiosInstance.put(`/products/${editingId}`, productData);
        showNotification("Product updated successfully!", "success");
      } else {
        await axiosInstance.post("/products", productData);
        showNotification("Product added successfully!", "success");
      }

      resetForm();
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      showNotification(
        err.response?.data?.error || "Failed to save product",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      countInStock: "",
      img: "",
      imgKey: "",
    });
    setUploadedImage(null);
    setImageKey(null);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      img: product.img,
      imgKey: product.imgKey || null,
    });
    setUploadedImage(product.img);
    setImageKey(product.imgKey || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, imgKey) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      if (imgKey) {
        await deleteFileFromUploadthing(imgKey);
      }

      await axiosInstance.delete(`/products/${id}`);
      showNotification("Product deleted successfully!", "success");
      fetchProducts();
    } catch (err) {
      console.error("Error deleting:", err);
      showNotification("Failed to delete product", "error");
    }
  };

  // Stats calculation
  const totalProducts = products.length;
  const totalStock = products.reduce((acc, p) => acc + (p.countInStock || 0), 0);
  const avgPrice = products.length > 0
    ? (products.reduce((acc, p) => acc + parseFloat(p.price), 0) / products.length).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-stone-50 via-white to-amber-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-lg border ${
              notification.type === "success"
                ? "bg-emerald-500/95 border-emerald-400 text-white"
                : "bg-red-500/95 border-red-400 text-white"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Title & Add Button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                <HiSparkles className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-white mb-1">
                  Product <span className="font-serif italic text-amber-600 dark:text-amber-400">Management</span>
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Manage your luxury fragrance collection
                </p>
              </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm();
                    setIsModalOpen(true);
                  }}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3 h-auto rounded-xl"
                >
                  <Plus className="mr-2 h-5 w-5" /> Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border-stone-200 dark:border-neutral-700">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-light flex items-center gap-2">
                    {editingId ? (
                      <>
                        <Pencil size={24} className="text-amber-600" />
                        Edit Product
                      </>
                    ) : (
                      <>
                        <Plus size={24} className="text-amber-600" />
                        Add New Product
                      </>
                    )}
                  </DialogTitle>
                  <DialogDescription className="text-stone-600 dark:text-stone-400">
                    {editingId
                      ? "Update your product details below"
                      : "Fill in the product information to add to your catalog"}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                  {/* Product Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Product Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="e.g., Midnight Rose Eau de Parfum"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-lg"
                    />
                  </div>

                  {/* Price & Stock */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                        Price (₹) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        name="price"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countInStock" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                        Stock Count
                      </Label>
                      <Input
                        id="countInStock"
                        type="number"
                        name="countInStock"
                        placeholder="0"
                        min="0"
                        value={formData.countInStock}
                        onChange={handleChange}
                        className="border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-lg"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Category
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="e.g., Eau de Parfum, Cologne, Body Spray"
                      value={formData.category}
                      onChange={handleChange}
                      className="border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-lg"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the fragrance notes, mood, and characteristics..."
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-lg resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Product Image
                    </Label>

                    {uploadedImage ? (
                      <div className="relative group rounded-xl overflow-hidden border-2 border-stone-200 dark:border-neutral-700 shadow-md">
                        <img
                          src={uploadedImage}
                          alt="Product preview"
                          className="w-full h-64 object-cover"
                        />

                        {/* Overlay with delete button */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleDeleteImage}
                            disabled={deleting}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all shadow-lg ${
                              deleting
                                ? "bg-stone-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600 hover:scale-105"
                            } text-white`}
                          >
                            {deleting ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Removing...
                              </>
                            ) : (
                              <>
                                <Trash2 size={18} />
                                Remove Image
                              </>
                            )}
                          </button>
                        </div>

                        {/* Image info badge */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <ImageIcon size={16} className="text-white" />
                              <span className="text-white text-sm font-medium">
                                Product Image
                              </span>
                            </div>
                            {imageKey && (
                              <span className="px-2 py-1 bg-emerald-500/90 text-white text-xs rounded-full flex items-center gap-1">
                                <CheckCircle size={12} />
                                Uploaded
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Upload Area */}
                        <label
                          htmlFor="file-upload"
                          className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-stone-300 dark:border-neutral-600 p-8 rounded-xl bg-stone-50/50 dark:bg-neutral-800/50 hover:border-amber-500 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all duration-300 cursor-pointer group"
                        >
                          <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <Upload
                              size={32}
                              className="text-amber-600 dark:text-amber-400"
                            />
                          </div>

                          <div className="text-center space-y-2">
                            <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                              Click to upload product image
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                              PNG, JPG, WEBP • Max 10MB
                            </p>
                          </div>

                          <div className="px-6 py-2.5 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-medium group-hover:bg-amber-600 group-hover:text-white dark:group-hover:bg-amber-600 transition-colors">
                            Browse Files
                          </div>

                          <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="hidden"
                          />
                        </label>

                        {/* Upload Progress */}
                        {uploading && (
                          <div className="space-y-3 bg-white dark:bg-neutral-800 p-5 rounded-xl border border-stone-200 dark:border-neutral-700 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                                  <Upload
                                    size={18}
                                    className="text-amber-600 dark:text-amber-400 animate-pulse"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">
                                    Uploading image...
                                  </p>
                                  <p className="text-xs text-stone-500 dark:text-stone-400">
                                    Please wait
                                  </p>
                                </div>
                              </div>
                              <span className="text-lg text-amber-600 dark:text-amber-400 font-semibold tabular-nums">
                                {uploadProgress}%
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 bg-stone-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full relative overflow-hidden"
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4 border-t border-stone-200 dark:border-neutral-700">
                    <Button
                      type="submit"
                      disabled={loading || uploading}
                      className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 h-11 rounded-lg font-medium"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {editingId ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          {editingId ? "Update Product" : "Add Product"}
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsModalOpen(false);
                        resetForm();
                      }}
                      className="flex-1 border-stone-300 dark:border-neutral-600 hover:bg-stone-100 dark:hover:bg-neutral-800 h-11 rounded-lg"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-stone-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
                    Total Products
                  </p>
                  <p className="text-3xl font-light text-stone-900 dark:text-white">
                    {totalProducts}
                  </p>
                </div>
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <Package className="text-amber-600 dark:text-amber-400" size={24} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-stone-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
                    Total Stock
                  </p>
                  <p className="text-3xl font-light text-stone-900 dark:text-white">
                    {totalStock}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <Package className="text-emerald-600 dark:text-emerald-400" size={24} />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <Input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-xl bg-white dark:bg-neutral-800"
            />
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-800 rounded-2xl border-2 border-dashed border-stone-300 dark:border-neutral-700"
          >
            <div className="w-20 h-20 rounded-full bg-stone-100 dark:bg-neutral-700 flex items-center justify-center mb-6">
              <Package size={40} className="text-stone-400 dark:text-stone-500" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 dark:text-white mb-2">
              {searchQuery ? "No products found" : "No products yet"}
            </h3>
            <p className="text-stone-500 dark:text-stone-400 text-center max-w-md mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : "Start building your fragrance collection by adding your first product"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 px-6"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Product
              </Button>
            )}
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-md hover:shadow-2xl border border-stone-200 dark:border-neutral-700 overflow-hidden transition-all duration-500"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-stone-100 dark:bg-neutral-700 aspect-square">
                  <img
                    src={product.img || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Price Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
                    ₹{product.price}
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute top-3 left-3">
                    {product.countInStock > 0 ? (
                      <span className="px-3 py-1.5 bg-emerald-500/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-lg flex items-center gap-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        {product.countInStock} in stock
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-red-500/90 backdrop-blur-sm text-white rounded-full text-xs font-medium shadow-lg">
                        Out of stock
                      </span>
                    )}
                  </div>

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-medium text-stone-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
                    {product.description || "No description available"}
                  </p>

                  {/* Category Tag */}
                  {product.category && (
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-stone-200 dark:border-neutral-700">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-neutral-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 font-medium rounded-lg transition-all duration-300"
                    >
                      <Pencil size={16} />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(product._id, product.imgKey)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium rounded-lg transition-all duration-300"
                    >
                      <Trash2 size={16} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Animation Keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Admin;