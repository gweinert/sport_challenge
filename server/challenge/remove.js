var {ObjectId} = require('mongodb');
var cloud = require('../GoogleCloudService')


//removes main image and all replies
function removeAllImages(challenge) {
    var files = []
    files.push(challenge.image)
    challenge.replies.forEach(reply => {
        files.push(reply.file)
    })
    cloud.remove(files)
}

var removeChallenge = (req, res, next) => {

    const db = req.db
    const collection = db.collection('challenges')
    const { challengeId } = req.params

    collection.findOne(
        { _id: ObjectId(challengeId), userID: req.user._id}, 
        
        function(err, challenge) {

            collection.deleteOne({ _id : ObjectId(challengeId) }, function(err, result) {
                req.assert.equal(err, null)
                req.assert.equal(1, result.result.n)
                console.log("Removed the document with the field id equal to " + challengeId);
                removeAllImages(challenge)
                res.json({success: 1, id: challengeId})
            }); 
    
        }
    )
       
}

module.exports = removeChallenge