const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()

aws.config.update({
    secretAccessKey: process.env.SECRET_K,
    accessKeyId: process.env.ACCESS_K_ID,
    region: process.env.REGION
})

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: process.env.ACL,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname )
    }
  })
})

module.exports = upload