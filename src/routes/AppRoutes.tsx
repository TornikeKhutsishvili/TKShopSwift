import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../shared/layouts/MainLayout';

// Lazy Routes
const HomePage = lazy(() => import("../features/pages/home/HomePage"));
const ContactPage = lazy(() => import("../features/pages/contact/ContactPage"));
const AboutPage = lazy(() => import("../features/pages/about/AboutPage"));

const AdminPage = lazy(() => import("../features/pages/auth/admin/AdminPage"));
const UserPage = lazy(() => import("../features/pages/auth/user/UserPage"));
const CourierPage = lazy(() => import("../features/pages/auth/courier/CourierPage"));

const ErrorPage = lazy(() => import("../features/pages/error/ErrorPage"));

// App Routes
const AppRoutes:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />

          {/* Auth Pages */}
          <Route path="admin" element={<AdminPage />} />
          <Route path="user" element={<UserPage />} />
          <Route path="courier" element={<CourierPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes;