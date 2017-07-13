const { h } = require('hyperapp')

const replyButton = ({state, actions, challenge}) => {
    if(state.user.loggedIn) {
        return (
            <div class="button reply-button">
                <h4>
                    Reply
                </h4>
                <form action="http://localhost:3000/reply/" method="POST">
                    <input type="file" name="Reply" onchange={(e) => actions.submitForm(e)} />
                    <input type="hidden" name="ChallengeID" value={challenge._id} />
                </form>
            </div>
        )
    } else return ""
}

module.exports = replyButton

