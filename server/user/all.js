module.exports = (req, res, next) => {

    var db = req.db
    var collection = db.collection('users')
    
    collection.find({}).toArray(function(err, docs) {
        req.assert.equal(err, null);
        res.json({users: docs})
    })
}