const pool = require('../utils/pool');

module.exports = class Secrets {
  id;
  title;
  description;
  createdAt;

  constructor(row) {
    this.id = this.row;
  }
};
