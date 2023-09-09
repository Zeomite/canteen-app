const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { customerName, items, totalPrice } = req.body;

    // Create a new order
    const order = await Order.create({ customerName, items, totalPrice });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Place order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const orderHistory = await Order.findAll({ where: { status: 'completed' } });
    res.status(200).json(orderHistory);
  } catch (error) {
    console.error('Get order history error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by its ID
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update the order status to 'completed'
    order.status = 'completed';
    await order.save();

    res.status(200).json({ message: 'Order status updated to completed' });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
