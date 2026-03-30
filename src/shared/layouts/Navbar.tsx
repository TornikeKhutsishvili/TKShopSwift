import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-blue-100 text-blue-600'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="flex items-center gap-2">
      {/* LEFT SIDE */}
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/about" className={linkClass}>About</NavLink>
      <NavLink to="/contact" className={linkClass}>Contact</NavLink>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">
        <NavLink to="/login" className={linkClass}>Login</NavLink>
        <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;