// Order processing/models/Warehouse.js
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
  name: String,
  coords: {
    x: Number,
    y: Number
  }
});

module.exports = mongoose.model("OP_Warehouse", WarehouseSchema);
