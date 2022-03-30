const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Secrets = require('../lib/models/Secrets');

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
    const res = await request(app).post('/api/v1/users').send(mockUser);
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
    await UserService.create({
      email: 'kevin@email.com',
      password: 'password',
    });

    let res = await request(app).delete('/api/v1/users/sessions');

    expect(res.body).toEqual({
      message: 'Signed out successfully',
      success: true,
    });
  });

  it('should create secret', async () => {
    const agent = request.agent(app);
    await UserService.create({
      email: 'kevin@email.com',
      password: 'password',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'kevin@email.com', password: 'password' });

    const res = await agent.post('/api/v1/secrets').send({
      title: 'secret1',
      description: 'this is the first secret',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'secret1',
      description: 'this is the first secret',
      createdAt: expect.any(String),
    });
  });

  it('should get all secrets when signed in', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'kevin@email.com',
      password: 'password',
    });

    let res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(401);

    await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'kevin@email.com', password: 'password' });

    res = await agent.get('/api/v1/secrets');

    expect(res.body).toEqual([
      {
        id: '1',
        title: 'secret1',
        description: 'this is the first secret',
        createdAt: expect.any(String),
      },
      {
        id: '2',
        title: 'secret2',
        description: 'this is the second secret',
        createdAt: expect.any(String),
      },
    ]);
    expect(res.status).toEqual(200);
  });
});
