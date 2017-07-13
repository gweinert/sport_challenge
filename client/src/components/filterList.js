const { h }         = require('hyperapp')
const List          = require('./list.js')

module.exports = ({state, actions, list}) => {
    if(list && list.length) {
        const filteredList = state.data.challenges.filter( challenge => {
                    return state.challengeFilter == "all" || 
                    challenge.category == state.challengeFilter
                })
        
        return(
            <div class="list">
                <select
                    onchange={(e) => actions.filterChallenges(e)}>
                    <option value="All">All</option>
                    <option value="Snowboard">Snowboard</option>
                    <option value="Ski">Ski</option>
                    <option value="Skateboard">Skateboard</option>
                    <option value="Surf">Surf</option>
                </select>
                <List state={state} actions={actions} list={filteredList}/> 
            </div>
        )
    }
}