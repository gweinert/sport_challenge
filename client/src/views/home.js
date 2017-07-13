const { h }         = require('hyperapp')
const FilterList    = require('../components/filterList')
const Nav           = require('../components/nav')

const Home = ({state, actions}) => {
    console.log("home state", state)
    return(
        <div>
            <Nav state={state} actions={actions} />
            <div class="container">
                <FilterList state={state} actions={actions} list={state.data.challenges}/>
            </div>
        </div>
    )
}



module.exports = Home