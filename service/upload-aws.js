const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: '07us6h6qZ//PQAsZbR8xiu43hQ7hXoCVJwYXFuRT',
    accessKeyId: 'AKIAIZQSIKUW6XV5P4BQ',
    region: 'us-east-2'
})

const s3 = new aws.S3()
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'proyecto-denuncia',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.originalname});
    },
    key: function (req, file, cb) {
      cb(null, file.mimetype)
    }
  })
})

module.exports = upload