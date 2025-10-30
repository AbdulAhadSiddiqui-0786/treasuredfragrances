import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
// import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Products from "../pages/Products";
import Admin from "../admin/Admin"
import ProductDetail from "../pages/ProductDetails";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:name" element={<ProductDetail />} />
          {/* <Route path="/cart" element={<Cart />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
