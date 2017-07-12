var cloud = require('../GoogleCloudService')

const challengeImageUpload = (req, res, next) => {
    console.log("challengImage")
    cloud.upload(req, res, next)
}

const createChallenge = (req, res, next) => {
    console.log("Create Challenge")
    console.log(req.body)
    
    const db = req.db
    const dateMs = new Date().getTime()
    var image = ""
    if(req.file) {
        image = req.file.cloudStoragePublicUrl
    }
    
    db.collection('challenges').insertOne(
        {
            name: req.body["Name"],
            description: req.body["Description"],
            category: req.body["Category"],
            userID: req.user._id,
            username: req.user.firstName,
            // votes: {
            //     number: 0,
            //     timeOfVoteMs: dateMs, //initial vote cant be zero
            //     votesPerHour: 0
            // },
            votes: [],
            images: image,
            location: { lat: req.body["Latitude"], long: req.body["Longitude"]},
            locationName: req.body["Location"],
            replies: [],
            createdAt: dateMs
        }
    )

}

module.exports = [ challengeImageUpload, createChallenge ]