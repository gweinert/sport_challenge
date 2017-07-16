const { h }  = require('hyperapp')

const listItem = module.exports = ({state, actions}, children) => {
    
    return(
        <div class="list-item">
           {children}
        </div>
    )
} 