import { useState, useEffect } from 'react';
import { bookingsAPI } from '../utils/api';
import { FaCalendar, FaBed, FaDollarSign, FaTimes, FaHotel, FaUser, FaPhone } from 'react-icons/fa';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      return;
    }

    try {
      await bookingsAPI.cancelBooking(id);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Hủy đặt phòng thất bại');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Đã xác nhận':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'Đã hoàn thành':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải đặt phòng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Đặt phòng của tôi
          </h1>
          <p className="text-gray-600 text-lg">Quản lý và theo dõi các đặt phòng của bạn</p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg animate-fadeIn">
            <FaHotel className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-xl font-medium mb-2">Bạn chưa có đặt phòng nào</p>
            <p className="text-gray-500">Hãy khám phá và đặt phòng ngay hôm nay!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking, index) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover animate-fadeIn overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl">
                          <FaBed className="text-white text-xl" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">
                            Phòng {booking.roomId?.roomNumber || 'N/A'}
                          </h3>
                          <p className="text-indigo-600 font-medium">{booking.roomId?.roomType}</p>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FaCalendar className="text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Ngày nhận/trả</p>
                        <p className="font-semibold text-gray-800 text-sm">
                          {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}
                        </p>
                        <p className="font-semibold text-gray-800 text-sm">
                          → {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <FaDollarSign className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Tổng tiền</p>
                        <p className="font-bold text-lg text-gray-800">
                          {booking.totalPrice.toLocaleString()} VNĐ
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FaUser className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Số khách</p>
                        <p className="font-semibold text-gray-800">{booking.numberOfGuests} người</p>
                      </div>
                    </div>
                  </div>

                  {(booking.customerName || booking.customerPhone) && (
                    <div className="mb-4 p-4 bg-indigo-50 rounded-xl">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Thông tin khách hàng:</p>
                      <div className="space-y-1">
                        {booking.customerName && (
                          <p className="text-gray-700">
                            <FaUser className="inline mr-2 text-indigo-600" />
                            <span className="font-medium">{booking.customerName}</span>
                          </p>
                        )}
                        {booking.customerPhone && (
                          <p className="text-gray-700">
                            <FaPhone className="inline mr-2 text-indigo-600" />
                            <span>{booking.customerPhone}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {booking.specialRequests && (
                    <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                      <p className="text-sm font-semibold text-gray-700 mb-1">Yêu cầu đặc biệt:</p>
                      <p className="text-gray-600">{booking.specialRequests}</p>
                    </div>
                  )}

                  {booking.status === 'Đang xử lý' && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="w-full md:w-auto bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      <FaTimes />
                      <span>Hủy đặt phòng</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;

