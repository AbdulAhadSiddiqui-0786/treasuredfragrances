import React from 'react';
import { useCart } from '../context/CartContext'; // Adjust path if needed
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingCart } from 'react-icons/fi';

const Cart = () => {
  const { cartItems, removeFromCart, loading, itemCount, totalPrice } = useCart();

  // Loading State
  if (loading && cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
        <p className="text-lg dark:text-neutral-300">Loading your cart...</p>
      </div>
    );
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl py-24 px-4 text-center">
        <FiShoppingCart className="mx-auto h-20 w-20 text-neutral-400 dark:text-neutral-600" />
        <h2 className="mt-6 text-2xl font-semibold dark:text-white">
          Your cart is empty
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // Cart with Items
  return (
    <div className="bg-white dark:bg-neutral-900">
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Column 1: Cart Items */}
          <section aria-labelledby="cart-heading" className="lg:col-span-2">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-neutral-200 dark:divide-neutral-700 border-b border-t border-neutral-200 dark:border-neutral-700"
            >
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg">
                            <Link
                              to={`/product/${item.id}`}
                              className="font-medium text-neutral-900 dark:text-white hover:underline"
                            >
                              {item.name}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                          {item.category}
                        </p>
                        <p className="mt-2 text-lg font-medium text-neutral-900 dark:text-white">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <p className="text-neutral-500 dark:text-neutral-400">
                          Qty: {item.quantity}
                        </p>
                        
                        {/* You could add a quantity selector here later */}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center space-x-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        type="button"
                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
                      >
                        <FiTrash2 className="mr-1 h-4 w-4" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Column 2: Order Summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-800 px-4 py-6 sm:p-6 lg:col-span-1 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-2xl font-medium text-neutral-900 dark:text-white"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-lg text-neutral-600 dark:text-neutral-300">
                  Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                </dt>
                <dd className="text-lg font-medium text-neutral-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-700 pt-4">
                <dt className="text-xl font-bold text-neutral-900 dark:text-white">
                  Order total
                </dt>
                <dd className="text-xl font-bold text-neutral-900 dark:text-white">
                  ${totalPrice.toFixed(2)}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full inline-flex items-center justify-center bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
              >
                Proceed to Checkout
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;