import { motion } from "framer-motion";
import { Package, IndianRupee } from "lucide-react";

// CHANGED: props from totalStock to productsInStock
const StatCards = ({ totalProducts, productsInStock, avgPrice }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Products Card (Unchanged) */}
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
            <Package
              className="text-amber-600 dark:text-amber-400"
              size={24}
            />
          </div>
        </div>
      </motion.div>

      {/* CHANGED: Stock Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-stone-200 dark:border-neutral-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
              Products in Stock
            </p>
            <p className="text-3xl font-light text-stone-900 dark:text-white">
              {productsInStock}
            </p>
          </div>
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
            <Package
              className="text-emerald-600 dark:text-emerald-400"
              size={24}
            />
          </div>
        </div>
      </motion.div>

      {/* Average Price Card (Unchanged) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-stone-200 dark:border-neutral-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">
              Average Price
            </p>
            <p className="text-3xl font-light text-stone-900 dark:text-white">
              ₹{avgPrice}
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <IndianRupee
              className="text-blue-600 dark:text-blue-400"
              size={24}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatCards;