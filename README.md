
# Canteen App Documentation

## Overview

The Canteen App is a web-based application designed to streamline the management of a canteen or cafeteria. It provides a user-friendly interface for vendors to manage their menu items, view orders, and update their password securely.

## Installation and Setup

### Prerequisites

Before running the Canteen App, ensure you have the following prerequisites installed:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/)

### Installation Steps

1. Clone the project repository:

   ```bash
   git clone https://github.com/Zeomite/canteen-app
   cd canteen-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure Environment Variables:

   Create a `.env` file in the project root directory and configure the following environment variables:

   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=myfooddb
   DB_USER=myfooduser
   DB_PASSWORD=mysecretpassword
   SESSION_SECRET=mysecretkey
   ```

4. Create and Seed the Database:

   Run the following commands to create and seed the database:

   ```bash
   npx sequelize-cli db:create
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. Start the Application:

   ```bash
   npm start
   ```

6. Access the App:

   Open a web browser and navigate to `http://localhost:3000` to access the Canteen App.

##API Routes

### Authentication

#### Registration

  - **POST /auth/register**: Register a new vendor.
  - Request Body: JSON containing vendor details (username, password, etc.).
  - Response: JWT token upon successful registration.

#### Login

- **POST /auth/login**: Log in a vendor.
  - Request Body: JSON containing vendor's username and password.
  - Response: JWT token upon successful login.

#### Change Password

  - **PUT /auth/change-password**: Change the vendor's password.
  - Request Body: JSON containing the current password and the new password.
  - Response: Success message upon successful password change.

### Dashboard

- **GET /dashboard**: Retrieve statistics for the vendor's canteen.
  - Response: JSON containing the number of pending orders, completed orders, and total revenue for the day.

### Menu Management

#### List All Menu Items

- **GET /menu/**: Retrieve a list of all menu items.
  - Response: JSON array containing all menu items.

#### Add Menu Item

- **POST /menu/add-item**: Add a new menu item.
  - Request Body: JSON containing the item name, price, and image URL.
  - Response: JSON confirmation of the added menu item.

#### Update Menu Item

- **PUT /menu/edit-item/**: Update an existing menu item.
  - Request Body: JSON containing the updated item details.
  - Response: JSON confirmation of the updated menu item.

#### Update Menu Item Availability

- **PUT /menu/update-availability**: Update an existing menu item.
  - Request Body: JSON containing ItemId..
  - Response: JSON confirmation of the updated menu item.

#### Delete Menu Item

- **DELETE /menu/delete-item/:itemId**: Delete an existing menu item.
  - Response: JSON confirmation of the deleted menu item.


### Order Management 

- **POST /orders/update-status/:orderId**: Update the status of a specific order.(completed or pending)
  - Request Body: JSON containing ItemId.
  - Response: JSON confirmation of the updated menu item.
  
- **POST /orders/place-order**: pla
  - **POST /menu/add-item**: Add a new menu item.
  - Request Body: JSON containing the items, quantity and price. 
  - Response: JSON confirmation of the order placed.


- **GET /orders/history**: Retrieve a list of orders with customer names, payment methods, and total prices, filtered by date.
  - Response: JSON array containing order details.


### WebSocket

WebSocket functionality allows real-time communication between clients and the server. In our project, WebSocket is primarily used for updating the dashboard with pending orders and for any real-time notifications.

#### WebSocket Configuration

- WebSocket is configured in the `websocketRoutes.js` file.
- It establishes a WebSocket server that listens for incoming connections on a specific path (e.g., `/ws`).
- When a client connects, it can receive real-time updates or notifications.

#### Dashboard Updates

- The dashboard route (`GET /dashboard`) retrieves data for the dashboard, including the number of pending orders and other relevant information.
- WebSocket is used to update the dashboard in real-time when new orders are placed.
- When a new order is received, the server sends a WebSocket message to connected clients to update the pending order count.

## Database Schema

Our application uses a PostgreSQL database to store various types of data. Here's an overview of the database schema:

### User Table

- `users`: Stores user information.
- Fields:
  - `id`: Primary key, unique user identifier.
  - `username`: User's username.
  - `password`: User's hashed password.
  - Add any additional user-related fields as needed.

### Menu Item Table

- `menu_items`: Stores menu item information.
- Fields:
  - `id`: Primary key, unique menu item identifier.
  - `name`: Name of the menu item.
  - `price`: Price of the menu item.
  - `image_url`: URL of the menu item's image.
  - `is_available`: Indicates whether the menu item is available.

### Order Table

- `orders`: Stores order information.
- Fields:
  - `id`: Primary key, unique order identifier.
  - `customer_name`: Name of the customer who placed the order.
  - `payment_method`: Payment method used for the order.
  - `total_price`: Total price of the order.
  - `order_date`: Date and time when the order was placed.

## Technologies Used

- Node.js
- Express.js
- Sequelize (PostgreSQL)
- Passport.js
- JWT (JSON Web Tokens)
- JavaScript




