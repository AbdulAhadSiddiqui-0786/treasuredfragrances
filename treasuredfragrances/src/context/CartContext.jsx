import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "./AuthContext"; // Import your AuthContext

// Create CartContext
const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // Fetch cart from DB when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        setLoading(true);
        try {
          // --- FIX 1: Add Authorization header to the request ---
          const { data } = await axiosInstance.get("/cart", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCartItems(data);
        } catch (err) {
          console.error(
            "Failed to fetch cart:",
            err.response?.data?.error || err.message
          );
        } finally {
          setLoading(false);
        }
      } else {
        setCartItems([]);
      }
    };

    fetchCart();
  }, [token]);

  const addToCart = async (product) => {
    try {
      // --- FIX 2: Add the full POST logic ---
      // We send the productId and quantity to the backend
      const { data: updatedCart } = await axiosInstance.post(
        "/cart/add",
        {
          productId: product._id, // Use the product's MongoDB _id
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // <-- Also need auth here
          },
        }
      );

      setCartItems(updatedCart); // Now 'updatedCart' is defined
    } catch (err) {
      console.error(
        "Failed to add to cart:",
        err.response?.data?.error || err.message
      );
      alert("Failed to add item. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // --- FIX 3: Add Authorization header here too ---
      const { data: updatedCart } = await axiosInstance.delete(
        `/cart/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(updatedCart);
    } catch (err) {
      console.error(
        "Failed to remove from cart:",
        err.response?.data?.error || err.message
      );
    }
  };

  const clearCart = async () => {
    alert("Clear cart functionality needs a backend endpoint!");
    // When you build it, it will look like this:
    /*
    try {
      await axiosInstance.delete('/api/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart:", err.response?.data?.error);
    }
    */
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.productId?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  // This formatting logic is good. It adapts your backend data for the frontend.
  const formattedCartItems = cartItems.map((item) => ({
    ...item.productId, // Spread the populated product details
    id: item.productId._id, // Ensure 'id' is the product's _id
    quantity: item.quantity, // Add the quantity
  }));

  return (
    <CartContext.Provider
      value={{
        cartItems: formattedCartItems, // Pass the formatted items
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        loading,
        itemCount: formattedCartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        ),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);