const { Router } = require('express');

module.exports = Router().post('/', async (req, res) => {
  const user = { id: '1', username: 'kevin', password: 'password' };
  res.send(user);
});
