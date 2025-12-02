<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Đăng ký</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .form-container {
            background: white;
            padding: 3rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 450px;
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 2rem;
        }
        .error {
            background: #e74c3c;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        }
        .success {
            background: #27ae60;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #555;
            font-weight: 500;
        }
        input {
            width: 100%;
            padding: 1rem;
            margin-bottom: 1rem;
            border: 2px solid #ecf0f1;
            border-radius: 8px;
            font-size: 1rem;
        }
        input:focus {
            outline: none;
            border-color: #667eea;
        }
        button {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .links {
            text-align: center;
            margin-top: 1.5rem;
        }
        .links a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
        }
        .links a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="form-container">
        <h2>📝 Đăng ký tài khoản</h2>

        <c:if test="${not empty error}">
            <div class="error">${error}</div>
        </c:if>

        <form method="POST" action="${pageContext.request.contextPath}/register">
            <label>Tên đăng nhập *</label>
            <input type="text" name="username" required placeholder="Nhập tên đăng nhập">

            <label>Email *</label>
            <input type="email" name="email" required placeholder="example@gmail.com">

            <label>Số điện thoại *</label>
            <input type="tel" name="phone" required placeholder="0912345678">

            <label>Mật khẩu *</label>
            <input type="password" name="password" required placeholder="Nhập mật khẩu">

            <button type="submit">Đăng ký</button>
        </form>

        <div class="links">
            <p>Đã có tài khoản? <a href="${pageContext.request.contextPath}/login">Đăng nhập ngay</a></p>
            <p><a href="${pageContext.request.contextPath}/">← Về trang chủ</a></p>
        </div>
    </div>
</body>
</html>