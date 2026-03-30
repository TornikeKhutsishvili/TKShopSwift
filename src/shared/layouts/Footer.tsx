import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LEFT */}
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {currentYear} <span className="font-semibold text-blue-600">TKShopSwift</span>. All rights reserved.
        </p>

        {/* RIGHT */}
        <div className="flex gap-4 text-sm">
          <NavLink to="/home" className="text-gray-600 hover:text-blue-600 transition">Home</NavLink>
          <NavLink to="/about" className="text-gray-600 hover:text-blue-600 transition">About</NavLink>
          <NavLink to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;