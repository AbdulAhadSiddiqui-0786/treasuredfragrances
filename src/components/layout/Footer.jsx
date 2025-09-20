import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Treasured Fragrances. All rights
          reserved.
        </p>
        <p>Follow us on social media for latest updates.</p>
      </div>
    </footer>
  );
};

export default Footer;
