const socketIo = require('socket.io');
const Order = require('../models/Order');


async function sendPendingOrders () {
  try {
    // Fetch new orders with status 'pending' from the database
    const pendingOrders = await Order.findAll({ where: { status: 'pending' } });

    // Send pending orders to connected clients
    io.emit('pendingOrders', pendingOrders);
  } catch (error) {
    console.error('WebSocket send pending orders error:', error);
  }
};

let io;
function initWebSocket (server){
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Client connected to WebSocket');

    socket.on('disconnect', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Periodically check for new pending orders and send updates
  setInterval(sendPendingOrders, 5000); // Check every 5 seconds
};


 module.exports = { sendPendingOrders , initWebSocket}