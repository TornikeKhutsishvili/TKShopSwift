import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// Lazy Routes
const ErrorPage = lazy(() => import("../features/pages/ErrorPage"));

// App Routes
const AppRoutes:React.FC = () => {
  return (
    <Routes>
        <Route>

        {/* 404 Not Found */}
        <Route path="*" element={<ErrorPage />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes