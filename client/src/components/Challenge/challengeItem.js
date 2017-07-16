const { h }         = require('hyperapp')
const UpVoteButton  = require('../Button/upvoteButton')

module.exports = ({state, actions, item, index}, children) => {
    const hightlightNum = item.theme || 1
    
    return(
        <div 
            class={`challenge-item`} 
            onclick={() => actions.router.go(`/challenge-detail/${index}`)}
        >
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
                    className={`highlight-${hightlightNum}`}
                    state={state} 
                    actions={actions} 
                    type={"challenge"} 
                    id={item._id} 
                />
                {children}
            </div>
        </div>
    )
}