// tests/example.test.js
const request = require('supertest');
const app = require('../app'); // Ensure your app entry point is correct

describe('Example API Tests', () => {

  // Helper function to call /test and retrieve JWT
  const getJwtFromTestEndpoint = async () => {
    const response = await request(app)
      .post('/api/v1/example/test')
      .send({
        f_name: 'Michael',
        l_name: 'Jordan',
        uname: 'unixreaper',
        password: 'example-password'
      });

    expect(response.statusCode).toBe(201); // Ensure the user creation is successful
    expect(response.body).toHaveProperty('jwt'); // Ensure a JWT token is returned
    return response.body.jwt; // Return the JWT
  };

  describe('Test /test endpoint', () => {

    it('Should successfully create user and return JWT', async () => {
      const response = await request(app)
        .post('/api/v1/example/test')
        .send({
          f_name: 'Michael',
          l_name: 'Jordan',
          uname: 'unixreaper',
          password: 'example-password'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('jwt'); // Ensure a JWT token is returned
    });

    it('Should fail when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/v1/example/test')
        .send({
          f_name: 'Michael', // Missing l_name, uname, and password
        });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('error'); // Ensure error message is returned
    });
  });

  describe('Test /test-with-permission endpoint', () => {

    it('Should allow access when user has admin role', async () => {
      const jwtToken = await getJwtFromTestEndpoint(); // Get a valid JWT from /test

      const response = await request(app)
        .get('/api/v1/example/test-with-permission')
        .set('Authorization', `Bearer ${jwtToken}`); // Set Authorization header with JWT

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'You are admin, you have access');
    });

    it('Should deny access when token is missing', async () => {
      const response = await request(app)
        .get('/api/v1/example/test-with-permission'); // No Authorization header

      expect(response.statusCode).toBe(401);
    });
  });
});
