//a button only assigned to the person who created the thing to edit/delete
const { h } = require('hyperapp')

const userButton = ({state, actions, onclick, item}, children) => {
    //there can only be a few things to edit. a challenge, a reply, and a profile

    //
    var canEdit = false
    if(state.user.loggedIn && (state.data && state.data.challenges) ) {
        //item is challenge
        canEdit = state.data.challenges.some(challenge => {
            return challenge.userID == state.user.profile._id
        })
    }

    if(canEdit) {
        return(
            <p onclick={onclick}>{children}</p>
        )
    } else return ""

}

module.exports = userButton