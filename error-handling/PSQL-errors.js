const handlePsqlErrors = (err, req, res, next) => {
  if ((err.code === '23505')) {
    res.status(400).send({ msg: 'Bad request' })
  } else {
    next(err)
  }
}

module.exports = { handlePsqlErrors }
