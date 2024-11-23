const MultiLayerCryptoManager = require('../utils/security/MultiLayerCryptoManager');
const config = require('../../../config/config.json'); // Adjust path

// Fetch the current environment
const ENV = process.env.NODE_ENV || 'development';

// Define the encryption layers from the config
const layers = config[ENV].encryption.layers;

// Initialize the multi-layer crypto manager
const cryptoManager = new MultiLayerCryptoManager(layers);

// Data to encrypt
const plaintext = 'This is a secret message.';

// Encrypt the data
const encrypted = cryptoManager.encrypt(plaintext);
console.log('Encrypted:', encrypted);

// Decrypt the data
const decrypted = cryptoManager.decrypt(encrypted);
console.log('Decrypted:', decrypted);
