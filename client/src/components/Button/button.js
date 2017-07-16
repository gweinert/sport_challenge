const { h } = require('hyperapp')

const Button = (props, children) => {
    
    const { actions } = props
    const type = props.type || "button"
    const path = props.to || ""

    if( (props.loggedIn && props.loggedIn == true) || props.loggedIn == undefined) {
        return (
            <a href="javascript:void(0)" class="button"
                onclick={() => actions.router.go(path)}
                type={props.type}
            >
                    {children}
            </a>
        )
    } else return null
}

module.exports = Button