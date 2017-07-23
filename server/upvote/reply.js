const {ObjectId} = require('mongodb');

function userVoted(reply, userID) {
    return reply.votes.some(vote => vote.userID == userID)
}

module.exports = (req, res, next) => {
    
    const collection        = req.db.collection("challenges")
    const challengeId       = req.params.challengeId
    const replyId           = req.params.id
    const nowMs             = new Date().getTime()
    var userVotedFlag = false
    var foundFlag = false
    console.log("req", req.params)
    

    const newVote = {
                _id: ObjectId(),
                userID: req.body["UserID"],
                createdAt: nowMs
            }

    collection.findOne(
        // { _id: ObjectId(challengeId) },
        { "replies._id":  ObjectId(replyId) },
        function(err, challenge) {
            if (err) {
                console.log("err")
                return res.json({success: 0, err})
            }
            console.log("challID", challenge.replies)
            // console.log("replyID", ObjectId(replyId))
            
            challenge.replies.every(reply => {
                
                //don't use objectID since we converted to an array
                if (reply._id == replyId) {
                    
                    console.log("FOUND?", reply)
                    
                    foundFlag = true
                    
                    if (userVoted(reply, newVote.userID) || newVote.userID == undefined) {
                        console.log("user voted already")
                        userVotedFlag = true
                        return false
                    }
                    
                    console.log("create upvote reply", req.body)
                    
                    reply.votes.push(newVote)

                    if (reply.votes.length > 2) {
                        reply.completed = true
                    }

                    //exit loop early
                    return false

                }
            })

            console.log("USERVORE FLAG", userVotedFlag)


            if (userVotedFlag) {
                res.json({success: 0, err: "Already exists"})
            } else if (!foundFlag) {
                console.log("never found")
                res.json({success: 0, err: "Could not find in db"})
            } else {

                collection.save(challenge, function(err, r) {
                    req.assert.equal(null, err);
                    if (err) {
                        res.json({success: 0, err})
                    }

                    console.log("created vote! for reply")
                    // req.assert.equal(1, r.matchedCount);
                    // req.assert.equal(1, r.modifiedCount);
                    res.json({success: 1, newVote: newVote})
                })
            }

            

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