const express = require('express')
const app = express()
app.use(express.json())

const {
  postUser
} = require('./controllers/users/register')
const {
  findUserByUsername
} = require('./controllers/users/login')
const { handlePsqlError } = require('./error-handling/PSQL-error')
const { handleCustomErrors } = require('./error-handling/custom-error')

app.use(express.json())

app.post('/api/users/register', postUser)
app.post('/api/users/login', findUserByUsername)
app.use(handleCustomErrors)
app.use(handlePsqlError)

module.exports = app
