// setupDatabase.js
const { Client } = require('pg');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

// เอาไว้รันสำหรับ ครั้งแรกสำหรับติดตั้ง ให้มันสร้าง database
// คำสั่ง npm run setup จากคอนฟิกใน package.json <3

async function createDatabase() {
  const client = new Client({
    user: config.database.username,
    host: config.database.host,
    password: config.database.password,
    port: config.database.port || 5432,
  });

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${config.database.database}'`);
    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE ${config.database.database}`);
      console.log(`Database ${config.database.database} created successfully.`);
    } else {
      console.log(`Database ${config.database.database} already exists.`);
    }
  } catch (err) {
    console.error('Error creating database:', err);
  } finally {
    await client.end();
  }
}

createDatabase();
