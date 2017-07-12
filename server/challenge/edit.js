// var image = require('../image')

// const challengeImageUpload = (req, res, next) => {
//     console.log("challengImage")
//     image.upload(req, res, next)
// }
var {ObjectId} = require('mongodb');

const editChallenge = (req, res, next) => {
    console.log("Edit Challenge")
    console.log(req.body)
    var db = req.db
    
    // var images = req.files.map(file => {
    //     return file.cloudStoragePublicUrl
    // })
    // var image = req.files[0].cloudStoragePublicUrl

    db.collection('challenges')
        .updateOne({ _id : ObjectId(req.body["ChallengeID"]) }, 
            { $set: {
                        name: req.body["Name"],
                        description: req.body["Description"],
                        username: req.body["Username"]
                    } 
            }, 
        function(err, r) {
            req.assert.equal(null, err);
            req.assert.equal(1, r.matchedCount);
            req.assert.equal(1, r.modifiedCount);
            console.log(`Updated the document with the field _id equal to ${req.body["ChallengeID"]}`);
        }
    )
}

module.exports = editChallenge

// module.exports = [ challengeImageUpload, createChallenge ]