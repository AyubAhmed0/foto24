// models/photos.js
const db = require('../../db')

function fetchGallery ({ limit, offset }) {
  const query = `
    SELECT p.photo_id, p.url, p.description, u.username
    FROM photos p
    JOIN users u ON u."userId" = p."userId"
    ORDER BY p.created_at DESC
    LIMIT $1 OFFSET $2;
  `
  const values = [limit, offset]
  return db.query(query, values)
}

module.exports = { fetchGallery }
