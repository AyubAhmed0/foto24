const express = require('express')
const app = express()
app.use(express.json())

// Require controllers and middleware
const { postUser } = require('./controllers/users/register')
const { findUserByUsername } = require('./controllers/users/login')
const { postPhoto } = require('./controllers/photos/uploads')
const { verifyToken } = require('./middleware/auth-middleware')

// Require the configured Multer instance
const upload = require('./config/multerConfig')

// Error handling
const { handlePsqlErrors } = require('./error-handling/PSQL-errors')
const { handleCustomErrors } = require('./error-handling/custom-errors')
const { handleMulterErrors } = require('./error-handling/multer-errors')
const { getGallery } = require('./controllers/photos/gallery')

// Routes
app.post('/api/users/register', postUser)
app.post('/api/users/login', findUserByUsername)
app.post('/api/photos/upload', verifyToken, upload.single('photo'), postPhoto)
app.get('/api/photos/gallery', verifyToken, getGallery)

// Error handlers
app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleMulterErrors)

module.exports = app
