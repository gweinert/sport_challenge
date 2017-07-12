var cloud = require('../GoogleCloudService')
var {ObjectId} = require('mongodb')

const challengeImageUpload = (req, res, next) => {
    console.log("replyMedia")
    cloud.upload(req, res, next)
}

const createChallenge = (req, res, next) => {
    console.log("Create Reply")
    console.log(req.body)
    
    const db = req.db
    const dateMs = new Date().getTime()
    var file = ""
    if(req.file) {
        file = req.file.cloudStoragePublicUrl
    }
    
     db.collection('challenges')
        .updateOne(
            { _id : ObjectId(req.body["ChallengeID"]) }, 
            { $addToSet: { replies: {
                _id: ObjectId(),
                userID: req.user._id,
                votes: [],
                file: file,
                completed: false,
                dateCreated: dateMs
            } } }, 
        function(err, r) {
            req.assert.equal(null, err);
            req.assert.equal(1, r.matchedCount);
            req.assert.equal(1, r.modifiedCount);
            console.log(`Updated the document with the field _id equal to ${req.body["ChallengeID"]}`);
        }
    )
}

module.exports = [ challengeImageUpload, createChallenge ]