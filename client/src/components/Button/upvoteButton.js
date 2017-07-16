const { h } = require('hyperapp')

const upvoteButton = ({state, actions, type, id, subId, className}) => {
    if(state.user.loggedIn) {
        const checkmarkColor = userVoted(state, type, id) ? `${className}` : ""

        return (
            <div 
                class={`upvote ${checkmarkColor}`}
                onclick={(e) => {
                    e.stopPropagation();
                    actions.upvote.create({
                        type: type, 
                        id: id,
                        subId: subId
                    })
                }}
            >
                <div class="checkmark"></div>
            </div>
        )
    } else return ""
}

function userVoted(state, type, id) {
    var voted = false
  
    state.data.challenges
        .filter(challenge => challenge._id == id)
        .every(challenge => {
            if(type == "challenge") {
                voted = challenge.votes.some(vote => vote.userID == state.user.profile._id)
                if(voted) return false
            } else {
                challenge.replies.forEach(reply => {
                    voted = reply.votes.some(vote => vote.userID == state.user.profile._id)
                    if(voted) return false
                })
            }

        })
    return voted
    
}

module.exports = upvoteButton