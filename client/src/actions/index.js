import leaderboard from './leaderboard'
import challenge from './challenge'
import location from './location'
import auth from './auth'
import upvote from './upvote'
import form from './form'
import reply from './reply'

export default {
  
  leaderboard: leaderboard,

  challenge: challenge,

  location: location,

  auth: auth,

  upvote: upvote,

  form: form,

  reply: reply,

  onImageLoad: (state, actions, src) => {
    var imagesLoaded = Object.assign({}, state.imagesLoaded)
    imagesLoaded[src] = "loaded"
    return ({imagesLoaded: imagesLoaded})
  }
    
};