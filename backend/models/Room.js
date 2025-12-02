const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: [true, 'Room number is required'],
    unique: true,
    trim: true,
  },
  roomType: {
    type: String,
    required: [true, 'Room type is required'],
    trim: true,
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Price per night is required'],
    min: [0, 'Price must be positive'],
  },
  description: {
    type: String,
    trim: true,
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required'],
    min: [1, 'Capacity must be at least 1'],
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Room', roomSchema);

