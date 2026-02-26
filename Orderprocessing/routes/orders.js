const express = require('express');
const Order = require('../models/Order');


const router = express.Router();


router.post('/place', async (req, res) => {
const order = new Order({ ...req.body, status: "PLACED" });
await order.save();


setTimeout(async () => {
order.status = "PICKING";
await order.save();
}, 2000);


setTimeout(async () => {
order.status = "OUT_FOR_DELIVERY";
await order.save();
}, 5000);


setTimeout(async () => {
order.status = "DELIVERED";
await order.save();
}, 9000);


res.json(order);
});


router.get('/:id', async (req, res) => {
const order = await Order.findById(req.params.id);
res.json(order);
});


module.exports = router;