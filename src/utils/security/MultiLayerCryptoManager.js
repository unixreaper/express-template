const crypto = require('crypto');

class MultiLayerCryptoManager {
  /**
   * Constructor to initialize multiple encryption layers.
   * @param {Array<Object>} layers - An array of encryption layers.
   * Each layer should have an `algorithm`, `secret`, and `salt`.
   * Example:
   * [
   *   { algorithm: 'aes-256-cbc', secret: 'secret1', salt: 'salt1' },
   *   { algorithm: 'aes-192-cbc', secret: 'secret2', salt: 'salt2' }
   * ]
   */
  constructor(layers) {
    if (!Array.isArray(layers) || layers.length === 0) {
      throw new Error('At least one encryption layer must be provided.');
    }

    this.layers = layers.map((layer, index) => {
      if (!layer.algorithm || !layer.secret || !layer.salt) {
        throw new Error(`Missing required properties in layer ${index + 1}.`);
      }
      return {
        algorithm: layer.algorithm,
        secret: layer.secret,
        salt: layer.salt,
      };
    });
  }

  /**
   * Generate a cryptographic key for a given layer.
   * @param {Object} layer - Encryption layer object.
   * @returns {Buffer} - The derived cryptographic key.
   */
  _getKey(layer) {
    // Determine the key length based on the algorithm
    let keyLength;
    if (layer.algorithm.startsWith('aes-256')) {
      keyLength = 32; // 256-bit key
    } else if (layer.algorithm.startsWith('aes-192')) {
      keyLength = 24; // 192-bit key
    } else if (layer.algorithm.startsWith('aes-128')) {
      keyLength = 16; // 128-bit key
    } else {
      throw new Error(`Unsupported algorithm: ${layer.algorithm}`);
    }
  
    return crypto.scryptSync(layer.secret, layer.salt, keyLength);
  }
  

  /**
   * Encrypt data with all layers.
   * @param {string} plaintext - The data to encrypt.
   * @returns {string} - The encrypted data.
   */
  encrypt(plaintext) {
    return this.layers.reduce((data, layer) => {
      const key = this._getKey(layer);
      const iv = crypto.randomBytes(16); // Generate a random initialization vector
      const cipher = crypto.createCipheriv(layer.algorithm, key, iv);

      let encrypted = cipher.update(data, 'utf8', 'base64');
      encrypted += cipher.final('base64');

      return `${iv.toString('base64')}:${encrypted}`; // Use IV:EncryptedData format
    }, plaintext); // Start with the original plaintext
  }

  /**
   * Decrypt data with all layers in reverse order.
   * @param {string} ciphertext - The encrypted data.
   * @returns {string} - The decrypted data.
   */
  decrypt(ciphertext) {
    return this.layers.reduceRight((data, layer) => {
      const [ivBase64, encryptedData] = data.split(':');
      if (!ivBase64 || !encryptedData) {
        throw new Error('Invalid ciphertext format. Expected "IV:EncryptedData".');
      }

      const iv = Buffer.from(ivBase64, 'base64');
      const key = this._getKey(layer);
      const decipher = crypto.createDecipheriv(layer.algorithm, key, iv);

      let decrypted = decipher.update(encryptedData, 'base64', 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    }, ciphertext); // Start with the encrypted ciphertext
  }
}

module.exports = MultiLayerCryptoManager;
