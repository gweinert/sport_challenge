const { h }         = require('hyperapp')
const UpVoteButton  = require('../../components/upvoteButton')



module.exports = ({state, actions}) => {
    if(state.data && state.data.challenges) {
        return(
            <div class="challenge-list">
            <select
                onchange={(e) => actions.filterChallenges(e)}>
                <option value="All">All</option>
                <option value="Snowboard">Snowboard</option>
                <option value="Ski">Ski</option>
                <option value="Skateboard">Skateboard</option>
                <option value="Surf">Surf</option>
            </select>
                
            { state.data.challenges.filter( challenge => {
                    return state.challengeFilter == "all" || challenge.category == state.challengeFilter
                })
                .map( (challenge, index) => {
                return (
                    <div class="challenge-item"
                        onclick={() => {
                            console.log("click detail")
                            actions.router.go(`/challenge-detail/${index}`)
                            }
                        }>
                        <h3>{challenge.name}</h3>
                        <p>{challenge.category}</p>
                        <UpVoteButton 
                            state={state} 
                            actions={actions} 
                            type={"challenge"} 
                            id={challenge._id} 
                        />
                        <h4>Votes: {challenge.votes.length}</h4>
                        {/*<p>V/H: {challenge.votes.votesPerHour}</p>*/}
                        <p>By: {challenge.username}</p>
                    </div>
                )
            })}
            </div>
        )
    }
}