const handleMulterErrors = (err, req, res, next) => {
  if (err && err.message === 'Unsupported file format') {
    return res.status(400).json({ msg: err.message })
  } else {
    next(err)
  }
}

module.exports = { handleMulterErrors }
