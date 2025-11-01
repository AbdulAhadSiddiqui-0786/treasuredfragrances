// src/routes/AppRoutes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
// import Register from "../pages/Register"; // REMOVED
import NotFound from "../pages/NotFound";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Products from "../pages/Products";
import Admin from "../admin/Admin";
import ProductDetail from "../pages/ProductDetails";
import AdminRoute from "./AdminRoute"; // <-- IMPORT
import ForgotPassword from "../pages/ForgotPassword"; // <-- IMPORT

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-[80vh] pt-20"> {/* Added pt-20 to avoid overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:name" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* <-- ADDED */}
          {/* <Route path="/register" element={<Register />} /> */} {/* <-- REMOVED */}
          <Route path="*" element={<NotFound />} />

          {/* --- ADMIN PROTECTED ROUTE --- */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<Admin />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default AppRoutes;