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

// const registerAndLogin = async (userProps = {}) => {
//   const password = userProps.password ?? mockUser.password;

//   const agent = request.agent(app);
// };

describe('. routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs a user up with POST', async () => {
    const res = await request(app)
      .post('/api/v1/auth/')
      .send({ username: 'kevin', password: 'password' });

    expect(res.body).toEqual({ id: expect.any(String), username: 'kevin' });
  });
});
