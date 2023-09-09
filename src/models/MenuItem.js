const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Set the default availability to true
  },
  image: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

module.exports = MenuItem;
