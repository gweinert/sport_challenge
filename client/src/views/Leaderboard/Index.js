const { h } = require('hyperapp')
const List  = require('../../components/List/list')
const BackButton = require('../../components/Button/backButton')

const Index = module.exports = ({state, actions}) => {
    const leaderboardCategory = state.leaderboardCategory
    const leaderboard = state.leaderboard.sort((a, b) => b[leaderboardCategory] - a[leaderboardCategory] )
    const options = ["Total", "Snowboard", "Ski", "Skateboard", "Surf"]
    
    return (
        <div class="leaderboard" >
            <h1>Leaderboard</h1>
            <BackButton state={state} actions={actions} />
            <select onchange={(e) => actions.leaderboard.sort(e)}>
                {options.map(option => {
                    return <option value={option}>{option}</option>
                })}               
            </select>
            <List state={state} actions={actions} >
                {leaderboard.map( (user, index) => {
                    return (
                        <div class="leaderboard-item">
                            <div class="rank">{index + 1}</div>
                            <div class="profile-img"><img src={user.profileImg} /></div>
                            <div class="info">
                                <div class="username">{user.displayName}</div>
                                <div class="total-points">{user.points[leaderboardCategory]} points</div>
                            </div>
                        </div>
                    )
                })} 
            </List>
        </div>
    )
}