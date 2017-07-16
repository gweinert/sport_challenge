const { h }         = require('hyperapp')
const List          = require('./list.js')

const filterList = module.exports = ({state, actions, options}, children) => {
    if(children && children.length) {
        // const filteredList = state.data.challenges.filter( challenge => {
        //             return state.challengeFilter == "all" || 
        //             challenge.category.toLowerCase() == state.challengeFilter.toLowerCase()
        //         })
        const filteredList = children.filter( child => {
                    return state.challengeFilter == "all" || 
                    child.data.filter.toLowerCase() == state.challengeFilter.toLowerCase()
                })
        
        return(
            <div class="list">
                <select
                    onchange={(e) => actions.challenge.filter(e)}>
                    <option value="All">All</option>
                    <option value="Snowboard">Snowboard</option>
                    <option value="Ski">Ski</option>
                    <option value="Skateboard">Skateboard</option>
                    <option value="Surf">Surf</option>
                </select>
                <List state={state} actions={actions}> 
                    {filteredList}
                </List>
            </div>
        )
    }
}