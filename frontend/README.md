# Hotel Booking System - Frontend

Frontend React.js cho hệ thống đặt phòng khách sạn.

## Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Cấu hình API URL:**
File `.env` đã được tạo với cấu hình mặc định:
```
VITE_API_URL=http://localhost:5000/api
```

Nếu backend chạy ở port khác, hãy cập nhật trong file `.env`.

## Chạy ứng dụng

**Development mode:**
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

**Build cho production:**
```bash
npm run build
```

## Cấu trúc dự án

```
frontend/
├── src/
│   ├── components/        # Các components tái sử dụng
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRooms.jsx
│   │   └── AdminBookings.jsx
│   ├── context/           # Context API cho state management
│   │   └── AuthContext.jsx
│   ├── pages/            # Các trang chính
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Rooms.jsx
│   │   ├── RoomDetail.jsx
│   │   ├── MyBookings.jsx
│   │   └── Admin.jsx
│   ├── utils/            # Utilities
│   │   └── api.js        # API service với axios
│   ├── App.jsx           # Component chính
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Tính năng

### Người dùng thường:
- Đăng ký / Đăng nhập
- Xem danh sách phòng
- Xem chi tiết phòng
- Đặt phòng
- Xem danh sách đặt phòng của mình
- Hủy đặt phòng

### Admin:
- Quản lý phòng (CRUD)
- Quản lý đặt phòng
- Cập nhật trạng thái đặt phòng
- Cập nhật trạng thái phòng

## Technologies

- React 18
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- Vite

## Authentication

Ứng dụng sử dụng JWT token được lưu trong localStorage. Token tự động được thêm vào header của mọi request API.

## Protected Routes

- `/my-bookings` - Yêu cầu đăng nhập
- `/admin` - Yêu cầu đăng nhập và quyền admin

