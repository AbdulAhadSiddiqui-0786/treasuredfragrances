// src/components/layout/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiYoutube,
  FiExternalLink
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mapLoaded, setMapLoaded] = useState(false);

  // Google Maps embed URL (converted from the share link)
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.058825066162!2d81.8238231!3d25.43629679999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acb21d4d6d9af%3A0x2a18bd35b8d03b63!2sTreasured%20Fragrances!5e0!3m2!1sen!2sin!4v1761844384642!5m2!1sen!2sin";

  const googleMapsLink = "http://maps.app.goo.gl/KHfU5kXSg1RoELyH6";

  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-300">
      {/* Map Section */}
      <div className="relative w-full h-96 bg-stone-800 dark:bg-neutral-950 overflow-hidden">
        {/* Map Overlay with Info */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-8 left-8 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl max-w-sm pointer-events-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-amber-500 rounded-full">
                <FiMapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-stone-900 dark:text-white">Visit Our Store</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">Experience luxury in person</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                180/1, SultanPur Bhawa, Roshan Bagh,<br />
                Prayagraj, Uttar Pradesh 211003
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <a href="tel:+918178036494" className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  <FiPhone size={16} />
                  +91 8178036494
                </a>
                <p className="text-stone-500 dark:text-stone-400 text-xs">
                  Mon-Sat: 10:00 AM - 8:00 PM<br />
                  Sunday: 11:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Get Directions
              <FiExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Google Map Iframe */}
        <iframe
          src={googleMapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setMapLoaded(true)}
          className="w-full h-full"
          title="Treasured Fragrances Location"
        />

        {/* Map Loading State */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-800 dark:bg-neutral-950">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-stone-400">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Main Footer */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <HiSparkles className="text-2xl text-amber-400" />
              <div className="flex flex-col">
                <span className="text-xl font-light tracking-wider text-white">
                  TREASURED
                </span>
                <span className="text-xs tracking-widest text-amber-400 font-medium -mt-1">
                  FRAGRANCES
                </span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Discover luxury fragrances crafted with passion and precision.
              Each scent tells a unique story of elegance and sophistication.
            </p>
            <div className="flex gap-4">
              {[
                { icon: FiInstagram, href: "https://www.instagram.com/treasured_fragrances/", label: "Instagram" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-full bg-white/5 hover:bg-amber-600 text-stone-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={32} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Collections", path: "/products" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-amber-400 group-hover:w-4 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-medium mb-6 tracking-wide">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <FiMapPin className="text-amber-400 mt-1 flex-shrink-0" size={18} />
                <a
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 leading-relaxed hover:text-amber-400 transition-colors"
                >
                  180/1, SultanPur Bhawa, Roshan Bagh,<br />
                  Prayagraj, Uttar Pradesh 211003
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiPhone className="text-amber-400 flex-shrink-0" size={18} />
                <a href="tel:+918178036494" className="text-stone-400 hover:text-amber-400 transition-colors">
                  +91 8178036494
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <FiMail className="text-amber-400 flex-shrink-0" size={18} />
                <a href="mailto:mujeebakhtar70@gmail.com" className="text-stone-400 hover:text-amber-400 transition-colors">
                  mujeebakhtar70@gmail.com
                </a>
              </li>
            </ul>

            {/* Working Hours */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="text-white text-sm font-medium mb-3">Store Hours</h4>
              <div className="space-y-1 text-xs text-stone-400">
                <p>Monday - Saturday: 10AM - 8PM</p>
                <p>Sunday: 11AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-stone-500">
              &copy; {currentYear} Treasured Fragrances. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;