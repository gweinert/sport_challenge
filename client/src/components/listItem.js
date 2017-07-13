const { h }         = require('hyperapp')
const UpVoteButton  = require('./upvoteButton')
const ChallengeItem = require('./challengeItem');

module.exports = ({state, actions, item, index, onclick}) => {
    const hightlightNum = Math.floor((Math.random() * 10) + 1);
    
    return(
        <div class="list-item"
            onclick={onclick}
        >
            <ChallengeItem state={state} actions={actions} item={item} index={index} onclick={onclick} />
            <div class={`reply-preview circle highlight-${hightlightNum}`}
                onclick={onclick}>
                {item.replies.length}
            </div>
        </div>
    )
} 