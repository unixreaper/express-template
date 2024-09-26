// app.js
const express = require('express');
const http = require('http');

require('./utils/logging');
const app = require('./include/express');
const { enhanceResponsePrototype } = require('./utils/responseEnhancer');

// เปิด comment ข้างล่าง ถ้าหากจะเชื่อม database ใน config.json
// const sequelize = require('./utils/database/database-client');

// Show Environment
const env = process.env.NODE_ENV || 'development';
console.log(`Running in ${env} environment`);

// Enhance the response prototype for custom error handling
enhanceResponsePrototype(app.response);

// Define an async function to handle async operations
async function initializeApp() {

  // เปิด comment ข้างล่าง ถ้าหากจะเชื่อม database ใน config.json

  // try {
  //   // Test database connection
  //   await sequelize.authenticate();
  //   console.log('Connection has been established successfully.');

  //   // Sync all models, force reload if necessary
  //   // await sequelize.sync({ force: true }); // force ให้รีโหลดทุกรอบ
  //   await sequelize.sync({ alter: true }); // This will ensure that your database schema is updated with the correct foreign key relationship.

  //   console.log('All models were synchronized successfully.');

  //   // Initialize default data
  //   await initializeDefaults();
  //   await addDefaultLeaveTypes();

  //   console.log('Default data initialized successfully.');

  // } catch (error) {
  //   console.error('Error initializing the application:', error);
  // }

  // Start the server after initialization is complete
  const server = http.createServer(app);
  const PORT = process.env.PORT || 4444;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb', extended: true }));

// Routers
const apiRouter = require('./routers');
app.use('/api/v1/', apiRouter);

// Start the initialization process
if (require.main === module) {
  initializeApp(); 
}

module.exports = app;
