const { h }         = require('hyperapp')
const ReplyButton   = require('../../components/replyButton')
const UserButton    = require('../../components/userButton')
const ChallengeItem = require('../../components/challengeItem')
const ReplyList     = require('../../components/replyList')

const ChallengeDetail = module.exports = ({state, actions}) => {
    
    if(state.data.challenges){
        const challengeIndex = state.router.params.id
        const challenge = state.data.challenges[challengeIndex]
        const sortedReplies = challenge.replies.sort( (a,b) => b.votes.length - a.votes.length)
        
        return(
            <div class="challenge-detail">
                <div
                    class="challenge-image detail-image" 
                    style={{backgroundImage: `url("${challenge.images}")`}}
                />
                <div class="container">
                    <ChallengeItem state={state} actions={actions} item={challenge} index={challengeIndex}>
                        <p class="description">{challenge.description}</p>
                        <UserButton 
                            state={state}
                            actions={actions}
                            onclick={() => actions.router.go(`/challenge-edit/${challengeIndex}`)}
                            item={challenge}
                        >
                            Edit
                        </UserButton>
                        <UserButton 
                            state={state}
                            actions={actions}
                            onclick={(e) => actions.removeChallenge(challenge._id)}
                            item={challenge}
                        >
                            Delete
                        </UserButton>
                        <ReplyButton state={state} actions={actions} challenge={challenge}/>
                    </ChallengeItem>
                    
                    
                    <ReplyList state={state} actions={actions} replies={sortedReplies} challenge={challenge}/>
                </div>
            </div>
        )
    } else return <div/>
}