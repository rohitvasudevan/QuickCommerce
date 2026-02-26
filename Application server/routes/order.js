const express = require("express");
const axios = require("axios");
const auth = require("../middleware/auth");
const router = express.Router();

// ORDER PROCESSING SERVER URL
const ORDER_PROCESSING_URL = "http://localhost:5001/api/orders";

router.post("/place", auth, async (req, res) => {
  try {
    const response = await axios.post(`${ORDER_PROCESSING_URL}/place`, req.body);
    res.json(response.data);
  } catch (err) {
    console.error("Order proxy error:", err.message);
    res.status(500).json({ error: "Order placement failed." });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const response = await axios.get(`${ORDER_PROCESSING_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order." });
  }
});

module.exports = router;
