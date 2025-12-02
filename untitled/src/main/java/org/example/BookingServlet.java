package org.example;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@WebServlet("/booking")
public class BookingServlet extends HttpServlet {
    private BookingDAO bookingDAO = new BookingDAO();
    private RoomDAO roomDAO = new RoomDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String action = request.getParameter("action");

        if ("view".equals(action)) {
            int userId = (int) session.getAttribute("userId");
            List<Booking> bookings = bookingDAO.getBookingsByUserId(userId);
            request.setAttribute("bookings", bookings);
            request.getRequestDispatcher("/my-bookings.jsp").forward(request, response);
        } else {
            String roomIdStr = request.getParameter("roomId");
            if (roomIdStr != null) {
                int roomId = Integer.parseInt(roomIdStr);
                Room room = roomDAO.getRoomById(roomId);
                request.setAttribute("room", room);
            }
            request.getRequestDispatcher("/booking-form.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userId") == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        String action = request.getParameter("action");

        if ("cancel".equals(action)) {
            int bookingId = Integer.parseInt(request.getParameter("bookingId"));
            int userId = (int) session.getAttribute("userId");

            if (bookingDAO.cancelBooking(bookingId, userId)) {
                session.setAttribute("success", "Hủy đặt phòng thành công!");
            } else {
                session.setAttribute("error", "Hủy đặt phòng thất bại!");
            }
            response.sendRedirect(request.getContextPath() + "/booking?action=view");
        } else {
            try {
                int userId = (int) session.getAttribute("userId");
                int roomId = Integer.parseInt(request.getParameter("roomId"));

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                LocalDate checkIn = LocalDate.parse(request.getParameter("checkInDate"), formatter);
                LocalDate checkOut = LocalDate.parse(request.getParameter("checkOutDate"), formatter);

                int guests = Integer.parseInt(request.getParameter("numberOfGuests"));
                String customerName = request.getParameter("customerName");
                String customerPhone = request.getParameter("customerPhone");
                String specialRequests = request.getParameter("specialRequests");

                Booking booking = new Booking();
                booking.setUserId(userId);
                booking.setRoomId(roomId);
                booking.setCheckInDate(checkIn);
                booking.setCheckOutDate(checkOut);
                booking.setNumberOfGuests(guests);
                booking.setCustomerName(customerName);
                booking.setCustomerPhone(customerPhone);
                booking.setSpecialRequests(specialRequests);

                if (bookingDAO.createBooking(booking)) {
                    session.setAttribute("success", "Đặt phòng thành công!");
                    response.sendRedirect(request.getContextPath() + "/booking?action=view");
                } else {
                    request.setAttribute("error", "Đặt phòng thất bại!");
                    request.getRequestDispatcher("/booking-form.jsp").forward(request, response);
                }
            } catch (Exception e) {
                e.printStackTrace();
                request.setAttribute("error", "Có lỗi xảy ra: " + e.getMessage());
                request.getRequestDispatcher("/booking-form.jsp").forward(request, response);
            }
        }
    }
}