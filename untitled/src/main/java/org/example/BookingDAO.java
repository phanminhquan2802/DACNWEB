package org.example;

import java.sql.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

public class BookingDAO {
    private RoomDAO roomDAO = new RoomDAO();

    public boolean createBooking(Booking booking) {
        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
            conn.setAutoCommit(false);

            // Kiểm tra phòng
            Room room = roomDAO.getRoomById(booking.getRoomId());
            if (room == null || !room.isAvailable()) {
                conn.rollback();
                return false;
            }

            // Tính tổng tiền
            long days = ChronoUnit.DAYS.between(booking.getCheckInDate(), booking.getCheckOutDate());
            double totalPrice = days * room.getPricePerNight();
            booking.setTotalPrice(totalPrice);

            // Tạo booking
            String sql = "INSERT INTO bookings (user_id, room_id, check_in_date, check_out_date, number_of_guests, total_price, status, customer_name, customer_phone, special_requests) VALUES (?, ?, ?, ?, ?, ?, 'Đang xử lý', ?, ?, ?)";
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setInt(1, booking.getUserId());
            stmt.setInt(2, booking.getRoomId());
            stmt.setDate(3, Date.valueOf(booking.getCheckInDate()));
            stmt.setDate(4, Date.valueOf(booking.getCheckOutDate()));
            stmt.setInt(5, booking.getNumberOfGuests());
            stmt.setDouble(6, totalPrice);
            stmt.setString(7, booking.getCustomerName());
            stmt.setString(8, booking.getCustomerPhone());
            stmt.setString(9, booking.getSpecialRequests());

            int rows = stmt.executeUpdate();
            if (rows > 0) {
                roomDAO.updateRoomAvailability(booking.getRoomId(), false);
                conn.commit();
                return true;
            }

            conn.rollback();
            return false;
        } catch (SQLException e) {
            if (conn != null) {
                try { conn.rollback(); } catch (SQLException ex) { ex.printStackTrace(); }
            }
            e.printStackTrace();
            return false;
        } finally {
            if (conn != null) {
                try {
                    conn.setAutoCommit(true);
                    conn.close();
                } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }

    public List<Booking> getBookingsByUserId(int userId) {
        List<Booking> bookings = new ArrayList<>();
        String sql = "SELECT b.*, r.room_number FROM bookings b JOIN rooms r ON b.room_id = r.id WHERE b.user_id = ? ORDER BY b.created_at DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, userId);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                bookings.add(extractBookingFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return bookings;
    }

    public List<Booking> getAllBookings() {
        List<Booking> bookings = new ArrayList<>();
        String sql = "SELECT b.*, r.room_number, u.username FROM bookings b JOIN rooms r ON b.room_id = r.id JOIN users u ON b.user_id = u.id ORDER BY b.created_at DESC";

        try (Connection conn = DatabaseConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                bookings.add(extractBookingFromResultSet(rs));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return bookings;
    }

    public Booking getBookingById(int bookingId) {
        String sql = "SELECT b.*, r.room_number FROM bookings b JOIN rooms r ON b.room_id = r.id WHERE b.id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, bookingId);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                return extractBookingFromResultSet(rs);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean updateBookingStatus(int bookingId, String status) {
        String sql = "UPDATE bookings SET status = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, status);
            stmt.setInt(2, bookingId);

            int rows = stmt.executeUpdate();

            if (rows > 0 && (status.equals("Đã hủy") || status.equals("Đã hoàn thành"))) {
                Booking booking = getBookingById(bookingId);
                if (booking != null) {
                    roomDAO.updateRoomAvailability(booking.getRoomId(), true);
                }
            }

            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean cancelBooking(int bookingId, int userId) {
        Booking booking = getBookingById(bookingId);
        if (booking == null || booking.getUserId() != userId) {
            return false;
        }
        return updateBookingStatus(bookingId, "Đã hủy");
    }

    private Booking extractBookingFromResultSet(ResultSet rs) throws SQLException {
        Booking booking = new Booking();
        booking.setId(rs.getInt("id"));
        booking.setUserId(rs.getInt("user_id"));
        booking.setRoomId(rs.getInt("room_id"));
        booking.setCheckInDate(rs.getDate("check_in_date").toLocalDate());
        booking.setCheckOutDate(rs.getDate("check_out_date").toLocalDate());
        booking.setNumberOfGuests(rs.getInt("number_of_guests"));
        booking.setTotalPrice(rs.getDouble("total_price"));
        booking.setStatus(rs.getString("status"));
        booking.setCustomerName(rs.getString("customer_name"));
        booking.setCustomerPhone(rs.getString("customer_phone"));
        booking.setSpecialRequests(rs.getString("special_requests"));
        booking.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
        booking.setRoomNumber(rs.getString("room_number"));
        try {
            booking.setUsername(rs.getString("username"));
        } catch (SQLException e) {
            // Không có username trong query
        }
        return booking;
    }
}