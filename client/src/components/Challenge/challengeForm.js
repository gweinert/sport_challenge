const { h }     = require('hyperapp')
const Select    = require('../Form/select')
const Textarea  = require('../Form/textarea')

const challengeForm = module.exports = ({state, actions, edit}) => {
    
    const challengeIndex = state.router.params.id
    var method = "POST"
    var action="http://localhost:3000/challenges/"
    var challenge = {
        name: "",
        description: "",
        location: {
            lat: "",
            long: ""
        },
        image: "",
        category: "",
        locationName: ""
    }
    var challengeFormTitle = "Create a Challenge!"
    
    if( (challengeIndex && state.data.challenges)) { // we are editing
        challenge = state.data.challenges[challengeIndex]
        challengeFormTitle = "Edit"
        action="http://localhost:3000/challenges/edit"
    }

    console.log("challegne", challenge)
    
    return (
        <div class="challenge-form form" 
            /*oncreate={() => {actions.getLocation()}} */
        >

            <h1>{challengeFormTitle}</h1>
            <form action={action} method={method}>
                <div>
                    <input type="text" name="Name" id="Name" value={challenge.name} placeholder="Title" />
                </div>
                <Textarea actions={actions} name="Description" value={challenge.description} placeholder={"Description"}></Textarea>
                <div>
                    <div class="select"> 
                        <select name="Category" value={challenge.category || "Category"}>
                            <option selected disabled value="Category">Category</option>
                            <option value="Snowboard">Snowboard</option>
                            <option value="Ski">Ski</option>
                            <option value="Skateboard">Skateboard</option>
                            <option value="Surf">Surf</option>                        
                        </select>
                    </div>
                </div>
                <div>
                    {challenge.image ? 
                        <img width="50" height="50" src={challenge.image} /> 
                        : 
                        <input type="file" name="Image" id="Image" placeholder={"Image"} /> 
                    }
                </div>
                <div>
                    <Select 
                        state={state} 
                        actions={actions} 
                        name={"LocationName"} 
                        options={state.nearbyGoogleLocations} 
                        value={challenge.locationName || "LocationName"} 
                    />
                </div>
                <input type="hidden" name="Longitude" value={challenge.location.lat || state.location.lat} />
                <input type="hidden" name="Latitude" value={challenge.location.long || state.location.long} />
                <input type="hidden" name="ChallengeID" value={challenge._id || ""} />               
                <button onclick={(e) => actions.form.submit(e)} type="button">Submit</button>
            </form>
        </div>
    )
}