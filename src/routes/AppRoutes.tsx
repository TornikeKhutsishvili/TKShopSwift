import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import MainLayout from '../shared/layouts/MainLayout';

// Lazy Routes
const Home = lazy(() => import("../features/pages/home/Home"));
const ContactPage = lazy(() => import("../features/pages/contact/Contact"));
const ErrorPage = lazy(() => import("../features/pages/error/ErrorPage"));

// App Routes
const AppRoutes:React.FC = () => {
  return (
    <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes;