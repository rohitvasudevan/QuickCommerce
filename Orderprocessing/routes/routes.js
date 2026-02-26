// Order processing/routes/routes.js
const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router.post('/place', controller.placeOrder);

router.get('/:id', async (req, res) => {
  const Order = require('../models/Order');
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  res.json(order);
});

module.exports = router;
