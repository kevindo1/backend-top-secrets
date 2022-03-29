const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// Dummy user for testing
const mockUser = {
  firstName: 'Mock',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345678',
};

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});
