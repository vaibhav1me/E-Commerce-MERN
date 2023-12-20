const Order = require("../models/Order");

const fetchOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const Orders = await Order.find({ userId });
    res.json(Orders);
  } catch (error) {
    res.json(error);
  }
};

const createOrder = async (req, res) => {
  // front end will send an object {userId: , orderItems: []}
  const { userId, orderItems } = req.body;
  try {
    const orders = await Promise.all(
      orderItems.map(async (orderItem) => {
        const order = await Order.create({ userId, ...orderItem });
        return order;
      })
    );
    res.json(orders);
  } catch (error) {
    res.json(error);
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await Order.findOne({ _id: orderId });
    if (order.status === "Pending") {
      await Order.findOneAndDelete({ _id: orderId });
      res.json({ message: "Order Cancelled successfully" });
    } else {
      res.json({
        message:
          "Order cannot be cancelled as the product has already been shipped",
      });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { fetchOrders, createOrder, cancelOrder };
