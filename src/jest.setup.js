// jest.setup.js

const sequelize = require('./utils/database/database-client'); // Adjust the path to your sequelize instance

beforeAll(async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (err) {
        console.error('Error synchronizing models:', err);
    }
});

afterAll(async () => {
    try {
        await sequelize.query('DROP TABLE IF EXISTS users');
        console.log('Table users were dropped successfully.');
    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        await sequelize.close();
    }
});

jest.setTimeout(30000); // 30 วิถ้ามันไม่โต้ตอบก็ถือว่า timeout ผลการเทสไป