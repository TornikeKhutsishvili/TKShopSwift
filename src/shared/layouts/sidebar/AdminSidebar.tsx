import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar:React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
    isActive
      ? 'bg-indigo-50 text-indigo-600'
      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  return (
    <>
      {/* Dashboard */}
      <NavLink to="/admin" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-dashboard mr-3 h-5 w-5 text-indigo-500" aria-hidden="true">
          <rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect>
          <rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>
        </svg>
        Dashboard
      </NavLink>

      {/* Users */}
      <NavLink to="/admin/users" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <circle cx="9" cy="7" r="4"></circle>
        </svg>
        Users
      </NavLink>

      {/* Couriers */}
      <NavLink to="/admin/couriers" className={linkClass}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-truck mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
          <path d="M15 18H9"></path>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
          <circle cx="17" cy="18" r="2"></circle><circle cx="7" cy="18" r="2"></circle>
        </svg>
        Couriers
      </NavLink>
    </>
  )
}

export default AdminSidebar;