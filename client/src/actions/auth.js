export default {
    
    checkLogin: (state, actions) => {
        console.log("check login")
        if(!state.user.loggedIn) {
            console.log("not logged in fetching fb data...")
            
            var token = getParameterByName('#access_token')
            
            if(token){
                
                fetch(`http://localhost:3000/auth/facebook/token?access_token=${token}`,
                { credentials: 'include'  } )    
                .then( (res) => res.json() )
                .then(( data ) => {
                    
                    if(data.success){
                    
                        actions.auth.setUser(data.user)
                    
                    }
                })
            } else {
              
                //check server
                fetch(`http://localhost:3000/getUser` ,
                { credentials: 'include' } )    
                .then( (res) => res.json())
                .then(( data ) => {
                    
                    if(data.success){
                    
                        actions.auth.setUser(data.user)
                    
                    }

                });
            }
        } else {
            console.log("logged in good to go!")
        }
    },

    setUser: (state, actions, userProfile) => {
        const user = {
            loggedIn: true,
            profile: userProfile
        }
        
        console.log("login data", user)
        
        actions.router.go('/')
        // window.location.pathname
        
        return ({user})
    },
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}