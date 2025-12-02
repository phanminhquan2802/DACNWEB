import { Link } from 'react-router-dom';
import { FaBed, FaSearch, FaStar, FaShieldAlt, FaClock, FaWifi } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="text-center animate-fadeIn">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Chào mừng đến với
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Hotel Booking
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-indigo-100 max-w-2xl mx-auto">
              Tìm phòng khách sạn phù hợp nhất cho bạn với giá cả hợp lý và dịch vụ tuyệt vời
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/rooms"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 inline-flex items-center space-x-3 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <FaSearch className="text-xl" />
                <span>Tìm phòng ngay</span>
              </Link>
              <Link
                to="/register"
                className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 inline-flex items-center space-x-3"
              >
                <span>Bắt đầu ngay</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Tại sao chọn chúng tôi?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm tuyệt vời nhất cho bạn
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: FaBed,
              title: 'Phòng đa dạng',
              description: 'Nhiều loại phòng phù hợp với mọi nhu cầu và ngân sách, từ phòng tiêu chuẩn đến suite cao cấp',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              icon: FaStar,
              title: 'Chất lượng cao',
              description: 'Phòng được trang bị đầy đủ tiện nghi hiện đại, sạch sẽ và thoải mái nhất',
              color: 'from-yellow-400 to-orange-500'
            },
            {
              icon: FaSearch,
              title: 'Dễ dàng đặt phòng',
              description: 'Quy trình đặt phòng đơn giản, nhanh chóng và tiện lợi chỉ với vài cú click',
              color: 'from-green-400 to-emerald-500'
            },
            {
              icon: FaShieldAlt,
              title: 'An toàn & Bảo mật',
              description: 'Hệ thống bảo mật cao, thông tin cá nhân được bảo vệ tuyệt đối',
              color: 'from-red-400 to-pink-500'
            },
            {
              icon: FaClock,
              title: 'Hỗ trợ 24/7',
              description: 'Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn mọi lúc mọi nơi',
              color: 'from-purple-400 to-indigo-500'
            },
            {
              icon: FaWifi,
              title: 'Tiện ích hiện đại',
              description: 'WiFi miễn phí, TV màn hình phẳng, điều hòa và nhiều tiện ích khác',
              color: 'from-indigo-400 to-blue-500'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 card-hover animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="text-3xl" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl mb-8 text-indigo-100">Đặt phòng ngay hôm nay và nhận ưu đãi đặc biệt</p>
          <Link
            to="/rooms"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Khám phá phòng ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

