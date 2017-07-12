const { h }         = require('hyperapp')
const ReplyButton   = require('../../components/replyButton')
const UserButton    = require('../../components/userButton')
const UpVoteButton  = require('../../components/upvoteButton')

const ChallengeDetail = ({state, actions}) => {
    console.log("detail", state)
    const challengeIndex = state.router.params.id
    
    if(state.data.challenges){
        const challenge = state.data.challenges[challengeIndex]
        
        return(
            <div class="challenge-detail">
                <h2>Detail</h2>
                <div>
                    <h4>{challenge.name}</h4>
                    <p>Votes: {challenge.votes.number}</p>
                    <p>{challenge.description}</p>
                    <p>{challenge.username}</p>
                    <div
                        class="challenge-image" 
                        style={{backgroundImage: `url("${challenge.images}")`}} />
                </div>
                <ReplyButton state={state} actions={actions} challengeIndex={challengeIndex}/>
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
                {/*<p 
                    state={state}
                    actions={actions}
                    onclick={(e) => actions.removeChallenge(challenge._id)}
                    item={challenge}
                >
                    Delete
                </p>*/}
                <div>
                    {challenge.replies.sort( (a,b) => b.votes.length - a.votes.length).map( (reply, index) => {
                        console.log("reply", reply)
                        return(
                            <div class="reply">
                                <UpVoteButton 
                                    state={state} 
                                    actions={actions} 
                                    type={"reply"} 
                                    id={challenge._id}
                                    subId={reply._id}
                                />
                                Votes: {reply.votes.length}
                                Reply {index}
                                by {reply.username}
                                <ReplyMedia filepath={reply.file}/>
                                
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else return <div/>
}

const ReplyMedia = ({filepath}) => {
    const isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filepath)
    const isVideo = (/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)$/i).test(filepath)
    const fileExtention = filepath.split('.').pop();
    
    if(isImage){
        return <img width="50" height="50" src={filepath} />
    } else if(isVideo) {
        return (
            <video width="320" height="240" controls>
                <source src={filepath} type={`video/${fileExtention}`} />
                Your browser does not support the video tag.
            </video>
        )
    } else return <div />
}

module.exports = ChallengeDetail