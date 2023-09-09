const express = require('express');
const passport = require('passport');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

// Get dashboard data (protected route, requires authentication)
router.get(
  '/dashboard-data',
  passport.authenticate('jwt', { session: false }),
  dashboardController.getDashboardData
);

module.exports = router;
