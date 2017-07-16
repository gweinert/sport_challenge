export default {
    
    create: (state, actions, {type, id, subId = ""}) => {
        
        //if vote doesnt exist in challenges/replies
        const userVoted = userDidVote(state, type)
        
        // if(!userVoted) {

            fetch(`http://localhost:3000/upvote/${type}/${id}/${subId}`,{
                    credentials: 'include'  
                })   
            .then(res => res.json())
            .then(( res ) => {
                actions.upvote.onCreateSuccess({res: res, type: type, id: id, subId: subId});
            })
        // }
    },

    onCreateSuccess: (state, actions, {res, type, id, subId}) => {
        if(res.success) {
            
            const { newVote } = res
            var challenges = state.data.challenges.slice()
            
            challenges = addNewVoteToChallengeOrReply(challenges, newVote, id, type, subId)
            
            return ({challenges})
        
        }
    },
}

function addNewVoteToChallengeOrReply(challenges, newVote, id, type, subId) {
    challenges.forEach(challenge => {
            
        if(challenge._id == id) {   
            
            if(type == "challenge") {
                
                challenge.votes.push(newVote)
            
            } else if(type == "reply") {
                
                challenge.replies = challenge.replies.map(reply => {
                
                    if(reply._id == subId){
                        reply.votes.push(newVote)
                    }
                    
                    return reply
            
                }).sort((a, b) => b.votes.length - a.votes.length )
            
            }
        }
    
    })

    return challenges
}

function userDidVote(state, type) {
  var voted = false

  state.data.challenges.every(challenge => {
    
    voted = challenge.votes.some(vote => vote.userID == state.user.profile._id)

    if(voted && type == "challenge") return false
    
    if(type == "reply") {
    
      challenge.replies.forEach(reply => {
        
        voted = reply.votes.some(vote => vote.userID == state.user.profile._id)
        
        if(voted) return false
      
        })
    }
  
  })

  return voted
}
