const { h } = require('hyperapp')

const image = module.exports = ({state, actions, src, className}) => {
    const show = state.imagesLoaded[src] ? "show-image" : ""

    return (
        <div class={`${className} image ${show}`} style={{backgroundImage: `url(${src})`}}>
            <img 
                onload={() => actions.onImageLoad(src)} 
                src={src} 
                style={{display: 'none'}}
            />
        </div>
    )
}