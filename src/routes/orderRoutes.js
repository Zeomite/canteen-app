const express = require('express');
const passport = require('passport');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Place a new order (protected route, requires authentication)
router.post(
  '/place-order',
  passport.authenticate('jwt', { session: false }),
  orderController.placeOrder
);

// Get order history (protected route, requires authentication)
router.get(
  '/order-history',
  passport.authenticate('jwt', { session: false }),
  orderController.getOrderHistory
);

router.post(
    '/update-status/:orderId',
    passport.authenticate('jwt', { session: false }),
    orderController.updateOrderStatus
  );

module.exports = router;
