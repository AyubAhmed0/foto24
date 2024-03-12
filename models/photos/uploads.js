const db = require('../../db')

function insertPhoto ({ userId, fileUrl, description }) {
  if (userId === undefined || fileUrl === undefined || description === undefined) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ status: 400, msg: 'Bad request' })
  }
  const query = `
    INSERT INTO photos ("userId", url, description)
    VALUES ($1, $2, $3)
    RETURNING *;
`
  const values = [userId, fileUrl, description]

  return db.query(query, values)
}

module.exports = { insertPhoto }
