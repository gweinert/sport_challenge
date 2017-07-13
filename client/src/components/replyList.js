const { h }         = require('hyperapp')
const ReplyItem     = require('./replyItem')


const replyList = module.exports = ({state, actions, replies, challenge}) => {
    if(replies && replies.length) {
        return (
                <div>
                    {replies.map( (reply, index) => {
                        return <ReplyItem 
                                    state={state}
                                    actions={actions}
                                    reply={reply}
                                    challenge={challenge} />   
                    })}
                </div>
        )
    }
}


