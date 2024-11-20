const express = require('express');
const http = require('http');
const cors = require('cors'); // Import cors
const config = require('./config/config.json')[process.env.NODE_ENV || 'development']; // Load configuration based on environment

require('./utils/logging');
const app = require('./include/express');
const { enhanceResponsePrototype } = require('./utils/responseEnhancer');

// Enable CORS
const corsOptions = {
  origin: config.express.cors.origin, // Allowed origins from config
  methods: config.express.cors.methods, // Allowed methods from config
  allowedHeaders: config.express.cors.allowedHeaders, // Allowed headers from config
};
app.use(cors(corsOptions));

// Show Environment
const env = process.env.NODE_ENV || 'development';
console.log(`Running in ${env} environment`);

// Enhance the response prototype for custom error handling
enhanceResponsePrototype(app.response);

// Define an async function to handle async operations
async function initializeApp() {
  // Uncomment below if database is used in config
  // const sequelize = require('./utils/database/database-client');

  try {
    // Uncomment to test database connection
    // await sequelize.authenticate();
    // console.log('Connection has been established successfully.');

    // Uncomment to sync models
    // await sequelize.sync({ alter: true });
    // console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error initializing the application:', error);
  }

  // Start the server after initialization is complete
  const server = http.createServer(app);
  const PORT = config.express.port || 4444;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Middleware
app.use(express.urlencoded({ extended: config.express.urlencoded }));
app.use(express.json({ limit: config.express.json.limit, extended: config.express.json.extended }));

// Routers
const apiRouter = require('./routers');
app.use('/api/v1/', apiRouter);

// Start the initialization process
if (require.main === module) {
  initializeApp();
}

module.exports = app;
