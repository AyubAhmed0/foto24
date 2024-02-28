const db = require('../../db')
const bcrypt = require('bcrypt')

function insertUser (user) {
  const { username, password } = user
  if (username === undefined || password === undefined) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
    .then(hashedPassword => {
      const userValues = [username, hashedPassword]
      return db.query(
            `
                INSERT INTO users (username, password_hash)
                VALUES ($1, $2)
                RETURNING *
                `,
            userValues
      )
    })
}

module.exports = { insertUser }
