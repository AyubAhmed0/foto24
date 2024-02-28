const { insertUser } = require('../../models/users/register')
function postUser (req, res, next) {
  const newUser = req.body
  // password length
  if (newUser.password && newUser.password.length < 8) {
    return res.status(400).json({ msg: 'Password must be at least 8 characters long' })
  }
  insertUser(newUser)
    .then((user) => {
      res.status(201).send({ user: user.rows[0] })
    })
    .catch(next)
}

module.exports = { postUser }
