# Hotel Booking System - MERN Stack

Hệ thống đặt phòng khách sạn hoàn chỉnh sử dụng MERN Stack (MongoDB, Express, React, Node.js).

## Cấu trúc dự án

```
WebTMDT/
├── backend/          # Node.js + Express API
├── frontend/         # React.js Frontend
└── README.md
```

## Cài đặt và chạy

### Backend

1. **Di chuyển vào thư mục backend:**
```bash
cd backend
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Cấu hình MongoDB:**
   - Tạo file `.env` trong thư mục `backend/`
   - Thêm các biến môi trường:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel_booking?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Chạy backend:**
```bash
npm run dev
```

Backend sẽ chạy tại `http://localhost:5000`

### Frontend

1. **Di chuyển vào thư mục frontend:**
```bash
cd frontend
```

2. **Cài đặt dependencies:**
```bash
npm install
```

3. **Cấu hình API URL (tùy chọn):**
   - File `.env` đã được tạo với cấu hình mặc định
   - Nếu cần thay đổi, chỉnh sửa `VITE_API_URL` trong file `.env`

4. **Chạy frontend:**
```bash
npm run dev
```

Frontend sẽ chạy tại `http://localhost:3000`

## Tính năng

### Người dùng thường:
- ✅ Đăng ký / Đăng nhập
- ✅ Xem danh sách phòng có sẵn
- ✅ Lọc phòng theo loại
- ✅ Xem chi tiết phòng
- ✅ Đặt phòng
- ✅ Xem danh sách đặt phòng của mình
- ✅ Hủy đặt phòng

### Admin:
- ✅ Quản lý phòng (Thêm, Sửa, Xóa)
- ✅ Cập nhật trạng thái phòng (Có sẵn/Đã đặt)
- ✅ Xem tất cả đặt phòng
- ✅ Cập nhật trạng thái đặt phòng

## API Endpoints

### User
- `POST /api/users/register` - Đăng ký
- `POST /api/users/login` - Đăng nhập
- `GET /api/users/profile` - Lấy thông tin user (cần token)
- `GET /api/users` - Lấy tất cả users (Admin only)

### Rooms
- `GET /api/rooms` - Lấy danh sách phòng có sẵn
- `GET /api/rooms/:id` - Lấy thông tin phòng
- `GET /api/rooms/admin/all` - Lấy tất cả phòng (Admin)
- `POST /api/rooms` - Tạo phòng mới (Admin)
- `PUT /api/rooms/:id` - Cập nhật phòng (Admin)
- `DELETE /api/rooms/:id` - Xóa phòng (Admin)
- `PUT /api/rooms/:id/availability` - Cập nhật trạng thái (Admin)

### Bookings
- `POST /api/bookings` - Tạo booking (cần token)
- `GET /api/bookings/my-bookings` - Lấy booking của user (cần token)
- `GET /api/bookings/:id` - Lấy thông tin booking (cần token)
- `PUT /api/bookings/:id/cancel` - Hủy booking (cần token)
- `GET /api/bookings` - Lấy tất cả bookings (Admin)
- `PUT /api/bookings/:id/status` - Cập nhật trạng thái (Admin)

## Technologies

### Backend:
- Node.js
- Express.js
- MongoDB với Mongoose
- JWT (JSON Web Tokens)
- bcryptjs
- dotenv

### Frontend:
- React 18
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- Vite

## Lưu ý

1. **MongoDB Connection:**
   - Sử dụng MongoDB Atlas (cloud) hoặc MongoDB local
   - Cập nhật `MONGODB_URI` trong file `.env` của backend

2. **JWT Secret:**
   - Thay đổi `JWT_SECRET` bằng một chuỗi bí mật mạnh trong production

3. **CORS:**
   - Backend đã được cấu hình để cho phép CORS từ frontend

4. **Authentication:**
   - Token JWT được lưu trong localStorage
   - Token tự động được thêm vào header của mọi request

## Phát triển tiếp

- [ ] Thêm tính năng tìm kiếm phòng theo ngày
- [ ] Thêm upload ảnh phòng
- [ ] Thêm email notification
- [ ] Thêm payment gateway
- [ ] Thêm review và rating
- [ ] Thêm dashboard với thống kê

## License

ISC

# DACNWEB
