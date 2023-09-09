const express = require('express');
const expressWs = require('express-ws');
const passport = require('passport');
const websocketController = require('../controllers/websocketController');

const router = express.Router();
expressWs(router);

// Initialize WebSocket server and handle connections
router.ws('/ws', (ws, req) => {
  passport.authenticate('jwt', { session: false })(req, null, () => {
    // Handle WebSocket connections using the WebSocket controller
    websocketController.initWebSocket(req.server);

    // Send pending orders to the connected client
    websocketController.sendPendingOrders();
  });
});

module.exports = router;
