const { h }         = require('hyperapp')
const ReplyButton   = require('../../components/Reply/replyButton')
const CreatorButton = require('../../components/Button/creatorButton')
const BackButton    = require('../../components/Button/backButton')
const ChallengeItem = require('../../components/Challenge/challengeItem')
const List          = require('../../components/List/list')
const ReplyItem     = require('../../components/Reply/ReplyItem')
const Loader        = require('../../components/loader')
const Image         = require('../../components/Image/image')

const ChallengeDetail = module.exports = ({state, actions}) => {
    
    if(state.data.challenges){
        const challengeIndex = state.router.params.id
        const challenge = state.data.challenges[challengeIndex]
        const sortedReplies = challenge.replies.sort( (a,b) => b.votes.length - a.votes.length)
                //{/*<div
                    //class="challenge-image detail-image" 
                    //style={{backgroundImage: `url("${challenge.image}")`}}
                ///>*/}
        
        return(
            <div class="challenge-detail">
                <Loader state={state} />
                <BackButton actions={actions}/>
                <Image 
                    className={`challenge-image detail-image`} 
                    state={state} 
                    actions={actions} 
                    src={challenge.image} 
                />
                <div class="container">
                    <ChallengeItem state={state} actions={actions} item={challenge} index={challengeIndex}>
                        <p class="description">{challenge.description}</p>
                        <CreatorButton 
                            state={state}
                            actions={actions}
                            onclick={() => actions.router.go(`/challenge-edit/${challengeIndex}`)}
                            item={challenge}
                        >
                            Edit
                        </CreatorButton>
                        <CreatorButton 
                            state={state}
                            actions={actions}
                            onclick={(e) => actions.challenge.remove(challenge._id)}
                            item={challenge}
                        >
                            Delete
                        </CreatorButton>
                        <ReplyButton state={state} actions={actions} challenge={challenge}/>
                    </ChallengeItem>
                    
                    <List state={state}>
                        {sortedReplies.map(reply => 
                            <ReplyItem 
                                state={state} 
                                actions={actions} 
                                reply={reply} 
                                challenge={challenge}
                            />
                        )}
                    </List>
                </div>
            </div>
        )
    } else return <div/>
}