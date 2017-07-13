const { h }         = require('hyperapp')
const ListItem = require('./listItem.js')

module.exports = ({state, actions, list}) => {
    if(list && list.length ) {
        return(
            <div class="list">
                { list.map( (item, index) => {
                        return (
                            <ListItem 
                                state={state}
                                actions={actions}
                                item={item}
                                index={index}
                                onclick={ () => {
                                    actions.router.go(`/challenge-detail/${index}`)
                                } }
                            />
                        )
                    })}
                </div>
        )
    }
}