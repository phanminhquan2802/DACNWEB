<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hệ thống đặt phòng khách sạn</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .header {
            background: rgba(255,255,255,0.95);
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
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
            font-size: 1.8rem;
            font-weight: bold;
            color: #667eea;
        }
        .nav-links a {
            margin-left: 1.5rem;
            text-decoration: none;
            color: #333;
            font-weight: 500;
            transition: color 0.3s;
        }
        .nav-links a:hover {
            color: #667eea;
        }
        .hero {
            text-align: center;
            padding: 5rem 2rem;
            color: white;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: white;
            color: #667eea;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .features {
            background: white;
            padding: 4rem 2rem;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .feature-card {
            text-align: center;
            padding: 2rem;
            border-radius: 10px;
            background: #f8f9fa;
            transition: transform 0.3s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .feature-card h3 {
            color: #667eea;
            margin: 1rem 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">🏨 HOTEL BOOKING</div>
                <div class="nav-links">
                    <a href="${pageContext.request.contextPath}/rooms">Phòng</a>
                    <c:choose>
                        <c:when test="${sessionScope.userId != null}">
                            <a href="${pageContext.request.contextPath}/booking?action=view">Booking của tôi</a>
                            <c:if test="${sessionScope.isAdmin}">
                                <a href="${pageContext.request.contextPath}/admin">Quản trị</a>
                            </c:if>
                            <a href="${pageContext.request.contextPath}/logout">Đăng xuất (${sessionScope.username})</a>
                        </c:when>
                        <c:otherwise>
                            <a href="${pageContext.request.contextPath}/login">Đăng nhập</a>
                            <a href="${pageContext.request.contextPath}/register">Đăng ký</a>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>
    </div>

    <div class="hero">
        <div class="container">
            <h1>🌟 Chào mừng đến với khách sạn của chúng tôi</h1>
            <p>Trải nghiệm dịch vụ 5 sao với giá cả phải chăng</p>
            <a href="${pageContext.request.contextPath}/rooms" class="btn">Khám phá ngay</a>
        </div>
    </div>

    <div class="features">
        <div class="container">
            <h2 style="text-align: center; color: #333; font-size: 2rem;">Tại sao chọn chúng tôi?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div style="font-size: 3rem;">🛏️</div>
                    <h3>Phòng hiện đại</h3>
                    <p>Đầy đủ tiện nghi, sạch sẽ, thoáng mát</p>
                </div>
                <div class="feature-card">
                    <div style="font-size: 3rem;">💰</div>
                    <h3>Giá tốt nhất</h3>
                    <p>Cam kết giá tốt nhất thị trường</p>
                </div>
                <div class="feature-card">
                    <div style="font-size: 3rem;">📞</div>
                    <h3>Hỗ trợ 24/7</h3>
                    <p>Đội ngũ chăm sóc nhiệt tình</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>