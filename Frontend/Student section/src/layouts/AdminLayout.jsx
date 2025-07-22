import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-white font-sans">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto">
        {/* The Outlet component renders the matched child route component */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
