// /utils/database/redis-client.js
const Redis = require('ioredis');
const config = require('../../config/config.json')[process.env.NODE_ENV || 'development'];

// Configure Redis
const redisClient = new Redis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
});

// Event listeners for Redis connection
redisClient.on('connect', () => {
    console.log('Successfully connected to Redis');
});

redisClient.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redisClient;
