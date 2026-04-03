import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/ui/Button";
import UserSidebar from "./UserSidebar";
import CourierSidebar from "./CourierSidebar";
import AdminSidebar from "./AdminSidebar";
import { authUserSelector, authLoadingSelector } from "../../../store/auth/slice/auth.slice";
import { logoutUser } from "../../../store/auth/thunks/auth.thunks";
import { useAppDispatch, useAppSelector } from "../../../core/hooks/useHooks";

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(authUserSelector);
  const authLoading = useAppSelector(authLoadingSelector);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
      isActive
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`;

  if (!user) return null;

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <h1 className="text-xl font-bold text-indigo-600">CourierApp</h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {/* Sidebar with Role */}
          {user.role === "admin" && <AdminSidebar />}
          {user.role === "user" && <UserSidebar />}
          {user.role === "courier" && <CourierSidebar />}

          {/* General Pages */}
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </nav>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Button type="button" onClick={handleLogout}
          className="flex items-center w-full px-2 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:cursor-pointer disabled:opacity-50"
          disabled={authLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
          {authLoading ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;