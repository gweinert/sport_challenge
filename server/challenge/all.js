module.exports = (req, res, next) => {

    var db = req.db
    var collection = db.collection('challenges')
    
    collection.find({}).toArray(function(err, docs) {
        req.assert.equal(err, null);
        res.json({challenges: docs})
    })
}