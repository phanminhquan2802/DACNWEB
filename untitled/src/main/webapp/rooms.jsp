<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Danh sách phòng</title>
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
        .filter-bar {
            background: white;
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .filter-bar a {
            display: inline-block;
            padding: 0.5rem 1rem;
            margin-right: 1rem;
            background: #ecf0f1;
            color: #333;
            text-decoration: none;
            border-radius: 5px;
            transition: all 0.3s;
        }
        .filter-bar a:hover, .filter-bar a.active {
            background: #667eea;
            color: white;
        }
        .rooms-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }
        .room-card {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .room-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .room-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        .room-content {
            padding: 1.5rem;
        }
        .room-type {
            display: inline-block;
            padding: 0.3rem 0.8rem;
            background: #667eea;
            color: white;
            border-radius: 20px;
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        .room-number {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 0.5rem;
        }
        .room-price {
            font-size: 1.5rem;
            color: #e74c3c;
            font-weight: bold;
            margin: 1rem 0;
        }
        .room-info {
            color: #666;
            margin: 0.5rem 0;
        }
        .btn {
            display: block;
            width: 100%;
            padding: 0.8rem;
            background: #667eea;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 1rem;
            transition: background 0.3s;
        }
        .btn:hover {
            background: #5568d3;
        }
        .btn-disabled {
            background: #95a5a6;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">🏨 HOTEL BOOKING</div>
                <div class="nav-links">
                    <a href="${pageContext.request.contextPath}/index.jsp">Trang chủ</a>
                    <c:if test="${sessionScope.userId != null}">
                        <a href="${pageContext.request.contextPath}/booking?action=view">Booking</a>
                        <a href="${pageContext.request.contextPath}/logout">Đăng xuất</a>
                    </c:if>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <h1 style="margin-bottom: 1.5rem;">🛏️ Danh sách phòng</h1>

        <div class="filter-bar">
            <strong>Lọc theo loại:</strong>
            <a href="${pageContext.request.contextPath}/rooms" class="${empty selectedType ? 'active' : ''}">Tất cả</a>
            <a href="${pageContext.request.contextPath}/rooms?type=Standard" class="${selectedType == 'Standard' ? 'active' : ''}">Standard</a>
            <a href="${pageContext.request.contextPath}/rooms?type=Deluxe" class="${selectedType == 'Deluxe' ? 'active' : ''}">Deluxe</a>
            <a href="${pageContext.request.contextPath}/rooms?type=Suite" class="${selectedType == 'Suite' ? 'active' : ''}">Suite</a>
        </div>

        <div class="rooms-grid">
            <c:forEach var="room" items="${rooms}">
                <div class="room-card">
                    <img src="${room.image}" alt="${room.roomNumber}" class="room-image"
                         onerror="this.src='https://via.placeholder.com/350x250?text=Room+Image'">
                    <div class="room-content">
                        <span class="room-type">${room.roomType}</span>
                        <div class="room-number">Phòng ${room.roomNumber}</div>
                        <div class="room-price">
                            <fmt:formatNumber value="${room.pricePerNight}" pattern="#,###"/> VNĐ/đêm
                        </div>
                        <div class="room-info">👥 Sức chứa: ${room.capacity} người</div>
                        <div class="room-info">📝 ${room.description}</div>

                        <c:choose>
                            <c:when test="${sessionScope.userId != null}">
                                <c:choose>
                                    <c:when test="${room.available}">
                                        <a href="${pageContext.request.contextPath}/booking?roomId=${room.id}" class="btn">Đặt phòng ngay</a>
                                    </c:when>
                                    <c:otherwise>
                                        <a class="btn btn-disabled">Đã được đặt</a>
                                    </c:otherwise>
                                </c:choose>
                            </c:when>
                            <c:otherwise>
                                <a href="${pageContext.request.contextPath}/login" class="btn">Đăng nhập để đặt</a>
                            </c:otherwise>
                        </c:choose>
                    </div>
                </div>
            </c:forEach>
        </div>

        <c:if test="${empty rooms}">
            <div style="text-align: center; padding: 3rem; background: white; border-radius: 10px;">
                <p style="font-size: 1.2rem; color: #666;">Không tìm thấy phòng nào phù hợp</p>
            </div>
        </c:if>
    </div>
</body>
</html>