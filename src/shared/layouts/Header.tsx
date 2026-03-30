import React from 'react'
import Navbar from './Navbar'

const Header:React.FC = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">TKShopSwift</h1>
          <Navbar />
        </div>
      </div>
    </header>
  )
}

export default Header;