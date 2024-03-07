const db = require('../../db')

function insertPhoto ({ userId, filePath, description }) {
  if (userId === undefined || filePath === undefined || description === undefined) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  const query = `
    INSERT INTO photos ("userId", url, description)
    VALUES ($1, $2, $3)
    RETURNING *;
`
  const values = [userId, filePath, description]

  return db.query(query, values)
}

module.exports = { insertPhoto }
