const jwt = require('jsonwebtoken')
require('dotenv').config()

function generateToken (user) {
  const payload = {
    user_id: user.user_id,
    username: user.username
  }

  const secretKey = process.env.JWT_SECRET
  const options = { expiresIn: '1h' }

  return jwt.sign(payload, secretKey, options)
}

module.exports = { generateToken }
