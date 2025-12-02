const Booking = require('../models/Booking');
const Room = require('../models/Room');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  try {
    const { roomId, checkInDate, checkOutDate, numberOfGuests, customerName, customerPhone, specialRequests } = req.body;

    // Check if room exists and is available
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (!room.isAvailable) {
      return res.status(400).json({ message: 'Room is not available' });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    if (checkOut <= checkIn) {
      return res.status(400).json({ message: 'Check-out date must be after check-in date' });
    }

    // Calculate total price
    const days = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = days * room.pricePerNight;

    // Create booking
    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      checkInDate: checkIn,
      checkOutDate: checkOut,
      numberOfGuests,
      totalPrice,
      customerName,
      customerPhone,
      specialRequests,
      status: 'Đang xử lý',
    });

    // Update room availability
    room.isAvailable = false;
    await room.save();

    // Populate room and user info
    await booking.populate('roomId', 'roomNumber roomType pricePerNight');
    await booking.populate('userId', 'username email');

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/my-bookings
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('roomId', 'roomNumber roomType pricePerNight image')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('userId', 'username email phone')
      .populate('roomId', 'roomNumber roomType pricePerNight')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('userId', 'username email phone')
      .populate('roomId', 'roomNumber roomType pricePerNight image description');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking or is admin
    if (booking.userId._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id).populate('roomId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // If booking is cancelled or completed, make room available again
    if (status === 'Đã hủy' || status === 'Đã hoàn thành') {
      const room = await Room.findById(booking.roomId._id);
      if (room) {
        room.isAvailable = true;
        await room.save();
      }
    }

    await booking.populate('userId', 'username email');
    await booking.populate('roomId', 'roomNumber roomType pricePerNight');

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('roomId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns the booking
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    booking.status = 'Đã hủy';
    await booking.save();

    // Make room available again
    const room = await Room.findById(booking.roomId._id);
    if (room) {
      room.isAvailable = true;
      await room.save();
    }

    await booking.populate('userId', 'username email');
    await booking.populate('roomId', 'roomNumber roomType pricePerNight');

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};

