const { insertPhoto } = require('../../models/photos/uploads')

function postPhoto (req, res, next) {
  if (!req.file) {
    return res.status(400).json({ msg: 'Photo upload is required' })
  }

  const { path: filePath } = req.file
  const { description = '' } = req.body
  const { userId } = req.user

  insertPhoto({ userId, filePath, description })
    .then(() => {
      res.status(201).json({ msg: 'Photo uploaded successfully' })
    })
    .catch(next)
}
module.exports = { postPhoto }
