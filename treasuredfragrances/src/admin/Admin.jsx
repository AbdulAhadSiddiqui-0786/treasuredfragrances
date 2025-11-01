// src/pages/Admin.jsx
import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Plus, Search } from "lucide-react";
import { HiSparkles } from "react-icons/hi";
import { uploadFiles } from "../utils/uploadthing";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteFileFromUploadthing } from "@/utils/UtAPI";

// Import the new components
import NotificationToast from "../admin/NotificationToast";
import ProductDialog from "../admin/ProductDialog";
import StatCards from "../admin/StatCards";
import ProductGrid from "../admin/ProductGrid";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    isAvailable: false, // CHANGED from countInStock
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

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/products");
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      showNotification("Failed to fetch products", "error");
    }
  }, [showNotification]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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

  // Standard input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ADDED: Handler specifically for the shadcn Checkbox
  const handleCheckedChange = (checked) => {
    setFormData((prev) => ({
      ...prev,
      isAvailable: checked,
    }));
  };

  const handleImageUpload = async (e) => {
    // ... (This function remains unchanged)
    const file = e.target.files?.[0];
    if (!file) return;

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

  const clearImage = () => {
    // ... (This function remains unchanged)
    setUploadedImage(null);
    setImageKey(null);
    setFormData((prev) => ({
      ...prev,
      img: null,
      imgKey: null,
    }));
  };

  const handleDeleteImage = async () => {
    // ... (This function remains unchanged)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CHANGED: Simplified productData
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        // The `isAvailable` boolean is already in formData
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
      isAvailable: false, // CHANGED
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
      isAvailable: product.isAvailable || false, // CHANGED
      img: product.img,
      imgKey: product.imgKey || null,
    });
    setUploadedImage(product.img);
    setImageKey(product.imgKey || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, imgKey) => {
    // ... (This function remains unchanged)
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

  // CHANGED: Stats calculation
  const totalProducts = products.length;
  // CHANGED: from totalStock to productsInStock
  const productsInStock = products.filter((p) => p.isAvailable).length;
  const avgPrice =
    products.length > 0
      ? (
          products.reduce((acc, p) => acc + parseFloat(p.price), 0) /
          products.length
        ).toFixed(2)
      : 0;

  const handleAddNewClick = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-16 from-stone-50 via-white to-amber-50/30 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <NotificationToast notification={notification} />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            {/* ... (Header title remains unchanged) ... */}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-lg">
                <HiSparkles className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-stone-900 dark:text-white mb-1">
                  Product{" "}
                  <span className="font-serif italic text-amber-600 dark:text-amber-400">
                    Management
                  </span>
                </h1>
                <p className="text-stone-600 dark:text-stone-400">
                  Manage your luxury fragrance collection
                </p>
              </div>
            </div>
            
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleAddNewClick}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-3 h-auto rounded-xl"
                >
                  <Plus className="mr-2 h-5 w-5" /> Add New Product
                </Button>
              </DialogTrigger>
              <ProductDialog
                editingId={editingId}
                formData={formData}
                handleChange={handleChange}
                handleCheckedChange={handleCheckedChange} // ADDED
                handleSubmit={handleSubmit}
                handleImageUpload={handleImageUpload}
                handleDeleteImage={handleDeleteImage}
                uploadedImage={uploadedImage}
                imageKey={imageKey}
                uploading={uploading}
                uploadProgress={uploadProgress}
                deleting={deleting}
                loading={loading}
                onClose={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
              />
            </Dialog>
          </div>

          <StatCards
            totalProducts={totalProducts}
            productsInStock={productsInStock} // CHANGED
            avgPrice={avgPrice}
          />

          {/* ... (Search bar remains unchanged) ... */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search products by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-stone-300 dark:border-neutral-600 focus:border-amber-500 dark:focus:border-amber-500 rounded-xl bg-white dark:bg-neutral-800"
            />
          </div>
        </motion.div>

        <ProductGrid
          products={filteredProducts}
          searchQuery={searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNewClick}
        />
      </div>

      {/* ... (Style tag remains unchanged) ... */}
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