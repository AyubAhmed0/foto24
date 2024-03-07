const jwt = require('jsonwebtoken')

function verifyToken (req, res, next) {
  // Get the token from the authorisation header
  const bearerHeader = req.headers.authorization
  if (!bearerHeader) {
    return res.status(401).send({ message: 'Authorisation required' })
  }

  const token = bearerHeader.split(' ')[1]

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: 'Token is invalid or expired' })
    }
    // Token is valid
    req.user = decoded // Add the decoded token to the request so it can be used in the route handler
    next()
  })
}

module.exports = { verifyToken }
