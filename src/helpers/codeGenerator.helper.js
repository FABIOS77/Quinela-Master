const crypto = require('crypto');

const generateInviteCode = (length = 6) => {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
    .toUpperCase();
};

module.exports = { generateInviteCode };