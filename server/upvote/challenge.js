const {ObjectId} = require('mongodb');

function getVotesPerHour(vote) {
    const numberOfVotes = vote.number
    const timeOfLastVoteMs = vote.timeOfVoteMs
    const nowMs = new Date().getTime()
    const hourInMs = 3600000
    const anHour = 1

    const voteTimeDiffHour = (nowMs - timeOfLastVoteMs) / hourInMs
    const votesPerHour = ( anHour -  voteTimeDiffHour ) * (numberOfVotes + 1)
    
    return votesPerHour

}


module.exports = (req, res, next) => {
    
    const dateMs = new Date().getTime()
    const db = req.db
    var dbCol

    const collection = db.collection("challenges")
    const nowMs = new Date().getTime()
    var newVote = {
        _id: ObjectId(),
        userID: req.user._id,
        createdAt: nowMs
    }

    collection.findOne({ _id: ObjectId(req.params.id)})
        .then((item, err) => {
            req.assert.equal(err, null);


            // var votesPerHour = getVotesPerHour(item.votes)
            

             collection.updateOne({ _id : ObjectId(item._id) }, 
                    // { $set: {
                    //             votes: {
                    //                 number: item.votes.number + 1,
                    //                 timeOfVoteMs: nowMs,
                    //                 votesPerHour: votesPerHour
                    //             } 
                    //         } 
                    // },
                { $addToSet: { votes: newVote } },
                
                function(err, r) {
                    req.assert.equal(null, err);
                    req.assert.equal(1, r.matchedCount);
                    req.assert.equal(1, r.modifiedCount);
                    console.log(`Updated the document with the field vote to ${item.votes + 1}`);
                    res.json({
                        success: 1, 
                        newVote: newVote
                    })
                }
            )
        })
}