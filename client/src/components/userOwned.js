//a button only assigned to the person who created the thing to edit/delete
const { h } = require('hyperapp')

const userOwned = ({state, actions, item}, children) => {
    //there can only be a few things to edit. a challenge, a reply, and a profile

    //
    var isUser = false
    if(state.user.loggedIn && (state.data && state.data.challenges) ) {
        //item is challenge
        isUser = state.data.challenges.some(challenge => {
            return challenge.userID == state.user.profile._id
        })
    }

    if(isUser) {
        return children
    } else return <div>404</div>

}

module.exports = userOwned