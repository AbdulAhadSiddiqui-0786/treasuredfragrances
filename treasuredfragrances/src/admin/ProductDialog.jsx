import { motion } from "framer-motion";
import {
  Pencil,
  Trash2,
  Upload,
  Plus,
  Image as ImageIcon,
  CheckCircle,
} from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"; // ADDED

const ProductDialog = ({
  editingId,
  formData,
  handleChange,
  handleCheckedChange, // ADDED
  handleSubmit,
  handleImageUpload,
  handleDeleteImage,
  uploadedImage,
  imageKey,
  uploading,
  uploadProgress,
  deleting,
  loading,
  onClose,
}) => {
  return (
    <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto bg-white dark:bg-neutral-900 border-stone-200 dark:border-neutral-700">
      {/* ... (DialogHeader remains unchanged) ... */}
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
        {/* ... (Product Name remains unchanged) ... */}
        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
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

        {/* --- Price & Stock Section MODIFIED --- */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label
              htmlFor="price"
              className="text-sm font-medium text-stone-700 dark:text-stone-300"
            >
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

          {/* CHANGED: Replaced Stock Count Input with Availability Checkbox */}
          <div className="space-y-2 flex flex-col justify-end pb-1.5">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isAvailable"
                name="isAvailable"
                checked={formData.isAvailable}
                onCheckedChange={handleCheckedChange} // Use the new handler
                className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <Label
                htmlFor="isAvailable"
                className="text-sm font-medium text-stone-700 dark:text-stone-300 cursor-pointer"
              >
                Product is available
              </Label>
            </div>
          </div>
        </div>
        {/* --- End of Section --- */}

        {/* ... (Category remains unchanged) ... */}
        <div className="space-y-2">
          <Label
            htmlFor="category"
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
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

        {/* ... (Description remains unchanged) ... */}
        <div className="space-y-2">
          <Label
            htmlFor="description"
            className="text-sm font-medium text-stone-700 dark:text-stone-300"
          >
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

        {/* ... (Image Upload section remains unchanged) ... */}
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

        {/* ... (Form Actions remain unchanged) ... */}
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
              <>{editingId ? "Update Product" : "Add Product"}</>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-stone-300 dark:border-neutral-600 hover:bg-stone-100 dark:hover:bg-neutral-800 h-11 rounded-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default ProductDialog;