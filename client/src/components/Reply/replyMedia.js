const { h } = require('hyperapp')

const ReplyMedia = module.exports = ({state, actions, filepath}) => {
    const isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filepath)
    const isVideo = (/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)$/i).test(filepath)
    const fileExtention = filepath.split('.').pop();
    
    const hidePlay = state.videoPathPlaying == filepath ? "hide" : ""
    return(
        <div class="reply-media">
            
            {isImage ? <img src={filepath} /> : ""}
            
            {isVideo ? <div class="video-container" onclick={(e) => {
                console.log(e)
                e.srcElement.offsetParent.querySelector('video').play() // play closest video
                actions.reply.playVideo(filepath) //update state to hide video play button
                }}>
                        <div class={`play ${hidePlay}`}></div>
                            <video>
                                <source src={filepath} type={`video/${fileExtention}`} />
                                Your browser does not support the video tag.
                            </video>
                        </div> : ""}
        </div>
    )
}