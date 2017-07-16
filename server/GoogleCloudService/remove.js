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

module.exports = (files) => {
    // sendUploadToGCS (req, res, next)
    files.forEach(filepath => {
        
        const filename = filepath.split("/").pop()
        
        bucket
        .file(filename)
        .delete()
        .then(() => {
            console.log(`gs://${CLOUD_BUCKET}/${filename} deleted.`);
        })
        .catch((err) => {
            console.error('ERROR:', err);
        })
    
})
}