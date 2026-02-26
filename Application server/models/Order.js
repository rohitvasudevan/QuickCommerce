// Application server/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: String,
  items: [
    {
      productId: String,
      qty: Number,
      priceAtPurchase: Number,
    }
  ],
  total: Number,
  assignedWarehouse: Object,
  assignedHotspot: Object,
  userCoords: Object,
  status: { type: String, default: "PLACED" },
  lifecycle: [
    {
      status: String,
      timestamp: { type: Date, default: Date.now },
      message: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
