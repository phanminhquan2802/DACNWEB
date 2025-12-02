const express = require('express');
const router = express.Router();
const {
  getRooms,
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  updateRoomAvailability,
} = require('../controllers/roomController');
const { protect, admin } = require('../middleware/auth');

// Public routes
router.get('/', getRooms);
router.get('/:id', getRoomById);

// Admin routes
router.get('/admin/all', protect, admin, getAllRooms);
router.post('/', protect, admin, createRoom);
router.put('/:id', protect, admin, updateRoom);
router.delete('/:id', protect, admin, deleteRoom);
router.put('/:id/availability', protect, admin, updateRoomAvailability);

module.exports = router;

