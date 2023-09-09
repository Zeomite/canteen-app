const MenuItem = require('../models/MenuItem');

exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Get menu items error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    let image = null;

    // Handle image upload (if provided)
    if (req.file) {
      image = req.file.buffer; // Store image data as a buffer
    }

    const menuItem = await MenuItem.create({ name, price, image });
    res.status(201).json({ message: 'Menu item added successfully', menuItem });
  } catch (error) {
    console.error('Add menu item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.updateItemAvailability = async (req, res) => {
    try {
      const { itemId, available } = req.body;
  
      // Update item availability
      await MenuItem.update(
        { available },
        {
          where: {
            id: itemId,
          },
        }
      );
  
      res.status(200).json({ message: 'Item availability updated successfully' });
    } catch (error) {
      console.error('Update item availability error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.editItemDetails = async (req, res) => {
    try {
      const { itemId, name, price } = req.body;
  
      // Update item details
      await MenuItem.update(
        { name, price },
        {
          where: {
            id: itemId,
          },
        }
      );
  
      res.status(200).json({ message: 'Item details updated successfully' });
    } catch (error) {
      console.error('Edit item details error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.deleteMenuItem = async (req, res) => {
    try {
      const { itemId } = req.params;
  
      // Delete the menu item by its ID
      const deletedMenuItem = await MenuItem.destroy({
        where: {
          id: itemId,
        },
      });
  
      if (deletedMenuItem === 0) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};