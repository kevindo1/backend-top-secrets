const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secrets = require('../models/Secrets');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = await Secrets.getAllSecrets();
    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
