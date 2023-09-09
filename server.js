const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Set up CORS for cross-origin requests
app.use(cors());

// Set up body parser to parse JSON requests
app.use(bodyParser.json());

// Initialize Passport.js for authentication
app.use(passport.initialize());

// Include your Passport configuration for vendor authentication here

// Initialize WebSocket server for real-time updates
require('./src/controllers/websocketController').initWebSocket(io);

// Configure routes for vendor side only
app.use('/dashboard', require('./src/routes/dashboardRoutes.js'));

app.use('/auth', require('./src/routes/authRoutes.js'));
// Configure routes for managing menu items
app.use('/menu', require('./src/routes/menuRoutes'));

// Configure routes for updating order status
app.use('/orders', require('./src/routes/orderRoutes'));

// Handle errors (custom error handler middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
