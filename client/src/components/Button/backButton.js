const { h } = require('hyperapp')

const backButton = module.exports = ({actions}) => {
    return (
        <div
            class="back-button"
            onclick={() => actions.router.go('/')}>
            <div class="bk-btn">
                <div class="bk-btn-triangle" />
                <div class="bk-btn-bar" />
            </div>
        </div>
    )
}