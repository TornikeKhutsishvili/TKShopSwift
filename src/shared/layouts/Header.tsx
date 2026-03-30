import React from 'react'
import Navbar from './Navbar'

const Header:React.FC = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-blue-600">ShopSwift</h1>
        <nav className="flex gap-2">
          <Navbar />
        </nav>
      </div>
    </header>
  )
}

export default Header