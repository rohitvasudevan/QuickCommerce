// Order processing/models/Hotspot.js
const mongoose = require('mongoose');

const HotspotSchema = new mongoose.Schema({
  name: String,
  coords: {
    x: Number,
    y: Number
  }
});

module.exports = mongoose.model("OP_Hotspot", HotspotSchema);
