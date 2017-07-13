const { h } = require('hyperapp')

const upvoteButton = ({state, actions, type, id, subId, className}) => {
    if(state.user.loggedIn) {
        const checkmarkColor = userVoted(state, id) ? `${className}` : ""

        return (
            <div 
                class={`upvote ${checkmarkColor}`}
                onclick={(e) => {
                    e.stopPropagation();
                    actions.upvote({
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

function userVoted(state, id) {
    var voted = false
  
    state.data.challenges
        .filter(challenge => challenge._id == id)
        .forEach(challenge => {
            challenge.replies.forEach(reply => {
                voted = reply.votes.some(vote => vote.userID == state.user.profile._id)
                if(voted) { return voted }
            })
        })
    console.log("voted?", voted)
    return voted
    
}

module.exports = upvoteButton