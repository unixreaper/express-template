// // models/User.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../utils/database/database-client');

// Example of USER ORM Database Table design ตรงนี้

// const User = sequelize.define('user', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   first_name: {
//     type: DataTypes.STRING,
//     allowNull: false, // First name is required
//   },
//   last_name: {
//     type: DataTypes.STRING,
//     allowNull: false, // Last name is required
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false, // Email is required
//     unique: true,     // Email must be unique
//     validate: {
//       isEmail: true,  // Ensure valid email format
//     },
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false, // Password is required
//   },
//   role: {
//     type: DataTypes.ENUM('admin', 'employee', 'manager'),
//     allowNull: false, // Role is required
//     defaultValue: 'employee', // Default role is 'employee'
//   },
// }, {
//   tableName: 'users',
//   timestamps: true, // Automatically handle 'createdAt' and 'updatedAt'
//   underscored: true, // Use underscored naming convention for columns
// });

// // Export the model
// module.exports = User;
