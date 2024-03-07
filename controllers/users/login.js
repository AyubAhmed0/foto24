const { selectUserByUsername } = require('../../models/users/login')
const { generateToken } = require('../../utils/auth-token-gen')
const bcrypt = require('bcrypt')

function findUserByUsername (req, res, next) {
  const { username, password } = req.body
  selectUserByUsername(username)
    .then(user => {
      bcrypt.compare(password, user.password_hash)
        .then(match => {
          if (!match) {
            return res.status(401).json({ msg: 'Incorrect login credentials' })
          }
          // Password matches, generate token
          const token = generateToken({ userId: user.userId, username: user.username })
          res.status(200).send({ user, token })
        })
    })
    .catch(next)
}
module.exports = { findUserByUsername }
