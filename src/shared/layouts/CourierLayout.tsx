import React from 'react';
import { Outlet } from 'react-router-dom';

const CourierLayout:React.FC = () => {
  return (
    <div className="flex flex-col">
      <Outlet />
    </div>
  )
}

export default CourierLayout;