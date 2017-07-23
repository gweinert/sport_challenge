var {ObjectId} = require('mongodb');
var cloud = require('../GoogleCloudService')


//removes main image and all replies
function removeAllImages(challenge) {
    var files = []

    if (challenge.image) {
        files.push(challenge.image)
    }
    
    challenge.replies.forEach(reply => {
        if(reply.file) {
            files.push(reply.file)
        }
    })
    cloud.remove(files)
}

var removeChallenge = (req, res, next) => {

    const db = req.db
    const collection = db.collection('challenges')
    const { id } = req.params
    const { UserID } = req.body

    console.log("params", req.params)
    console.log("body", req.body)

    collection.findOne(
        { _id: ObjectId(id), userID: UserID}, 
        
        function(err, challenge) {

            if (err || challenge == null) {
                return res.json({success: 0, err})
            }

            console.log("challenge to be removed", challenge)

            collection.deleteOne(
                { _id : ObjectId(id), userID: UserID }, 
                function(err, result) {
                    req.assert.equal(err, null)
                    req.assert.equal(1, result.result.n)
                    console.log("Removed the document with the field id equal to " + id);
                  
                    removeAllImages(challenge)
                  
                    res.json({success: 1, id: id, resource: 'challenge'})
                }
            ); 
    
        }
    )
       
}

module.exports = removeChallenge