<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quản lý Booking</title>
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
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .container {
            max-width: 1400px;
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
        }
        .nav-links a {
            margin-left: 1rem;
            text-decoration: none;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            transition: all 0.3s;
        }
        .nav-links a:hover {
            background: rgba(255,255,255,0.2);
        }
        .content {
            margin-top: 2rem;
        }
        h1 {
            color: #2c3e50;
            margin-bottom: 2rem;
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
        table {
            width: 100%;
            background: white;
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        th, td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #ecf0f1;
        }
        th {
            background: #34495e;
            color: white;
            font-weight: 600;
        }
        tr:hover {
            background: #f8f9fa;
        }
        .status-badge {
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: bold;
            display: inline-block;
        }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-confirmed { background: #cce5ff; color: #004085; }
        .status-completed { background: #d4edda; color: #155724; }
        .status-cancelled { background: #f8d7da; color: #721c24; }
        select {
            padding: 0.5rem;
            border: 2px solid #ecf0f1;
            border-radius: 5px;
            font-size: 0.9rem;
            cursor: pointer;
        }
        select:focus {
            outline: none;
            border-color: #3498db;
        }
        .btn-update {
            padding: 0.4rem 0.8rem;
            background: #3498db;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.85rem;
            transition: all 0.3s;
        }
        .btn-update:hover {
            background: #2980b9;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">⚙️ ADMIN - Quản lý Booking</div>
                <div class="nav-links">
                    <a href="${pageContext.request.contextPath}/admin">Dashboard</a>
                    <a href="${pageContext.request.contextPath}/admin?action=rooms">Phòng</a>
                    <a href="${pageContext.request.contextPath}/logout">Đăng xuất</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container content">
        <h1>📦 Quản lý Booking</h1>

        <c:if test="${not empty sessionScope.success}">
            <div class="success">${sessionScope.success}</div>
            <c:remove var="success" scope="session"/>
        </c:if>

        <c:if test="${not empty sessionScope.error}">
            <div class="error">${sessionScope.error}</div>
            <c:remove var="error" scope="session"/>
        </c:if>

        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin-bottom: 1.5rem;">📋 Danh sách Booking (${bookings.size()})</h2>

            <c:choose>
                <c:when test="${empty bookings}">
                    <p style="text-align: center; color: #666; padding: 2rem;">Chưa có booking nào</p>
                </c:when>
                <c:otherwise>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Phòng</th>
                                <th>Check-in</th>
                                <th>Check-out</th>
                                <th>Khách</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <c:forEach var="booking" items="${bookings}">
                                <tr>
                                    <td><strong>#${booking.id}</strong></td>
                                    <td>
                                        <strong>${booking.customerName}</strong><br>
                                        <small style="color: #7f8c8d;">
                                            ${booking.customerPhone}<br>
                                            User: ${booking.username}
                                        </small>
                                    </td>
                                    <td>Phòng ${booking.roomNumber}</td>
                                    <td>
                                        <fmt:formatDate value="${booking.checkInDate}" pattern="dd/MM/yyyy" type="date"/>
                                    </td>
                                    <td>
                                        <fmt:formatDate value="${booking.checkOutDate}" pattern="dd/MM/yyyy" type="date"/>
                                    </td>
                                    <td>${booking.numberOfGuests}</td>
                                    <td>
                                        <strong style="color: #e74c3c;">
                                            <fmt:formatNumber value="${booking.totalPrice}" pattern="#,###"/> VNĐ
                                        </strong>
                                    </td>
                                    <td>
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
                                    </td>
                                    <td>
                                        <form method="POST" action="${pageContext.request.contextPath}/admin" style="display: flex; gap: 0.5rem; align-items: center;">
                                            <input type="hidden" name="action" value="updateBookingStatus">
                                            <input type="hidden" name="bookingId" value="${booking.id}">
                                            <select name="status">
                                                <option value="Đang xử lý" ${booking.status == 'Đang xử lý' ? 'selected' : ''}>Đang xử lý</option>
                                                <option value="Đã xác nhận" ${booking.status == 'Đã xác nhận' ? 'selected' : ''}>Đã xác nhận</option>
                                                <option value="Đã hoàn thành" ${booking.status == 'Đã hoàn thành' ? 'selected' : ''}>Đã hoàn thành</option>
                                                <option value="Đã hủy" ${booking.status == 'Đã hủy' ? 'selected' : ''}>Đã hủy</option>
                                            </select>
                                            <button type="submit" class="btn-update">💾 Cập nhật</button>
                                        </form>
                                    </td>
                                </tr>
                            </c:forEach>
                        </tbody>
                    </table>
                </c:otherwise>
            </c:choose>
        </div>
    </div>
</body>
</html>