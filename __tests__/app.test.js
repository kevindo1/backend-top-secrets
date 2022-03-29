const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

// Dummy user for testing
const mockUser = {
  email: 'kevin@email.com',
  password: 'password',
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
    const res = await request(app).post('/api/v1/users/').send(mockUser);
    const { email } = mockUser;
    expect(res.body).toEqual({ id: expect.any(String), email });
  });
});
