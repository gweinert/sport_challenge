const { h }         = require('hyperapp')
const ListItem = require('./listItem.js')

const list = module.exports = ({state, actions}, children) => {
    if(children && children.length ) {
        return(
            <div class="list">
                { children.map( (child, index) => {
                        return (
                            <ListItem 
                                state={state}
                                actions={actions}
                            >
                                {child}
                            </ListItem>
                        )
                    })}
                </div>
        )
    }
}