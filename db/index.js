const { Pool } = require('pg')
const path = require('path')
const ENV = process.env.NODE_ENV || 'development'

const envPath = path.join(__dirname, '..', `.env.${ENV}`)

require('dotenv').config({ path: envPath })

if (!process.env.PGDATABASE) {
  throw new Error('PGDATABASE not set')
}

module.exports = new Pool()
