export default {

    fetchInfo: (state, actions) => {

        //only fetch if we havent
        if(!state.leaderboard.length) {

            fetch(`http://localhost:3000/user`,{
                    credentials: 'include'  
                })    
            .then(res => res.json())
            .then(( data ) => {
                actions.leaderboard.onFetchInfoSuccess(data)
            })
        
    }
  },

  onFetchInfoSuccess: (state, actions, data) => {
    //gives us all users
    const { success, users } = data
    const leaderboard = buildLeaderBoard(state, users)

    return ({leaderboard})
  },

  sort: (state, actions, changeEvent) => {
    var selectEl = changeEvent.srcElement
    var sortOn = "total"

    if(selectEl) {
        sortOn = selectEl.value.toLowerCase()
    }

    return({leaderboardCategory: sortOn})
  }
}

function buildLeaderBoard(state, users) {

    //wait for challenges to load
    //might need to call onupdate for leaderboard index view
    const challenges = state.data.challenges ? state.data.challenges : []

    if(challenges){

        const sortedUsers = users.map( user => {
                // var totalPoints = 0;
                var points = {
                    total: 0,
                    snowboard: 0,
                    ski: 0,
                    skateboard: 0,
                    surf: 0
                }
                    
                challenges.forEach(challenge => {
                    challenge.replies.forEach(reply => {
                        console.log("reply", reply)
                        if(reply.userID == user._id) {
                            if(reply.completed) {
                                points.total += challenge.votes.length
                                points[challenge.category.toLowerCase()] += challenge.votes.length
                            }
                        }
                    })
                })
                
                
                return {
                    displayName: user.displayName,
                    profileImg: user.profileImg,
                    points
                }
            })
            // .sort( (a, b) => a.totalPoints - b.totalPoints)
            
        console.log("sortedUsers", sortedUsers)
        return sortedUsers
    }



    return []
}