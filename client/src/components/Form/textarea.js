const { h } = require('hyperapp')

const textarea = module.exports = ({actions, name, value, placeholder}) => {
    const text = value || placeholder 
    
    return (
        <textarea 
            name={name} 
            onclick={(e) => actions.form.clearPlaceholder({event, value, placeholder})}
        >
            {text}
        </textarea>
    )
}