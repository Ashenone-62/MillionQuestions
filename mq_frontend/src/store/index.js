import {createStore} from 'redux'
import REDUCER from './actions'

//通过reducer创建一个store
const store = createStore(REDUCER)

export default store