module.exports = (req, res, next) => {

    var db = req.db
    var collection = db.collection('challenges')
    
    collection.find({}).sort([['votes.length', -1]]).toArray(function(err, docs) {
        req.assert.equal(err, null);
        res.json({challenges: docs})
    })
}