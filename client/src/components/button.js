const { h } = require('hyperapp')

const Button = (props, children) => {
    
    const { actions } = props
    console.log("Button props", props, children, actions)
    const type = props.type || "button"
    const path = props.to || ""

    if( (props.loggedIn && props.loggedIn == true) || props.loggedIn == undefined) {
        return (
            <button
                onclick={() => actions.router.go(path)}
                type={props.type}
            >
                    {children}
            </button>
        )
    } else return null
}

module.exports = Button