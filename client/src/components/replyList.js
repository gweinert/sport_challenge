const { h }         = require('hyperapp')
const UpVoteButton  = require('./upvoteButton')


const replyList = module.exports = ({state, actions, replies, challenge}) => {
    if(replies && replies.length) {
        return (
                <div>
                    {replies.map( (reply, index) => {
                        return(
                            <div class="reply">
                                <UpVoteButton 
                                    state={state} 
                                    actions={actions} 
                                    type={"reply"} 
                                    id={challenge._id}
                                    subId={reply._id}
                                />
                                Votes: {reply.votes.length}
                                by {reply.username}
                                <ReplyMedia filepath={reply.file}/>
                                
                            </div>
                        )
                    })}
                </div>
        )
    }
}

const ReplyMedia = ({filepath}) => {
    const isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(filepath)
    const isVideo = (/\.(avi|AVI|wmv|WMV|flv|FLV|mpg|MPG|mp4|MP4)$/i).test(filepath)
    const fileExtention = filepath.split('.').pop();
    
    if(isImage){
        return <img width="50" height="50" src={filepath} />
    } else if(isVideo) {
        return (
            <video width="320" height="240" controls>
                <source src={filepath} type={`video/${fileExtention}`} />
                Your browser does not support the video tag.
            </video>
        )
    } else return <div />
}
