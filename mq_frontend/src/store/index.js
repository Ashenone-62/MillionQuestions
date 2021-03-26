import {createStore} from 'redux'
import state from './state'
import mutations from './mutations'

let data = state
let mutation = mutations;

function reducer(state=data,action){
    if(action.type.indexOf('redux') === -1){
        state = mutation[action.type](state,action)

        return {...state}
    }else{

        return state
    }
}

const store = createStore(reducer)

export default store