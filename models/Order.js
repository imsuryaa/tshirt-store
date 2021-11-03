const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  item: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: 'paid',
    enum: ['paid', 'pending'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Order', OrderSchema)
