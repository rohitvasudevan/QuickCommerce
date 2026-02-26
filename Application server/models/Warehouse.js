const mongoose = require('mongoose');


const WarehouseSchema = new mongoose.Schema({
name: String,
x: Number,
y: Number
});
module.exports = mongoose.model('Warehouse', WarehouseSchema);