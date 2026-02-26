const Order = require("../models/Order");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

exports.placeOrder = async (req, res) => {
  try {
    const { items, assignedWarehouse, assignedHotspot, userCoords } = req.body;

    const total = items.reduce(
      (sum, item) => sum + item.qty * item.priceAtPurchase,
      0
    );

    const order = await Order.create({
      items,
      total,
      assignedWarehouse,
      assignedHotspot,
      userCoords,
      status: "PLACED",
      lifecycle: [{ status: "PLACED", message: "Order created" }],
    });

    // Simulate picking + delivery
    simulateOrderLifecycle(order._id, items, assignedWarehouse, assignedHotspot, userCoords);

    res.json({ orderId: order._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function simulateOrderLifecycle(orderId, items, warehouse, hotspot, userCoords) {
  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const pickTime = 1500 + totalQty * 600;

  await delay(pickTime);
  await Order.findByIdAndUpdate(orderId, {
    status: "PICKED",
    $push: { lifecycle: { status: "PICKED", message: "Items picked" } },
  });

  const { calculateDistance } = require("../utils/utils");
  const deliveryMs =
    (calculateDistance(hotspot.coords, warehouse.coords) +
      calculateDistance(warehouse.coords, userCoords)) *
    1000;

  await delay(1000);
  await Order.findByIdAndUpdate(orderId, {
    status: "OUT_FOR_DELIVERY",
    $push: {
      lifecycle: {
        status: "OUT_FOR_DELIVERY",
        message: "Delivery partner is on the way",
      },
    },
  });

  await delay(deliveryMs);
  await Order.findByIdAndUpdate(orderId, {
    status: "DELIVERED",
    $push: { lifecycle: { status: "DELIVERED", message: "Delivered" } },
  });
}
