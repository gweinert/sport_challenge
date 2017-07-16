const { h } = require('hyperapp')

const LocationOptionList = module.exports = ({state, actions, options, name, value}) => {
    return (
        <div class="select">
            <select name={name} value={value}>
                <option selected value={value} disabled>{value}</option>
                { options.length > 0 ? 
                    options.map(option => {
                        return <option value={option.name}>{option.name}</option>
                    })
                : null }
            </select>
        </div>
    )
}