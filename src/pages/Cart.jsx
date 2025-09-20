import React, { useState } from "react";
import { Link } from "react-router-dom";

// Dummy cart items
const initialCart = [
  {
    id: 1,
    name: "Rose Essence",
    price: 49.99,
    quantity: 1,
    img: "/perfumes/perfume1.jpg",
  },
  {
    id: 2,
    name: "Ocean Breeze",
    price: 39.99,
    quantity: 2,
    img: "/perfumes/perfume2.jpg",
  },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-indigo-600 mb-4">
          Your Cart is Empty
        </h2>
        <Link
          to="/products"
          className="text-white bg-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-500 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Shopping Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-2xl shadow-md mb-4 p-4"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-indigo-600 font-bold">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2 space-x-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="mb-2">Items: {cartItems.length}</p>
          <p className="mb-4 font-bold text-indigo-600 text-xl">
            Total: ${totalPrice.toFixed(2)}
          </p>
          <Link
            to="/checkout"
            className="block text-center bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-500 transition"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
