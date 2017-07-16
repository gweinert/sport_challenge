const { h }         = require('hyperapp')
const BackButton    = require('../../components/Button/backButton')
const ChallengeForm = require('../../components/Challenge/challengeForm')
const Loader        = require('../../components/loader')

const EditChallenge = module.exports = ({state, actions}) => {
    return(
        <div class="center-container form-bg">
            <Loader state={state} />
            <BackButton actions={actions}/>
            <ChallengeForm state={state} actions={actions}/>
        </div>
    )
}