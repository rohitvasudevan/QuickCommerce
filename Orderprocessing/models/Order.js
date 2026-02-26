const mongoose = require('mongoose');


const OrderSchema = new mongoose.Schema({
userId: String,
items: Array,
status: String,
createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Order', OrderSchema);