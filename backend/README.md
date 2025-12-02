# Hotel Booking System - Backend API

Backend API cho hệ thống đặt phòng khách sạn sử dụng MERN Stack (MongoDB, Express, React, Node.js).

## Cấu trúc dự án

```
backend/
├── config/
│   └── db.js              # Cấu hình kết nối MongoDB
├── controllers/
│   ├── userController.js  # Logic xử lý User
│   ├── roomController.js  # Logic xử lý Room
│   └── bookingController.js # Logic xử lý Booking
├── middleware/
│   └── auth.js            # Middleware xác thực JWT
├── models/
│   ├── User.js            # Schema User
│   ├── Room.js            # Schema Room
│   └── Booking.js         # Schema Booking
├── routes/
│   ├── userRoutes.js      # Routes cho User
│   ├── roomRoutes.js      # Routes cho Room
│   └── bookingRoutes.js   # Routes cho Booking
├── .env                   # File cấu hình (tạo từ .env.example)
├── .gitignore
├── package.json
├── server.js              # File chính khởi chạy server
└── README.md
```

## Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Tạo file .env:**
Tạo file `.env` trong thư mục `backend/` với nội dung:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
PORT=5000
NODE_ENV=development
```

3. **Cấu hình MongoDB:**
- Thay `username`, `password`, và `cluster` bằng thông tin MongoDB Atlas của bạn
- Hoặc sử dụng MongoDB local: `mongodb://localhost:27017/hotel_booking`

## Chạy ứng dụng

**Development mode (với nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server sẽ chạy tại `http://localhost:5000`

## API Endpoints

### User Routes

- `POST /api/users/register` - Đăng ký user mới
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Lấy thông tin user (cần token)
- `GET /api/users` - Lấy tất cả users (Admin only)

### Room Routes

- `GET /api/rooms` - Lấy danh sách phòng có sẵn
- `GET /api/rooms/:id` - Lấy thông tin phòng theo ID
- `GET /api/rooms/admin/all` - Lấy tất cả phòng (Admin only)
- `POST /api/rooms` - Tạo phòng mới (Admin only)
- `PUT /api/rooms/:id` - Cập nhật phòng (Admin only)
- `DELETE /api/rooms/:id` - Xóa phòng (Admin only)
- `PUT /api/rooms/:id/availability` - Cập nhật trạng thái phòng (Admin only)

### Booking Routes

- `POST /api/bookings` - Tạo booking mới (cần token)
- `GET /api/bookings/my-bookings` - Lấy danh sách booking của user (cần token)
- `GET /api/bookings/:id` - Lấy thông tin booking theo ID (cần token)
- `PUT /api/bookings/:id/cancel` - Hủy booking (cần token)
- `GET /api/bookings` - Lấy tất cả bookings (Admin only)
- `PUT /api/bookings/:id/status` - Cập nhật trạng thái booking (Admin only)

## Xác thực

Hầu hết các API endpoints yêu cầu JWT token. Gửi token trong header:
```
Authorization: Bearer <your_token>
```

Token được trả về khi đăng ký hoặc đăng nhập thành công.

## Ví dụ sử dụng

### Đăng ký user
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123",
  "email": "test@example.com",
  "phone": "0123456789"
}
```

### Đăng nhập
```bash
POST /api/users/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

### Tạo booking
```bash
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": "room_id_here",
  "checkInDate": "2024-01-15",
  "checkOutDate": "2024-01-20",
  "numberOfGuests": 2,
  "customerName": "Nguyen Van A",
  "customerPhone": "0123456789",
  "specialRequests": "Late check-in"
}
```

## Technologies

- Node.js
- Express.js
- MongoDB với Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (mã hóa password)
- dotenv (quản lý biến môi trường)

