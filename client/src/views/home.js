const { h }     = require('hyperapp')
const Button    = require('../components/button')
const List      = require('./Challenge/List')

const Home = ({state, actions}) => {
    console.log("home stata", state)
    return(
        <div>
            <div>Home</div>
            
            {state.user.loggedIn ? "" : <a href="https://www.facebook.com/v2.9/dialog/oauth?client_id=335734803514193&redirect_uri=http://localhost:8080/&response_type=token">
                Facebook
            </a>}
            <Button
                actions={actions}
                loggedIn={state.user.loggedIn}
                type={"button"}
                to={`/challenge-create`}
                >Create Challenge</Button>
            <List state={state} actions={actions} />
        </div>
    )
}



module.exports = Home