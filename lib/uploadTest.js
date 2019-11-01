// require file system
const fs = require('fs')
// require AWS SDK
const AWS = require('aws-sdk')
// create s3 object instance
AWS.config.update({ region: 'us-east-1' })
// configure .env
require('dotenv').config()

const s3 = new AWS.S3()
console.log(s3)

// access commandline arguments to get file path
// process.argv[2] is the third argument in the command line
const filePath = process.argv[2]
// define bucket based on environment variable
const bucketName = process.env.BUCKET_NAME
console.log(bucketName)

// reading the file first
fs.readFile(filePath, (err, fileData) => {
  if (err) throw err

  // Create params object for s3 upload
  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileData,
    ACL: 'public-read'
  }

  // Upload to s3
  s3.upload(params, (err, s3Data) => {
    if (err) throw err

    console.log(s3Data)
  })
})
