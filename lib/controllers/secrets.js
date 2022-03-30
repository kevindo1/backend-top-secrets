const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = [
      {
        id: '1',
        title: 'secret1',
        description: 'this is the first secret',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
      {
        id: '2',
        title: 'secret2',
        description: 'this is the second secret',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
    ];
    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
