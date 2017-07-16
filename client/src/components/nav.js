const { h }  = require('hyperapp')
const Button = require('./Button/button')
const Link   = require('./link')


const Nav = module.exports = ({state, actions}) => {
    return (
        <nav role="navigation">
            <div id="menuToggle">

                <input type="checkbox" />
                
                <span></span>
                <span></span>
                <span></span>
                
                <ul id="menu">
                    <div class="nav-item">
                        <Button
                            actions={actions}
                            loggedIn={state.user.loggedIn}
                            type={"button"}
                            to={`/challenge-create`}
                            >
                            Create Challenge
                        </Button>
                    </div>
                    <div class="nav-item">
                        {state.user.loggedIn ? "" : <a href="https://www.facebook.com/v2.9/dialog/oauth?client_id=335734803514193&redirect_uri=http://localhost:8080/&response_type=token">
                            Login with Facebook!
                        </a>}
                    </div>
                    {/*<div class="nav-item">
                        <Button
                            actions={actions}
                            loggedIn={state.user.loggedIn}
                            type={"button"}
                            to={`/profile`}
                            >
                            Profile
                        </Button>
                    </div>*/}
                    <div class="nav-item">
                        <Link actions={actions} path={`/leaderboard`} >Leaderboard</Link>
                    </div>
                </ul>
            </div>
        </nav>
    )
}