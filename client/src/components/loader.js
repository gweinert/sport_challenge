const { h } = require('hyperapp')

const loader = module.exports = ({state}) => {
    const show = state.loading ? "show" : ""
    
    return (
        <div class={`loader-container ${show}`}>
            <div class={`loader`} />
        </div>
    )
}