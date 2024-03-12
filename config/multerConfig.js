const multer = require('multer')
const multerS3 = require('multer-s3')
const s3Client = require('./s3Config')

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: process.env.S3_UPLOAD_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = file.originalname.split('.').pop()
      cb(null, `photos/${uniqueSuffix}.${extension}`)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE
  }),
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Unsupported file format'), false)
    }
  }
})

module.exports = upload
