const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

// Dummy user for testing
const mockUser = {
  email: 'kevin@email.com',
  password: 'password',
};

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

  it('should login user', async () => {
    const user = await UserService.create({
      email: 'kevin@email.com',
      password: 'password',
    });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send(mockUser);

    expect(res.body).toEqual({ message: 'Signed in successfully', user });
  });

  it('logs out the user', async () => {
    const user = await UserService.signIn({
      email: 'kevin@email.com',
      password: 'password',
    });

    const res = await request(app).delete('/api/v1/users/sessions');

    expect(res.body).toEqual(user);
    expect(await findByEmail('kevin@email.com')).toBeNull();

    expect({ message: 'Signed out successfully' });
  });
});
