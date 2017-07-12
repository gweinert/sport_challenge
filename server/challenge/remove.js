var {ObjectId} = require('mongodb');

var removeChallenge = (req, res, next) => {

    const db = req.db
    const collection = db.collection('challenges')
    const { challengeId } = req.params

    collection.deleteOne({ _id : ObjectId(challengeId) }, function(err, result) {
        req.assert.equal(err, null)
        req.assert.equal(1, result.result.n)
        console.log("Removed the document with the field id equal to " + challengeId);
        res.json({success: 1, id: challengeId})
    });    
}

module.exports = removeChallenge