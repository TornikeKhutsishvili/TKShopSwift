import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <>
      <main className="container">
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout