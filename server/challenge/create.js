var cloud = require('../GoogleCloudService')
var {ObjectId} = require('mongodb')

const challengeImageUpload = (req, res, next) => {
    console.log("challengImage")
    cloud.upload(req, res, next)
}

const createChallenge = (req, res, next) => {
    console.log("Create Challenge", req.file)
    console.log(req.body)
    
    const db = req.db
    const dateMs = new Date().getTime()
    var image = ""
    if(req.file) {
        image = req.file.cloudStoragePublicUrl
    }

    var newChallenge = {
        _id: ObjectId(),
        name: req.body["Name"],
        description: req.body["Description"],
        category: req.body["Category"],
        userID: req.body["UserID"],
        username: req.body["Username"],
        votes: [],
        image: image,
        location: { lat: req.body["Latitude"], long: req.body["Longitude"]},
        locationName: req.body["LocationName"],
        replies: [],
        theme: Math.floor((Math.random() * 10) + 1),
        createdAt: dateMs
    }
    
    db.collection('challenges').insertOne(newChallenge)
        .then(({err, r}) => {
            req.assert.equal(null, err)
            
            if(err != null) { res.send({success: 0}) }
            
            res.send({success: 1, challenge: newChallenge})
        })

}

module.exports = [ challengeImageUpload, createChallenge ]