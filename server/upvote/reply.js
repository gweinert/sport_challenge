const {ObjectId} = require('mongodb');

module.exports = (req, res, next) => {
    
    const dateMs = new Date().getTime()
    const db = req.db
    const challengeId = req.params.challengeId
    const replyId = req.params.id
    console.log("req", req.params)
    var completedChallenge = false
    
    const collection = db.collection("challenges")
    // const users = db.collection("users")

    var nowMs = new Date().getTime()
    var newVote = {
                _id: ObjectId(),
                userID: req.user._id,
                createdAt: nowMs
            }

    collection.findOne(
        { _id: ObjectId(challengeId) },
        function(err, challenge) {
            
            challenge.replies.forEach(reply => {
                if(reply._id == replyId) {
                    reply.votes.push(newVote)

                    if(reply.votes.length > 2) {
                        reply.completed = true
                    }
                }
            })

            console.log("challenge", challenge)

            collection.save(challenge, function(err, r) {
                req.assert.equal(null, err);
                // req.assert.equal(1, r.matchedCount);
                // req.assert.equal(1, r.modifiedCount);
                res.send({success: 1, newVote: newVote})
            })

            // collection.find({
            //     replies: {
            //         $elemMatch: {
            //             _id: ObjectId(replyId)
            //         }
            //     }
            // }).toArray(function(err, reply) {
            //         console.log("replyId", replyId)
            //         console.log("reply!", reply)
            //         if((reply.votes.length + 1) > 2) {
            //             completedChallenge = true
            //         }
            //         collection.updateOne({
            //             replies: {
            //                 $elemMatch: {
            //                     _id: replyId
            //                 }
            //             }
            //         },
            //         {    
            //             $addToSet: { votes: {
            //                             _id: ObjectId(),
            //                             userID: req.user._id
            //                         } }, 
            //                 $set: { "replies.$.completed": completedChallenge }
            //         },
            //         function(err, r) {
            //             // console.log("REPLY", reply)
            //             req.assert.equal(null, err);

            //             res.json(
            //                 {success: 1, completedChallenge: completedChallenge}
            //             )
            //         })
            // })
        })
}
            

                    // completedChallenge = true

                // collection.updateOne(
                //     { _id: ObjectId(challengeId), "replies._id": ObjectId(replyId)},
                //     { 
                //         $addToSet: { votes: {
                //             _id: ObjectId(),
                //             userID: req.user._id
                //         } }, 
                //         $set: { "replies.$.completed": completedChallenge } 
                //     },
                    
                //     function (err, r) {
                //         req.assert.equal(null, err);
                //         req.assert.equal(1, r.matchedCount);
                //         req.assert.equal(1, r.modifiedCount);
                //         console.log(`Updated the document with the field reply vote to ${r}`);

                //         // users.updateOne(
                //         //     {_id: reply.userID},
                //         //     {$inc: { totalPoints: completedChallenge ? }}
                //         //     function(err, r) {

                //         //     }
                        
                //         res.json(
                //             {success: 1, completedChallenge: completedChallenge}
                //         )
                //     }
                // )
            // }
        // })

    
// }