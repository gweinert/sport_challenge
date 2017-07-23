var cloud = require('../GoogleCloudService')
var {ObjectId} = require('mongodb')

const replyImageUpload = (req, res, next) => {
    console.log("replyMedia")
    cloud.upload(req, res, next)
}

const createReply = (req, res, next) => {
    console.log("Create Reply")
    console.log(req.body)
    
    const db = req.db
    const dateMs = new Date().getTime()
    var file = ""
    if(req.file) {
        file = req.file.cloudStoragePublicUrl
    }

    var newReply = {
         _id: ObjectId(),
        userID: req.body["UserID"],
        votes: [],
        file: file,
        completed: false,
        dateCreated: dateMs
    }
    
     db.collection('challenges')
        .updateOne(
            { _id : ObjectId(req.body["ChallengeID"]) }, 
            { $addToSet: { replies: newReply } }, 
        function(err, r) {
            req.assert.equal(null, err);
            req.assert.equal(1, r.matchedCount);
            req.assert.equal(1, r.modifiedCount);
            if(err) res.json({success: 0, error: "database error on new reply"})
            console.log(`Updated the document with the field _id equal to ${req.body["ChallengeID"]}`);
            res.json({
                success: 1, 
                reply: newReply, 
                challenge: { _id: req.body["ChallengeID"]}
            })
        }
    )
}

module.exports = [ replyImageUpload, createReply ]