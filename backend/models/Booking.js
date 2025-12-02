const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'Room ID is required'],
  },
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required'],
  },
  checkOutDate: {
    type: Date,
    required: [true, 'Check-out date is required'],
    validate: {
      validator: function (value) {
        return value > this.checkInDate;
      },
      message: 'Check-out date must be after check-in date',
    },
  },
  numberOfGuests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: [1, 'Number of guests must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be positive'],
  },
  status: {
    type: String,
    enum: ['Đang xử lý', 'Đã xác nhận', 'Đã hủy', 'Đã hoàn thành'],
    default: 'Đang xử lý',
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required'],
    trim: true,
  },
  specialRequests: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Calculate total price before saving
bookingSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('checkInDate') || this.isModified('checkOutDate') || this.isModified('roomId')) {
    const Room = mongoose.model('Room');
    const room = await Room.findById(this.roomId);
    if (room) {
      const days = Math.ceil((this.checkOutDate - this.checkInDate) / (1000 * 60 * 60 * 24));
      this.totalPrice = days * room.pricePerNight;
    }
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);

