const db = require('../../db')

function selectUserByUsername (username) {
  return db.query('SELECT * FROM users WHERE username = $1', [username])
    .then((result) => {
      if (result.rows.length === 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ status: 404, msg: 'User not found' }) // User not found
      }
      return result.rows[0] // Return the found user
    })
}

module.exports = { selectUserByUsername }
