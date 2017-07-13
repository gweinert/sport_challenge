const { h }  = require('hyperapp')

const link = module.exports = ({state, actions, path}, children) => {
    return( 
        <a
            href="javascript:void(0)"
            onclick={(e) => {
                actions.router.go(path)
            }}
        >
            {children}
        </a>
    )
}