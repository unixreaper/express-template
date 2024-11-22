const R2Client = require('cloudflare-r2-sdk');
const config = require('./src/config/config.json');

const ENV = process.env.NODE_ENV || 'development'; // Default to 'development' if not specified
const r2Config = config[ENV].storage.cloudflarer2;

// Initialize the R2 Client with configuration from the JSON file
const r2client = new R2Client(
  r2Config.accountid,
  r2Config.accesskeyid,
  r2Config.secretkeyid,
  r2Config.region
);

// Set the public domain from the configuration
r2client.setPublicDomain(r2Config.publicdomain);

// Export the instance as r2client
module.exports = r2client;
