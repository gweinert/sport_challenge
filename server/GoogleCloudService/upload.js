var fs = require('fs')
var storage = require('@google-cloud/storage')
const CLOUD_BUCKET = "snow_challenge"

// Authenticating on a per-API-basis. You don't need to do this if you auth on a
// global basis (see Authentication section above).

var gcs = storage({
  projectId: 'snowchallenge-173120',
  keyFilename: './service_account_key.json'
})

// Reference an existing bucket.
var bucket = gcs.bucket(CLOUD_BUCKET)

function sendUploadToGCS (req, res, next) {
  console.log("sendUPloade with file...", req.file)
  var localFile = req.file;
  if (!localFile) {
    return next();
  }

  console.log("localFile", localFile)

  const gcsname = Date.now() + localFile.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: localFile.mimetype
    }
  });

  stream.on('error', (err) => {
    localFile.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    file.makePublic().then(() => {
      localFile.cloudStorageObject = gcsname;
      localFile.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    })
  });

  stream.end(localFile.buffer);
}

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

module.exports = (req, res, next) => {
    sendUploadToGCS (req, res, next)
}