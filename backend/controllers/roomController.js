const Room = require('../models/Room');

// @desc    Get all available rooms
// @route   GET /api/rooms
// @access  Public
const getRooms = async (req, res) => {
  try {
    const { roomType } = req.query;
    let query = { isAvailable: true };

    if (roomType) {
      query.roomType = roomType;
    }

    const rooms = await Room.find(query).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all rooms (Admin)
// @route   GET /api/rooms/all
// @access  Private/Admin
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get room by ID
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new room
// @route   POST /api/rooms
// @access  Private/Admin
const createRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, pricePerNight, description, capacity, image } = req.body;

    // Check if room number already exists
    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const room = await Room.create({
      roomNumber,
      roomType,
      pricePerNight,
      description,
      capacity,
      image,
      isAvailable: true,
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      room.roomNumber = req.body.roomNumber || room.roomNumber;
      room.roomType = req.body.roomType || room.roomType;
      room.pricePerNight = req.body.pricePerNight || room.pricePerNight;
      room.description = req.body.description || room.description;
      room.capacity = req.body.capacity || room.capacity;
      room.image = req.body.image || room.image;
      room.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : room.isAvailable;

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      await room.deleteOne();
      res.json({ message: 'Room removed' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update room availability
// @route   PUT /api/rooms/:id/availability
// @access  Private/Admin
const updateRoomAvailability = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (room) {
      room.isAvailable = req.body.isAvailable;
      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRooms,
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
};

