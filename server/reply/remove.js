const {ObjectId} = require('mongodb');
const cloud = require('../GoogleCloudService')


//removes main image and all replies
function removeReplyImage(reply) {
    const { file } = reply

    if (file) {
        cloud.remove(file)
    }
}

const removeReply = module.exports = (req, res, next) => {

    const db = req.db
    const collection = db.collection('challenges')
    const { id } = req.params

    collection.findOne(
        // { _id: ObjectId(challengeId), userID: req.user._id}, 
        { "replies._id": ObjectId(id), "replies.userID": req.body["UserID"]},
        
        function(err, challenge) {

            if (err) {
                return res.json({success: 0, err: "Does not exist"})
            }

            const updatedReplies = challenge.replies.filter(reply => reply._id != id)
            challenge.replies = updatedReplies

            collection.save(challenge, function(err, r) {
                req.assert.equal(null, err);
                if (err) {
                    res.json({success: 0, err})
                }

                console.log("removed reply")
                res.json({success: 1, id, resource: 'reply', challengeID: challenge._id})
            })
        }
    )      
}