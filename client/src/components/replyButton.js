const { h } = require('hyperapp')

const replyButton = ({state, actions, challengeIndex}) => {
    if(state.user.loggedIn) {
        return (
            <h4
                onclick={() => actions.router.go(`/reply/create/${challengeIndex}`)}
            >
                Reply
        </h4>
        )
    } else return ""
}

module.exports = replyButton

