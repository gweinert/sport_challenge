// module.exports = (req, res, next) => {

//     var db = req.db
//     var users = db.collection('users')
//     var challenges = db.collection('challenges') 

//     users.find({}).toArray( (err, docs) => {
//         users = docs

//         var leaders = users.map( user => {
//             var totalPoints = 0;
            
//             challenges.find({}).toArray( (err, docs) => {
                
//                 docs.forEach(challenge => {
//                     challenge.replies.forEach(reply => {
//                         if(reply.userID == user._id) {
//                             if(reply.completed) {
//                                 totalPoints += challenge.votes.length
//                             }
//                         }
//                     })
//                 })
//             })
            
            
//             return {
//                 displayName: user.displayName,
//                 totalPoints
//             }
//         }).sort( (a, b) => a.totalPoints - b.totalPoints)

//         res.json({success: true, leaders: leaders})
//     })
    

//     // users.find({}).
// }