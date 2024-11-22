const MultiLayerCryptoManager = require('../utils/security/MultiLayerCryptoManager');

// Define the encryption layers
const layers = [
  { algorithm: 'aes-256-cbc', secret: 'FBB36928E54AB1BD76E544E22EA14B5F69DAEEA6C4882DF34EEF533278', salt: 'salt1' },
  { algorithm: 'aes-192-cbc', secret: 'FBB36928E54AB1BD76E544E22EA14B5F69DAEEA6C4882DF34EEF533278', salt: 'salt2' }
];

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
