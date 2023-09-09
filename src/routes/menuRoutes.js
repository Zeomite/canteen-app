const express = require('express');
const passport = require('passport');
const menuController = require('../controllers/menuController');

const router = express.Router();

// Get all menu items (public route)
router.get('/menu-items', menuController.getAllMenuItems);

// Add a menu item (protected route, requires authentication)
router.post(
  '/menu-items',
  passport.authenticate('jwt', { session: false }),
  menuController.addMenuItem
);

router.post(
    '/update-availability',
    passport.authenticate('jwt', { session: false }),
    menuController.updateItemAvailability
  );

router.post(
    '/edit-item',
    passport.authenticate('jwt', { session: false }),
    menuController.editItemDetails
  );

router.delete(
    '/delete/:itemId',
    passport.authenticate('jwt', { session: false }),
    menuController.deleteMenuItem
  );
module.exports = router;
