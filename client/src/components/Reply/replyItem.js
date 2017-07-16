const { h } = require('hyperapp')
const UpVoteButton = require('../Button/upvoteButton')
const ReplyMedia    = require('./replyMedia')

const replyItem = module.exports = ({state, actions, reply, challenge}) => {
    const hightlightNum = Math.floor((Math.random() * 10) + 1);
    
    return(
        <article class="reply">
            <span class={`username highlight-${hightlightNum}`}>{reply.username}</span>
            
            <ReplyMedia state={state} actions={actions} filepath={reply.file}/>
            <div class="vote-container">
                <UpVoteButton
                    className={`highlight-${hightlightNum}`}
                    state={state} 
                    actions={actions} 
                    type={"reply"} 
                    id={challenge._id}
                    subId={reply._id}
                />
                <div class="votes">
                    <span>{reply.votes.length} votes</span>
                </div>
            </div>
            
        </article>
    )
}