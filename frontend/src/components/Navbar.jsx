import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHotel, FaUser, FaSignOutAlt, FaCog, FaBed } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <FaHotel className="text-white text-xl" />
            </div>
            <span>Hotel Booking</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/rooms"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
            >
              <FaBed />
              <span>Phòng</span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-bookings"
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
                >
                  Đặt phòng của tôi
                </Link>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
                  >
                    <FaCog />
                    <span>Quản trị</span>
                  </Link>
                )}

                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <div className="bg-indigo-600 text-white rounded-full p-1.5">
                    <FaUser className="text-sm" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
                >
                  <FaSignOutAlt />
                  <span>Đăng xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

