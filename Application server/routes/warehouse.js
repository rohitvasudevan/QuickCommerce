const express = require('express');
const Warehouse = require('../models/Warehouse');
const Hotspot = require('../models/Hotspot');


const router = express.Router();


const dist = (a, b) => Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);


router.post('/nearest', async (req, res) => {
const { userX, userY } = req.body;


const warehouses = await Warehouse.find();
const hotspots = await Hotspot.find();


const user = { x: userX, y: userY };
const nearestWarehouse = warehouses.reduce((min, w) => dist(user, w) < dist(user, min) ? w : min);


const nearestHotspot = hotspots.reduce((min, h) => dist(nearestWarehouse, h) < dist(nearestWarehouse, min) ? h : min);


res.json({ nearestWarehouse, nearestHotspot });
});


module.exports = router;