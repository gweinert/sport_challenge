export default {
  add: ({ num }) => ({ num: num + 1 }),

  sub: ({ num }) => ({ num: num - 1 }),

  removeChallenge: (state, actions, challengeId) => {
    fetch(`http://localhost:3000/challenges/remove/${challengeId}`,{
            credentials: 'include'  
          })    
      .then(res => res.json())
      .then(( res ) => {
        console.log("res", res);
        actions.onRemoveChallengeSuccess(res)
    })
  },

  onRemoveChallengeSuccess: ( state, actions, res) => {
    if(res.success){
      
      var { id } = res
      var challenges = state.data.challenges.slice()
      var challengeToDelIndex

      challenges.forEach( (challenge, index) => {
        if(challenge._id == id) {
          challengeToDelIndex = index
        }
      })

      if(challengeToDelIndex > -1){
        challenges.splice(challengeToDelIndex, 1)
        actions.router.go(`/`)
      }
      return ({challenges})
      
    }
  },

  upvote: (state, actions, {type, id, subId = ""}) => {
    console.log('type', type)
    console.log('id', id)
    //if vote doesnt exist in challenges/replies
    const userVoted = userDidVote(state, type)
    if(!userVoted) {

      fetch(`http://localhost:3000/upvote/${type}/${id}/${subId}`,{
              credentials: 'include'  
            })   
        .then(res => res.json())
        .then(( res ) => {
          console.log("res", res)
          actions.onUpvoteSuccess({res: res, type: type, id: id, subId: subId});
      })
    
  }
  },

  onUpvoteSuccess: (state, actions, {res, type, id, subId}) => {
    if(res.success) {
      const { newVote } = res
      var challenges = state.data.challenges.slice()
      
      challenges.forEach(challenge => {
        if(challenge._id == id) {   
          if(type == "challenge") {
            challenge.votes.push(newVote)
          } else if(type == "reply") {
            challenge.replies = challenge.replies.map(reply => {
              if(reply._id == subId){
                reply.votes.push(newVote)
              }
              return reply
            }).sort((a, b) => b.votes.length - a.votes.length )
          }
        }
      })
      return ({challenges})
    }
  },

  fetchContent: (state, actions) => {
    fetch(`http://localhost:3000/challenges`,{
            credentials: 'include'  
          })    
      .then(res => res.json())
      .then(( data ) => {
        actions.onFetchContentSuccess(data)
    })
  },

  onFetchContentSuccess: (state, actions, data) => ({data}),

  submitForm: (state, actions, e) => {
    const form = e.srcElement.form
    
    if(form) {
      
      const formData = new FormData(form)
      const apiUrl = form.action
      
      fetch(apiUrl, {
        credentials: 'include',
        method: form.method,
        body: formData
        
      })
        .then(res => res.json())
        .then(( data ) => {
            actions.formResponse(data);
      });
    }
  },

  formResponse: (state, actions, data) => {

  },

  getLocation: (state, actions) => {
    console.log("getLocation")
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(actions.setPosition)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
  },

  setPosition: (state, actions, position) => {
      const nearby = actions.getNearbyGoogleLocations(position)
      return({location: {
          lat: position.coords.latitude, 
          long: position.coords.longitude 
        }
      })
  },

  getNearbyGoogleLocations: (state, actions, position) => {
    if(state.nearbyGoogleLocations.length == 0) {
      var pyrmont = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      var map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });

      var request = {
        location: pyrmont,
        radius: '500'
      };

      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        actions.setNearbyGoogleLocations({results: results, status: status})
      });
    }
  },

  setNearbyGoogleLocations: (state, actions, {results, status}) => {
        console.log("callback google!", status)
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log("results", results);
          return ({nearbyGoogleLocations: results})
        }
    },

    checkLogin: (state, actions) => {
      console.log("check login")
      if(!state.user.loggedIn) {
      console.log("not logged in fetching fb data...")
        
        var token = getParameterByName('#access_token')
        
        if(token){
          fetch(`http://localhost:3000/auth/facebook/token?access_token=${token}`,{
            credentials: 'include'  
          })    
            .then( (res) => res.json())
            .then(( data ) => {
              if(data.success){
                actions.setUser(data.user)
              }

          });
        } else {
          //check server
          fetch(`http://localhost:3000/getUser` ,{
            credentials: 'include'  
          })    
            .then( (res) => res.json())
            .then(( data ) => {
              if(data.success){
                actions.setUser(data.user)
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
      return ({user})
    },

    filterChallenges: (state, actions, changeEvent) => {
      var selectEl = changeEvent.srcElement
      var filterOn = "all"
      
      if(selectEl) {
        filterOn = selectEl.value.toLowerCase()
      }

      return({challengeFilter: filterOn})
    },

    playVideo: (state, actions, filepath) => ({videoPathPlaying: filepath})

    
};


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function userDidVote(state, type) {
  var voted = false
  
  state.data.challenges.forEach(challenge => {
    voted = challenge.votes.some(vote => vote.userID == state.user.profile._id)
    if(voted && type == "challenge") { return voted }
    if(type == "reply") {
      challenge.replies.forEach(reply => {
        voted = reply.votes.some(vote => vote.userID == state.user.profile._id)
        if(voted) { return voted }
      })
    }

    console.log("voted?", voted)
  
  })

  return voted
}
