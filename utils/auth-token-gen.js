const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken (user) {
  const payload = {
    userId: user.userId,
    username: user.username
  }

  const secretKey = process.env.JWT_SECRET
  const options = { expiresIn: '1h' }
  return jwt.sign(payload, secretKey, options)
}

module.exports = { generateToken }
