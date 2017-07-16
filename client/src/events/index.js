/**
 * There are no events for this application
 * But this is an example of directory and file structure for events
 * Seperation of concerns are key in functional paradigms!
*/

module.exports = {
    loaded: (state, actions) => {
        actions.auth.checkLogin()
        actions.location.getLocation()
        actions.challenge.fetchAll()
    },
    
    route: (state, actions, data, emit) => {
        
        if(data.match == "/leaderboard") {
            actions.leaderboard.fetchInfo()
        }

    }
    
  }