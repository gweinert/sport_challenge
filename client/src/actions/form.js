export default {
    submit: (state, actions, e) => {
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
                actions.form.onSubmitSuccess(data);
            })

            return ({loading: true})
        }
    },

    onSubmitSuccess: (state, actions, data) => {
        if(data.success) {
            const { challenge, reply } = data
            var challenges = state.data.challenges.slice()

            //this will be a challenge being updated
            if(!reply) {
                challenges.push(challenge)
                
                // actions.router.go('/')
                window.location.pathname = "/"

                return({challenges, loading: false})
            } else { // this is a reply being updated
            
                challenges.filter(challengeItem => challengeItem._id == challenge._id)
                    .forEach(challenge => {
                        return challenge.replies.push(reply)
                    })
            
                return({challenges, loading: false})
            }
        }

        return ({loading: false})
    
    },

    clearPlaceholder: (state, actions, {event, value, placeholder}) => {
        if(!value && event.srcElement.value == placeholder) event.srcElement.value = ""
    }
}