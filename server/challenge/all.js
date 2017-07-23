module.exports = (req, res, next) => {

    var db = req.db
    var collection = db.collection('challenges')
    
    collection.find({}).toArray(function(err, docs) {
        req.assert.equal(err, null);
        console.log("hit all")
        res.json({challenges: docs})
    })
}