import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout:React.FC = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  )
}

export default AdminLayout;