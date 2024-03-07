const db = require('../db')
const format = require('pg-format')

const manageTables = require('./manage-tables')

const seed = async ({ userData, photoData }) => {
  await manageTables()

  await db.query(
    format(
      'INSERT INTO users (username, password_hash) VALUES %L RETURNING *',
      userData.map(({ username, passwordHash }) => [username, passwordHash])
    )
  )

  const formattedPhotos = photoData.map(({ userId, url, description }) => [
    userId,
    url,
    description
  ])

  await db.query(
    format(
      'INSERT INTO photos ("userId", url, description) VALUES %L RETURNING *',
      formattedPhotos
    )
  )
}

module.exports = seed
