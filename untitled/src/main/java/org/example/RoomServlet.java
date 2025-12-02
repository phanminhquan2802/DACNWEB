package org.example;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.List;

@WebServlet("/rooms")
public class RoomServlet extends HttpServlet {
    private RoomDAO roomDAO = new RoomDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String roomType = request.getParameter("type");
        List<Room> rooms;

        if (roomType != null && !roomType.isEmpty()) {
            rooms = roomDAO.getRoomsByType(roomType);
        } else {
            rooms = roomDAO.getAllAvailableRooms();
        }

        request.setAttribute("rooms", rooms);
        request.setAttribute("selectedType", roomType);
        request.getRequestDispatcher("/rooms.jsp").forward(request, response);
    }
}