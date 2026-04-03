import React from "react";
import { NavLink } from "react-router-dom";

const UserSidebar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
    isActive
      ? 'bg-indigo-50 text-indigo-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <div>
      {/* Find Courier */}
      <NavLink to="/user" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
          <path d="M15 18H9" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
          <circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" />
        </svg>
        Find Courier
      </NavLink>

      {/* Requests */}
      <NavLink to="/user/requests" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" />
        </svg>
        My Requests
      </NavLink>

      {/* Profile */}
      <NavLink to="/user/profile" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
        </svg>
        Profile
      </NavLink>
    </div>
  );
};

export default UserSidebar;