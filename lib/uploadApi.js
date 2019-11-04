// require AWS SDK
const AWS = require('aws-sdk')
// create s3 object instance
AWS.config.update({ region: 'us-east-1' })
// configure .env
require('dotenv').config()
// require mime types package
let mime = require('mime-types')
const s3 = new AWS.S3()
// define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME
console.log(bucketName)

module.exports = function () {
  // Create params object for s3 upload
  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileData,
    ContentType: mime.lookup(filePath),
    ACL: 'public-read'
  }

  // Upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err

    console.log(s3Data)
  })
}
