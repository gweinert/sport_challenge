export default {

    fetchAll: (state, actions) => {
        fetch(`http://localhost:3000/challenges`,{
                credentials: 'include'  
                })    
            .then(res => res.json())
            .then(( data ) => {
            actions.challenge.onFetchContentSuccess(data)
        })
    },

    onFetchContentSuccess: (state, actions, data) => {
        var sortedChallenges = data.challenges.sort((a, b) => b.votes.length - a.votes.length)
        
        
        return({data: {challenges: sortedChallenges}})
    },
    
    remove: (state, actions, challengeId) => {
        fetch(`http://localhost:3000/challenges/remove/${challengeId}`,{
                credentials: 'include'  
            })    
        .then(res => res.json())
        .then(( res ) => {
            actions.challenge.onRemoveSuccess(res)
        })

        return({loading: true})
    },

    onRemoveSuccess: ( state, actions, res) => {
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
                // actions.router.go(`/`) // does this work or should update pathname directly
                window.location.pathname = "/"
            }
            
            return ({challenges, loading: false})

        }
    },

    filter: (state, actions, changeEvent) => {
        var selectEl = changeEvent.srcElement
        var filterOn = "all"
        
        if(selectEl) {
            filterOn = selectEl.value.toLowerCase()
        }

        return({challengeFilter: filterOn})
    
    }

}

