import React from 'react'
import Header from './header/Header'
import Footer from './footer/Footer'
import { useSelector } from 'react-redux'
import { authUserSelector } from '../../store/auth/slice/auth.slice'
import AuthLayout from './AuthLayout'
import Sidebar from './sidebar/Sidebar'

const MainLayout: React.FC = () => {
  const user = useSelector(authUserSelector);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      {/* Right Content */}
      <div className="flex-1 flex flex-col ml-64">
        {user && <Header />}

        <main className="flex-1 p-6">
          <AuthLayout />
        </main>

        {user && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout;