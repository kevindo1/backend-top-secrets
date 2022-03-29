const { Router } = require('express');
const User = require('../models/User');

module.exports = Router().post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
