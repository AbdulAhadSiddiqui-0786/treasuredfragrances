import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, searchQuery, onEdit, onDelete, onAddNew }) => {
  if (products.length === 0) {
    return (
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
            onClick={onAddNew}
            className="bg-black dark:bg-white text-white dark:text-black hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 px-6"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Your First Product
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          index={index}
          onEditClick={() => onEdit(product)}
          onDeleteClick={() => onDelete(product._id, product.imgKey)}
        />
      ))}
    </div>
  );
};

export default ProductGrid;