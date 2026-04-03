import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import MainLayout from '../shared/layouts/MainLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
import UserLayout from '../shared/layouts/UserLayout';
import CourierLayout from '../shared/layouts/CourierLayout';
import AdminLayout from '../shared/layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';

// Lazy Routes
const ContactPage = lazy(() => import("../features/pages/contact/ContactPage"));
const AboutPage = lazy(() => import("../features/pages/about/AboutPage"));

const Login = lazy(() => import("../features/auth/login/Login"));
const Register = lazy(() => import("../features/auth/register/Register"));

const AdminDashboard = lazy(() => import("../features/pages/auth/admin/AdminDashboard"));
const Users = lazy(() => import("../features/pages/auth/admin/Users"));
const Couriers = lazy(() => import("../features/pages/auth/admin/Couriers"));

const FindCourier = lazy(() => import("../features/pages/auth/user/FindCourier"));
const UserProfile = lazy(() => import("../features/pages/auth/user/UserProfile"));
const Request = lazy(() => import("../features/pages/auth/user/Request"));

const CourierProfile = lazy(() => import("../features/pages/auth/courier/CourierProfile"));
const Orders = lazy(() => import("../features/pages/auth/courier/Orders"));

const ErrorPage = lazy(() => import("../features/pages/error/ErrorPage"));

// App Routes
const AppRoutes:React.FC = () => {
  return (
    <Routes>
      {/* AUTH ROUTES (NO SIDEBAR) */}
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path="auth/login" element={<Login />} />
        <Route path="auth/register" element={<Register />} />
      </Route>

      {/* PROTECTED ROUTES (WITH SIDEBAR) */}
      <Route path="/" element={<MainLayout />}>
        {/* Public Pages */}
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="admin" element={
          <ProtectedRoute allowedRoles={["admin"]}><AdminLayout /></ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="couriers" element={<Couriers />} />
        </Route>

        {/* User Routes */}
        <Route path="user" element={
          <ProtectedRoute allowedRoles={["user"]}><UserLayout /></ProtectedRoute>
        }>
          <Route index element={<FindCourier />} />
          <Route path="requests" element={<Request />} />
          <Route path="profile" element={<UserProfile />} />
        </Route>

        {/* Courier Routes */}
        <Route path="courier" element={
          <ProtectedRoute allowedRoles={["courier"]}><CourierLayout /></ProtectedRoute>
        }>
          <Route index element={<CourierProfile />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRoutes;