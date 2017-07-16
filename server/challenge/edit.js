// var image = require('../image')

// const challengeImageUpload = (req, res, next) => {
//     console.log("challengImage")
//     image.upload(req, res, next)
// }
var {ObjectId} = require('mongodb');

const editChallenge = module.exports = (req, res, next) => {
    console.log("Edit Challenge")
    console.log(req.body)
    var db = req.db
    
    // var images = req.files.map(file => {
    //     return file.cloudStoragePublicUrl
    // })
    // var image = req.files[0].cloudStoragePublicUrl

    const challenges = db.collection('challenges')
    
    var  updatedChallenge = {
        _id : ObjectId(req.body["ChallengeID"]),
        name: req.body["Name"],
        description: req.body["Description"],
        category: req.body["Category"],
        locationName: req.body["LocationName"]
    }

    challenges.updateOne({ _id : updatedChallenge._id, userID: req.user._id }, 
        { $set: {
                    name: updatedChallenge.name,
                    description: updatedChallenge.description,
                    category: updatedChallenge.category,
                    locationName: updatedChallenge.locationName,
                } 
        }, 
        function(err, r) {
            req.assert.equal(null, err);
            req.assert.equal(1, r.matchedCount);
            req.assert.equal(1, r.modifiedCount);
            
            if(err) { res.json({success: 0, error: "Database error"})}
            
            res.json({success: 1, updatedChallenge})
            console.log(`Updated the document with the field _id equal to ${req.body["ChallengeID"]}`);
        }
    )
}