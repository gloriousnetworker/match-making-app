import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-white hover:text-gray-200 block">
              Dashboard Overview
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200 block">
              User Management
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200 block">
              Content Management
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200 block">
              Reports & Analytics
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-200 block">
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p className="text-gray-700">1,234</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Active Sessions</h2>
            <p className="text-gray-700">567</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Pending Reviews</h2>
            <p className="text-gray-700">42</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Reports Generated</h2>
            <p className="text-gray-700">75</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">New Signups</h2>
            <p className="text-gray-700">89</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">System Alerts</h2>
            <p className="text-gray-700">3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
