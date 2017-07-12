/**
 * There are no events for this application
 * But this is an example of directory and file structure for events
 * Seperation of concerns are key in functional paradigms!
*/

module.exports = {
    loaded: (state, actions) => {
        actions.fetchContent()
        actions.checkLogin()
    },
    
    route: (state, actions, data, emit) => {
        console.log("route", data);
        // actions.checkLogin();   
    }
    
  }