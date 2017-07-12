const { h } = require('hyperapp')

const CreateReply = ({state, actions}) => {
    const challengeIndex = state.router.params.index
    
    if(state.data.challenges){
        const challenge = state.data.challenges[challengeIndex]
    
        return (
            <div>
                <h1>Create Reply for {challenge.name}</h1>
                <form action="http://localhost:3000/reply/" method="POST">
                    <label for="videoReply">Reply: (pic or video)</label>            
                    <input type="file" name="Reply" />
                    <input type="hidden" name="ChallengeID" value={challenge._id} />
                    <button 
                        type="button"
                        onclick={(e) => actions.submitForm(e)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

module.exports = CreateReply