const { h }         = require('hyperapp')
const FilterList    = require('../../components/List/filterList')
const Nav           = require('../../components/nav')
const Loader        = require('../../components/loader')
const ChallengeItem = require('../../components/Challenge/challengeItem');

const Home = module.exports = ({state, actions}) => {
    const { challenges } = state.data
    console.log("state", state)
    return(
        <div class="home">
            <Loader state={state} />
            <Nav state={state} actions={actions} />
            <div class="container">
                <FilterList state={state} actions={actions}>
                    {challenges && challenges.map( (challenge, index) => {
                        return(
                                <div filter={challenge.category}>
                                    <ChallengeItem 
                                        state={state} 
                                        actions={actions} 
                                        item={challenge} 
                                        index={index} 
                                    />
                                    <div 
                                        class={`reply-preview circle highlight-${challenge.theme}`}
                                        onclick={() => actions.router.go(`/challenge-detail/${index}`)}
                                    >
                                            {challenge.replies.length}
                                    </div>
                                </div>
                        )
                    })}
                </FilterList>
            </div>
        </div>
    )
}