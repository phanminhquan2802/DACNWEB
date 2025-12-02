package org.example;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/admin")
public class AdminServlet extends HttpServlet {
    private RoomDAO roomDAO = new RoomDAO();
    private BookingDAO bookingDAO = new BookingDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("isAdmin") == null ||
                !(boolean) session.getAttribute("isAdmin")) {
            response.sendRedirect(request.getContextPath() + "/");
            return;
        }

        String action = request.getParameter("action");

        if ("rooms".equals(action)) {
            List<Room> rooms = roomDAO.getAllAvailableRooms();
            request.setAttribute("rooms", rooms);
            request.getRequestDispatcher("/admin-rooms.jsp").forward(request, response);
        } else if ("bookings".equals(action)) {
            List<Booking> bookings = bookingDAO.getAllBookings();
            request.setAttribute("bookings", bookings);
            request.getRequestDispatcher("/admin-bookings.jsp").forward(request, response);
        } else {
            List<Room> rooms = roomDAO.getAllAvailableRooms();
            List<Booking> bookings = bookingDAO.getAllBookings();
            request.setAttribute("totalRooms", rooms.size());
            request.setAttribute("totalBookings", bookings.size());
            request.getRequestDispatcher("/admin.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("isAdmin") == null ||
                !(boolean) session.getAttribute("isAdmin")) {
            response.sendRedirect(request.getContextPath() + "/");
            return;
        }

        String action = request.getParameter("action");

        if ("addRoom".equals(action)) {
            Room room = new Room();
            room.setRoomNumber(request.getParameter("roomNumber"));
            room.setRoomType(request.getParameter("roomType"));
            room.setPricePerNight(Double.parseDouble(request.getParameter("pricePerNight")));
            room.setDescription(request.getParameter("description"));
            room.setCapacity(Integer.parseInt(request.getParameter("capacity")));
            room.setImage(request.getParameter("image"));

            if (roomDAO.addRoom(room)) {
                session.setAttribute("success", "Thêm phòng thành công!");
            } else {
                session.setAttribute("error", "Thêm phòng thất bại!");
            }
            response.sendRedirect(request.getContextPath() + "/admin?action=rooms");

        } else if ("deleteRoom".equals(action)) {
            int roomId = Integer.parseInt(request.getParameter("roomId"));
            if (roomDAO.deleteRoom(roomId)) {
                session.setAttribute("success", "Xóa phòng thành công!");
            } else {
                session.setAttribute("error", "Xóa phòng thất bại!");
            }
            response.sendRedirect(request.getContextPath() + "/admin?action=rooms");

        } else if ("updateBookingStatus".equals(action)) {
            int bookingId = Integer.parseInt(request.getParameter("bookingId"));
            String status = request.getParameter("status");

            if (bookingDAO.updateBookingStatus(bookingId, status)) {
                session.setAttribute("success", "Cập nhật thành công!");
            } else {
                session.setAttribute("error", "Cập nhật thất bại!");
            }
            response.sendRedirect(request.getContextPath() + "/admin?action=bookings");
        }
    }
}