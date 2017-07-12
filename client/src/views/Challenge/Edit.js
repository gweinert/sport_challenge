const { h } = require('hyperapp')

const EditChallenge = ({state, actions}) => {
    const challengeIndex = state.router.params.id
    console.log("edit")
    if(state.data.challenges){
        const challenge = state.data.challenges[challengeIndex]
        
        return(
            <div>
                <div>Edit Challenge</div>
                <form action="http://localhost:3000/challenges/edit" method="POST">
                    <div>
                        <label for="Name">Challenge Name:</label>
                        <input type="text" name="Name" id="Name" value={challenge.name}/>
                    </div>
                    <div>
                        <label for="Description">Challenge Description:</label>
                        <textarea name="Description" id="Description">{challenge.description}</textarea>
                    </div>
                    <div>
                        <label for="Username">Username:</label>
                        <input type="text" name="Username" id="Username" value={challenge.username}/>
                    </div>
                    <div>
                        <div
                            class="challenge-image" 
                            style={{backgroundImage: `url("${challenge.images}")`}}
                        />
                    </div>
                    <input type="hidden" name="Longitude" value={challenge.location.lat} />
                    <input type="hidden" name="Latitude" value={challenge.location.lat} /> 
                    <input type="hidden" name="ChallengeID" id="ChallengeID" value={challenge._id} />
                    <button onclick={(e) => actions.submitForm(e)} type="button">Submit</button>
                </form>
            </div>
        )
    } else return <div/>
}

module.exports = EditChallenge