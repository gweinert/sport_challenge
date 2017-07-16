const { h }         = require('hyperapp')
const ChallengeForm = require('../../components/Challenge/challengeForm')
const BackButton    = require('../../components/Button/backButton')
const Loader        = require('../../components/loader')

const CreateChallenge = module.exports = ({state, actions}) => {
    return (
        <div class="center-container form-bg">
            <Loader state={state} />
            <BackButton actions={actions}/>
            <ChallengeForm state={state} actions={actions}/>
        </div>
    )
}