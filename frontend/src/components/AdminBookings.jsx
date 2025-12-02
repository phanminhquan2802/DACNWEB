import { useState, useEffect } from 'react';
import { bookingsAPI } from '../utils/api';
import { FaCalendar, FaUser, FaBed } from 'react-icons/fa';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingsAPI.getAllBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await bookingsAPI.updateBookingStatus(id, newStatus);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || 'Cập nhật thất bại');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang xử lý':
        return 'bg-yellow-100 text-yellow-800';
      case 'Đã xác nhận':
        return 'bg-green-100 text-green-800';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800';
      case 'Đã hoàn thành':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return <div className="text-center">Đang tải...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Danh sách đặt phòng</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Khách hàng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phòng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Ngày nhận/trả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Tổng tiền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="font-medium">
                      {booking.customerName || booking.userId?.username}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.customerPhone || booking.userId?.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">
                    {booking.roomId?.roomNumber || 'N/A'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.roomId?.roomType}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    {new Date(booking.checkInDate).toLocaleDateString('vi-VN')}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(booking.checkOutDate).toLocaleDateString('vi-VN')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {booking.totalPrice.toLocaleString()} VNĐ
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <select
                    value={booking.status}
                    onChange={(e) =>
                      handleStatusChange(booking._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xác nhận">Đã xác nhận</option>
                    <option value="Đã hủy">Đã hủy</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-600">Chưa có đặt phòng nào</p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;

