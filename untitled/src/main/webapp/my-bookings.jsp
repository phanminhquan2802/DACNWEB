<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking của tôi</title>
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
            max-width: 1200px;
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
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s;
        }
        .nav-links a:hover {
            background: #667eea;
            color: white;
        }
        .success {
            background: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .error {
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        .booking-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-bottom: 1.5rem;
            border-left: 4px solid #667eea;
        }
        .booking-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #ecf0f1;
        }
        .booking-id {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
        }
        .status-badge {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: bold;
        }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-confirmed { background: #cce5ff; color: #004085; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }
        .booking-info {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        .info-item {
            color: #666;
        }
        .info-item strong {
            color: #333;
            display: block;
            margin-bottom: 0.3rem;
        }
        .price {
            font-size: 1.5rem;
            color: #e74c3c;
            font-weight: bold;
        }
        .btn {
            padding: 0.6rem 1.2rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-block;
        }
        .btn-danger {
            background: #e74c3c;
            color: white;
        }
        .btn-danger:hover {
            background: #c0392b;
        }
        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 10px;
        }
        .empty-state h2 {
            color: #666;
            margin-bottom: 1rem;
        }
        .btn-primary {
            background: #667eea;
            color: white;
        }
        .btn-primary:hover {
            background: #5568d3;
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
                    <a href="${pageContext.request.contextPath}/logout">Đăng xuất</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h1 style="margin-bottom: 1.5rem;">📦 Booking của tôi</h1>

        <c:if test="${not empty sessionScope.success}">
            <div class="success">${sessionScope.success}</div>
            <c:remove var="success" scope="session"/>
        </c:if>

        <c:if test="${not empty sessionScope.error}">
            <div class="error">${sessionScope.error}</div>
            <c:remove var="error" scope="session"/>
        </c:if>

        <c:choose>
            <c:when test="${empty bookings}">
                <div class="empty-state">
                    <h2>📭 Bạn chưa có booking nào</h2>
                    <p style="color: #666; margin-bottom: 2rem;">Hãy khám phá các phòng tuyệt vời của chúng tôi!</p>
                    <a href="${pageContext.request.contextPath}/rooms" class="btn btn-primary">
                        🔍 Xem phòng ngay
                    </a>
                </div>
            </c:when>
            <c:otherwise>
                <c:forEach var="booking" items="${bookings}">
                    <div class="booking-card">
                        <div class="booking-header">
                            <div class="booking-id">Booking #${booking.id}</div>
                            <c:choose>
                                <c:when test="${booking.status == 'Đang xử lý'}">
                                    <span class="status-badge status-pending">${booking.status}</span>
                                </c:when>
                                <c:when test="${booking.status == 'Đã xác nhận'}">
                                    <span class="status-badge status-confirmed">${booking.status}</span>
                                </c:when>
                                <c:when test="${booking.status == 'Đã hoàn thành'}">
                                    <span class="status-badge status-completed">${booking.status}</span>
                                </c:when>
                                <c:otherwise>
                                    <span class="status-badge status-cancelled">${booking.status}</span>
                                </c:otherwise>
                            </c:choose>
                        </div>

                        <div class="booking-info">
                            <div class="info-item">
                                <strong>🏨 Phòng</strong>
                                Phòng ${booking.roomNumber}
                            </div>
                            <div class="info-item">
                                <strong>📅 Check-in</strong>
                                <fmt:formatDate value="${booking.checkInDate}" pattern="dd/MM/yyyy" type="date"/>
                            </div>
                            <div class="info-item">
                                <strong>📅 Check-out</strong>
                                <fmt:formatDate value="${booking.checkOutDate}" pattern="dd/MM/yyyy" type="date"/>
                            </div>
                            <div class="info-item">
                                <strong>👥 Số khách</strong>
                                ${booking.numberOfGuests} người
                            </div>
                            <div class="info-item">
                                <strong>📞 Liên hệ</strong>
                                ${booking.customerName}<br>
                                ${booking.customerPhone}
                            </div>
                            <div class="info-item">
                                <strong>💰 Tổng tiền</strong>
                                <div class="price">
                                    <fmt:formatNumber value="${booking.totalPrice}" pattern="#,###"/> VNĐ
                                </div>
                            </div>
                        </div>

                        <c:if test="${not empty booking.specialRequests}">
                            <div class="info-item" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #ecf0f1;">
                                <strong>📝 Yêu cầu đặc biệt:</strong>
                                ${booking.specialRequests}
                            </div>
                        </c:if>

                        <c:if test="${booking.status == 'Đang xử lý' || booking.status == 'Đã xác nhận'}">
                            <form method="POST" action="${pageContext.request.contextPath}/booking"
                                  style="margin-top: 1rem;"
                                  onsubmit="return confirm('Bạn có chắc muốn hủy booking này?')">
                                <input type="hidden" name="action" value="cancel">
                                <input type="hidden" name="bookingId" value="${booking.id}">
                                <button type="submit" class="btn btn-danger">❌ Hủy booking</button>
                            </form>
                        </c:if>
                    </div>
                </c:forEach>
            </c:otherwise>
        </c:choose>
    </div>
</body>
</html>