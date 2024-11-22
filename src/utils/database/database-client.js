
// utils/database/database-client.js
const { Sequelize } = require('sequelize');
const config = require('../../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
  config.database.database, // The database name
  config.database.username, // Your database username
  config.database.password, // Your database password
  {
    host: config.database.host, // Hostname, usually localhost
    dialect: config.database.dialect, // The database dialect, e.g., 'mysql', 'postgres', 'sqlite'
    logging: (msg) => {
      if (typeof msg === 'string') {
        console.log(msg);
      }
    },
  }
);

module.exports = sequelize; // Correctly export the initialized sequelize instance

