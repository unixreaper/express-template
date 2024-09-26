// ./utils/security/hashlib.js


// ผมเขียน OOP ตัวนี้ขึ้นมาเพื่อใช้ในการเข้ารหัสต่างๆเช่น user password ที่สมัครมา
const crypto = require('crypto');

class Hasher {
  constructor(salt, secretKey) {
    this.salt = salt;
    this.secretKey = secretKey;
  }

  hash(str) {
    const hash = crypto.createHmac('sha256', this.secretKey)
      .update(str + this.salt)
      .digest('hex');
    return hash;
  }

  unhash(hash) {
    throw new Error('Unhashing is not supported');
  }
}

module.exports = Hasher;
