const { fetchGallery } = require('../../models/photos/gallery')

function getGallery (req, res, next) {
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const offset = (page - 1) * limit

  if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
    return res.status(400).send({ msg: 'Bad Request' })
  }
  fetchGallery({ limit, offset })
    .then((photos) => {
      res.status(200).send({ photos: photos.rows })
    })
    .catch(next)
}

module.exports = { getGallery }
