<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đặt phòng</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: #f5f5f5;
        }
        .header {
            background: white;
            padding: 1rem 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #667eea;
        }
        .nav-links a {
            margin-left: 1rem;
            text-decoration: none;
            color: #333;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: #667eea;
        }
        .error {
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .booking-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }
        .form-section, .room-info {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h2 {
            color: #333;
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
            font-weight: 500;
        }
        input, textarea {
            width: 100%;
            padding: 0.8rem;
            margin-bottom: 1rem;
            border: 2px solid #ecf0f1;
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: #667eea;
        }
        textarea {
            min-height: 100px;
            resize: vertical;
        }
        button {
            width: 100%;
            padding: 1rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            background: #5568d3;
            transform: translateY(-2px);
        }
        .room-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .room-detail {
            margin: 0.5rem 0;
            color: #666;
        }
        .room-price {
            font-size: 1.8rem;
            color: #e74c3c;
            font-weight: bold;
            margin: 1rem 0;
        }
        .note {
            background: #fff3cd;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            border-left: 4px solid #f39c12;
        }
        @media (max-width: 768px) {
            .booking-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">🏨 HOTEL BOOKING</div>
                <div class="nav-links">
                    <a href="${pageContext.request.contextPath}/">Trang chủ</a>
                    <a href="${pageContext.request.contextPath}/rooms">Phòng</a>
                    <a href="${pageContext.request.contextPath}/booking?action=view">Booking của tôi</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h1 style="margin-bottom: 2rem;">📝 Đặt phòng</h1>

        <c:if test="${not empty error}">
            <div class="error">${error}</div>
        </c:if>

        <div class="booking-container">
            <div class="form-section">
                <h2>Thông tin đặt phòng</h2>
                <form method="POST" action="${pageContext.request.contextPath}/booking">
                    <input type="hidden" name="roomId" value="${room.id}">

                    <label>Ngày check-in *</label>
                    <input type="date" name="checkInDate" required
                           min="<%= java.time.LocalDate.now() %>">

                    <label>Ngày check-out *</label>
                    <input type="date" name="checkOutDate" required
                           min="<%= java.time.LocalDate.now().plusDays(1) %>">

                    <label>Số lượng khách *</label>
                    <input type="number" name="numberOfGuests" required
                           min="1" max="${room.capacity}" value="1">

                    <label>Tên khách hàng *</label>
                    <input type="text" name="customerName" required
                           placeholder="Họ và tên đầy đủ">

                    <label>Số điện thoại *</label>
                    <input type="tel" name="customerPhone" required
                           placeholder="0912345678">

                    <label>Yêu cầu đặc biệt</label>
                    <textarea name="specialRequests"
                              placeholder="Ví dụ: Cần giường phụ, check-in sớm..."></textarea>

                    <button type="submit">Xác nhận đặt phòng</button>
                </form>
            </div>

            <div class="room-info">
                <h2>Chi tiết phòng</h2>
                <img src="${room.image}" alt="${room.roomNumber}" class="room-image"
                     onerror="this.src='https://via.placeholder.com/400x200?text=Room+Image'">

                <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Phòng ${room.roomNumber}</h3>
                <div class="room-detail">
                    <strong>Loại:</strong> ${room.roomType}
                </div>
                <div class="room-price">
                    <fmt:formatNumber value="${room.pricePerNight}" pattern="#,###"/> VNĐ/đêm
                </div>
                <div class="room-detail">
                    <strong>👥 Sức chứa:</strong> ${room.capacity} người
                </div>
                <div class="room-detail">
                    <strong>📝 Mô tả:</strong> ${room.description}
                </div>

                <div class="note">
                    <strong>📌 Lưu ý:</strong>
                    <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
                        <li>Check-in: 14:00</li>
                        <li>Check-out: 12:00</li>
                        <li>Thanh toán khi nhận phòng</li>
                        <li>Có thể hủy miễn phí trước 24h</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>