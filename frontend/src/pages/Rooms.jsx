import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roomsAPI } from '../utils/api';
import { FaBed, FaUsers, FaDollarSign, FaSearch, FaSpinner } from 'react-icons/fa';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchRooms();
  }, [filter]);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await roomsAPI.getRooms(filter || null);
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="spinner mb-4"></div>
          <p className="text-gray-600 text-lg">Đang tải danh sách phòng...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Khám phá phòng của chúng tôi
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tìm phòng hoàn hảo cho chuyến đi của bạn
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8 flex justify-center animate-fadeIn">
          <div className="bg-white rounded-xl shadow-lg p-4 inline-flex items-center space-x-4">
            <FaSearch className="text-indigo-600 text-xl" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border-0 bg-transparent text-gray-700 font-medium focus:outline-none focus:ring-0 cursor-pointer text-lg"
            >
              <option value="">Tất cả loại phòng</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential</option>
            </select>
          </div>
        </div>

        {/* Rooms Grid */}
        {rooms.length === 0 ? (
          <div className="text-center py-20">
            <FaBed className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-xl">Không có phòng nào có sẵn</p>
            <p className="text-gray-500 mt-2">Vui lòng thử lại sau hoặc chọn loại phòng khác</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <div
                key={room._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  {room.image ? (
                    <img
                      src={room.image}
                      alt={room.roomNumber}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                      <FaBed className="text-white text-6xl opacity-50" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                    <span className="text-sm font-semibold text-indigo-600">{room.roomType}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
                    <span className="text-sm font-medium">Phòng {room.roomNumber}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    Phòng {room.roomNumber}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2 min-h-[3rem]">
                    {room.description || 'Phòng đẹp và tiện nghi'}
                  </p>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaUsers className="text-indigo-600" />
                      <span className="font-medium">{room.capacity} người</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaDollarSign className="text-green-600" />
                      <span className="font-bold text-lg text-gray-800">
                        {room.pricePerNight.toLocaleString()} VNĐ
                      </span>
                      <span className="text-sm text-gray-500">/đêm</span>
                    </div>
                  </div>
                  <Link
                    to={`/rooms/${room._id}`}
                    className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms;

