const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: '6phyuadVSMhgamyLYprfMWCo4ps6ECHYm5NaLoTI',
    accessKeyId: 'AKIA2I4SDP5OGXXN7GWX',
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