const { h } = require('hyperapp')

const upvoteButton = ({state, actions, type, id, subId}) => {
    if(state.user.loggedIn) {
        return (
            <div 
                class="upvote"
                onclick={(e) => {
                    e.stopPropagation();
                    actions.upvote({
                        type: type, 
                        id: id,
                        subId: subId
                    })
                }}
            />
        )
    } else return ""
}

module.exports = upvoteButton