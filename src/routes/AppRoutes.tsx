import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ErrorPage from '../features/pages/ErrorPage'

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