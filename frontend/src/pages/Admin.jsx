import { useState } from 'react';
import { FaCog, FaBed, FaCalendarCheck } from 'react-icons/fa';
import AdminRooms from '../components/AdminRooms';
import AdminBookings from '../components/AdminBookings';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('rooms');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center space-x-2">
        <FaCog />
        <span>Quản trị hệ thống</span>
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('rooms')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'rooms'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaBed className="inline mr-2" />
            Quản lý phòng
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'bookings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalendarCheck className="inline mr-2" />
            Quản lý đặt phòng
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'rooms' && <AdminRooms />}
        {activeTab === 'bookings' && <AdminBookings />}
      </div>
    </div>
  );
};

export default Admin;

