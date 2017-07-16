
const { h }             = require('hyperapp')
const Home              = require('./Home/Index')
const CreateChallenge   = require('./Challenge/Create')
const ChallengeDetail   = require('./Challenge/Detail')
const ChallengeEdit     = require('./Challenge/Edit')
const UserOwned         = require('../components/userOwned')
const Leaderboard       = require('./Leaderboard/Index')

const views = [
    ['/', (state, actions) => <Home state={state} actions={actions}/>],
    ['/challenge-create', (state, actions) => <CreateChallenge state={state} actions={actions}/>],
    ['/challenge-detail/:id', (state, actions) => <ChallengeDetail state={state} actions={actions}/>],
    ['/challenge-edit/:id', (state, actions) => (
        <UserOwned state={state} actions={actions}>
            <ChallengeEdit state={state} actions={actions}/>
        </UserOwned>
        )
    ],
    ['/leaderboard', (state, actions) => <Leaderboard state={state} actions={actions}/>],

    ['*', (state, actions) => <div>404</div>]
]

module.exports = views
