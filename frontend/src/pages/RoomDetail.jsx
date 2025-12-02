import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { roomsAPI, bookingsAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { FaBed, FaUsers, FaDollarSign, FaCalendar, FaArrowLeft, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [booking, setBooking] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    customerName: '',
    customerPhone: '',
    specialRequests: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const fetchRoom = async () => {
    try {
      const response = await roomsAPI.getRoomById(id);
      setRoom(response.data);
    } catch (error) {
      console.error('Error fetching room:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setError('');
    setSuccess('');
    setSubmitting(true);

    try {
      const bookingData = {
        ...booking,
        roomId: id,
        numberOfGuests: parseInt(booking.numberOfGuests),
      };
      await bookingsAPI.createBooking(bookingData);
      setSuccess('Đặt phòng thành công! Đang chuyển hướng...');
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (error) {
      setError(
        error.response?.data?.message || 'Đặt phòng thất bại. Vui lòng thử lại.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải thông tin phòng...</p>
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <FaExclamationCircle className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-xl">Không tìm thấy phòng</p>
          <Link
            to="/rooms"
            className="mt-4 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Quay lại danh sách phòng
          </Link>
        </div>
      </div>
    );
  }

  const days = booking.checkInDate && booking.checkOutDate
    ? Math.ceil((new Date(booking.checkOutDate) - new Date(booking.checkInDate)) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = days * room.pricePerNight;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/rooms"
          className="inline-flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 mb-6 font-medium transition-colors animate-fadeIn"
        >
          <FaArrowLeft />
          <span>Quay lại danh sách phòng</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 animate-fadeIn">
          {/* Room Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.roomNumber}
                  className="w-full h-96 object-cover"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <FaBed className="text-white text-8xl opacity-50" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">
                      Phòng {room.roomNumber}
                    </h1>
                    <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {room.roomType}
                    </span>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    room.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.isAvailable ? 'Có sẵn' : 'Đã đặt'}
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                  {room.description || 'Phòng đẹp và tiện nghi với đầy đủ các tiện ích hiện đại.'}
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-3 rounded-lg">
                      <FaUsers className="text-indigo-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Sức chứa</p>
                      <p className="font-bold text-gray-800">{room.capacity} người</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <FaDollarSign className="text-green-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Giá/đêm</p>
                      <p className="font-bold text-gray-800">
                        {room.pricePerNight.toLocaleString()} VNĐ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Đặt phòng
            </h2>

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-slideIn">
                <div className="flex items-center space-x-2">
                  <FaCheckCircle />
                  <p className="font-medium">{success}</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 animate-slideIn">
                <div className="flex items-center space-x-2">
                  <FaExclamationCircle />
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}

            {!room.isAvailable && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg mb-6">
                <p className="font-medium">Phòng này hiện không có sẵn</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendar className="inline mr-2" />
                    Ngày nhận phòng
                  </label>
                  <input
                    type="date"
                    name="checkInDate"
                    value={booking.checkInDate}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendar className="inline mr-2" />
                    Ngày trả phòng
                  </label>
                  <input
                    type="date"
                    name="checkOutDate"
                    value={booking.checkOutDate}
                    onChange={handleChange}
                    required
                    min={booking.checkInDate || new Date().toISOString().split('T')[0]}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus"
                  />
                </div>
              </div>

              {days > 0 && (
                <div className="bg-indigo-50 p-4 rounded-xl">
                  <p className="text-sm text-gray-600">Số đêm: <span className="font-bold text-indigo-600">{days}</span></p>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    Tổng tiền: {totalPrice.toLocaleString()} VNĐ
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUsers className="inline mr-2" />
                  Số lượng khách
                </label>
                <input
                  type="number"
                  name="numberOfGuests"
                  value={booking.numberOfGuests}
                  onChange={handleChange}
                  required
                  min="1"
                  max={room.capacity}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên khách hàng
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={booking.customerName}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus"
                  placeholder="Nhập tên của bạn"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="customerPhone"
                  value={booking.customerPhone}
                  onChange={handleChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus"
                  placeholder="Nhập số điện thoại"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Yêu cầu đặc biệt (tùy chọn)
                </label>
                <textarea
                  name="specialRequests"
                  value={booking.specialRequests}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all input-focus resize-none"
                  placeholder="Nhập yêu cầu đặc biệt nếu có..."
                />
              </div>

              <button
                type="submit"
                disabled={!room.isAvailable || !user || submitting}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? (
                  <span className="flex items-center justify-center">
                    <div className="spinner mr-2" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                    Đang xử lý...
                  </span>
                ) : user ? (
                  'Đặt phòng ngay'
                ) : (
                  'Đăng nhập để đặt phòng'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
