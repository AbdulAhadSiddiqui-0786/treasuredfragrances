import { motion } from "framer-motion";
import { Pencil, Trash2, CheckCircle, XCircle } from "lucide-react"; // ADDED icons

const ProductCard = ({ product, index, onEditClick, onDeleteClick }) => {
  return (
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

        {/* Price Badge (Unchanged) */}
        <div className="absolute top-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-medium shadow-lg">
          ₹{product.price}
        </div>

        {/* --- Stock Badge MODIFIED --- */}
        <div className="absolute top-3 left-3">
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
        {/* --- End of Section --- */}

        {/* Gradient Overlay on Hover (Unchanged) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Product Info (Unchanged) */}
      <div className="p-5">
        <h3 className="text-lg font-medium text-stone-900 dark:text-white mb-2 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2 leading-relaxed">
          {product.description || "No description available"}
        </p>

        {/* Category Tag (Unchanged) */}
        {product.category && (
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-medium">
              {product.category}
            </span>
          </div>
        )}

        {/* Action Buttons (Unchanged) */}
        <div className="flex gap-2 pt-4 border-t border-stone-200 dark:border-neutral-700">
          <button
            onClick={onEditClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-100 dark:bg-neutral-700 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-stone-700 dark:text-stone-300 hover:text-amber-700 dark:hover:text-amber-400 font-medium rounded-lg transition-all duration-300"
          >
            <Pencil size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={onDeleteClick}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium rounded-lg transition-all duration-300"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>

      {/* Hover Border Effect (Unchanged) */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-amber-400/50 transition-all duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProductCard;