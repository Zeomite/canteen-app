const Order = require('../models/Order');
const { Op } = require('sequelize');

exports.getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get the number of pending orders
    const pendingOrdersCount = await Order.count({
      where: {
        status: 'pending',
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    // Get the number of completed orders
    const completedOrdersCount = await Order.count({
      where: {
        status: 'completed',
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    // Get the total earnings for the day
    const totalEarnings = await Order.sum('totalPrice', {
      where: {
        status: 'completed',
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    res.status(200).json({
      pendingOrdersCount,
      completedOrdersCount,
      totalEarnings,
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
