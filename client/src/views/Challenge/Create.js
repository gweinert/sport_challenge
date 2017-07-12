const { h } = require('hyperapp')

const CreateChallenge = ({state, actions}) => {
    console.log("create chal", state)
    return(
        <div oncreate={() => actions.getLocation()}>
            <div>Create Challenge</div>
            <form action="http://localhost:3000/challenges/" method="POST">
                <div>
                    <label for="Name">Challenge Name:</label>
                    <input type="text" name="Name" id="Name"/>
                </div>
                <div>
                    <label for="Description">Challenge Description:</label>
                    <textarea name="Description" id="Description"></textarea>
                </div>
                <div>
                    <label for="Category">Category:</label>
                    <select name="Category">
                        <option value="Snowboard">Snowboard</option>
                        <option value="Ski">Ski</option>
                        <option value="Skateboard">Skateboard</option>
                        <option value="Surf">Surf</option>                        
                    </select>
                </div>
                <div>
                    <label for="Image">Image:</label>
                    <input type="file" name="Image" id="Image" />
                </div>
                <div>
                    <label for="Location">Location</label>
                    <LocationOptionList state={state} actions={actions}/>
                </div>
                <input type="hidden" name="Longitude" value={state.location.lat} />
                <input type="hidden" name="Latitude" value={state.location.lat} />                
                <button onclick={(e) => actions.submitForm(e)} type="button">Submit</button>
            </form>
        </div>
    )
}

const LocationOptionList = ({state, actions}) => {
    return (
        <select name="Location">
            { state.nearbyGoogleLocations.length > 0 ? 
                state.nearbyGoogleLocations.map(location => {
                    return <option value={location.name}>{location.name}</option>
                })
            : null }
        </select>
    )
}

module.exports = CreateChallenge