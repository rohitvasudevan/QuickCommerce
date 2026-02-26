const mongoose = require('mongoose');


const HotspotSchema = new mongoose.Schema({
name: String,
x: Number,
y: Number
});
module.exports = mongoose.model('Hotspot', HotspotSchema);