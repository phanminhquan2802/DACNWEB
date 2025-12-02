<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
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
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-bottom: 3rem;
        }
        .stat-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
            transition: transform 0.3s;
        }
        .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .stat-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .stat-value {
            font-size: 2.5rem;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 0.5rem;
        }
        .stat-label {
            color: #7f8c8d;
            font-size: 1rem;
        }
        .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
        }
        .action-card {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        .action-card h3 {
            color: #2c3e50;
            margin-bottom: 1rem;
        }
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s;
        }
        .btn:hover {
            background: #2980b9;
            transform: translateY(-2px);
        }
        .btn-success {
            background: #27ae60;
        }
        .btn-success:hover {
            background: #229954;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">⚙️ ADMIN PANEL</div>
                <div class="nav-links">
                    <a href="${pageContext.request.contextPath}/">Trang chủ</a>
                    <a href="${pageContext.request.contextPath}/admin?action=rooms">Quản lý phòng</a>
                    <a href="${pageContext.request.contextPath}/admin?action=bookings">Quản lý booking</a>
                    <a href="${pageContext.request.contextPath}/logout">Đăng xuất</a>
                </div>
            </div>
        </div>
    </div>

    <div class="container content">
        <h1>📊 Dashboard</h1>

        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-icon">🏨</div>
                <div class="stat-value">${totalRooms}</div>
                <div class="stat-label">Tổng số phòng</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">📦</div>
                <div class="stat-value">${totalBookings}</div>
                <div class="stat-label">Tổng booking</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-value">-</div>
                <div class="stat-label">Khách hàng</div>
            </div>

            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-value">-</div>
                <div class="stat-label">Doanh thu</div>
            </div>
        </div>

        <h2 style="color: #2c3e50; margin-bottom: 1.5rem;">⚡ Thao tác nhanh</h2>
        <div class="quick-actions">
            <div class="action-card">
                <h3>🏨 Quản lý phòng</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">Xem, thêm, sửa, xóa phòng</p>
                <a href="${pageContext.request.contextPath}/admin?action=rooms" class="btn">Quản lý phòng</a>
            </div>

            <div class="action-card">
                <h3>📦 Quản lý booking</h3>
                <p style="color: #666; margin-bottom: 1.5rem;">Xem và cập nhật trạng thái</p>
                <a href="${pageContext.request.contextPath}/admin?action=bookings" class="btn btn-success">Quản lý booking</a>
            </div>
        </div>
    </div>
</body>
</html>