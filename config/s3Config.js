const { S3Client } = require('@aws-sdk/client-s3')

const s3Client = new S3Client({
  region: process.env.S3_UPLOAD_REGION,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET
  }
})

module.exports = s3Client
