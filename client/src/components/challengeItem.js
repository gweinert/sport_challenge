const { h }         = require('hyperapp')
const UpVoteButton  = require('./upvoteButton')

module.exports = ({state, actions, item, index, onclick}) => {
    const hightlightNum = Math.floor((Math.random() * 10) + 1);
    
    return(
        <div class={`challenge-item`}>
            <div class={`top-info `}>
                <div class={`rank circle highlight-${hightlightNum}`}>
                    {index + 1}
                </div>
                <h4 class={`username highlight-${hightlightNum}`}>{item.username}</h4>
            </div>
            <div class="inner">
                <h1>{item.name}</h1>
                <p class="small">{item.category}</p>
                <p class="small">{item.votes.length} votes</p>
                <UpVoteButton 
                    state={state} 
                    actions={actions} 
                    type={"challenge"} 
                    id={item._id} 
                />
            </div>
        </div>
    )
}