import React from "react";
import { NavLink } from "react-router-dom";

interface FooterTemplateProps { currentYear: number }

const FooterTemplate: React.FC<FooterTemplateProps> = ({ currentYear }) => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* LEFT */}
        <p className="text-gray-600 text-sm text-center md:text-left">
          © {currentYear}{" "}
          <span className="font-semibold text-blue-600">CourierApp</span>. All rights reserved.
        </p>
        {/* RIGHT */}
        <div className="flex gap-4 text-sm">
          <NavLink to="/about" className="text-gray-600 hover:text-blue-600 transition">About</NavLink>
          <NavLink to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default FooterTemplate;