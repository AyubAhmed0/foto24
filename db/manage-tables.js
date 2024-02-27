const db = require('./')
const { createUsersTable, createPhotosTable } = require('./queries')

async function manageTables () {
  await db.query('DROP TABLE IF EXISTS photos;')

  await db.query('DROP TABLE IF EXISTS users;')

  await db.query(createUsersTable)

  await db.query(createPhotosTable)
}

module.exports = manageTables
