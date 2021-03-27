import state from './state'
import mutations from './mutations'
import {
    INIT_SCORE,
    ADD_SCORE,
    SET_QUESTION_LIST
} from './actionType'


let STATE = state
let MUTATIONS = mutations;

//本质是通过actionType来确定调用action方法修改state数据，下面只举一个例子
function reducer(state=STATE,action){
    
    switch (action.type) {
        //当收到初始化得分的Type的时候
        case INIT_SCORE:
            //根据INIT_SCORE调用mutations中的方法修改state中的score
            MUTATIONS[INIT_SCORE](state,action)
            break;

        case ADD_SCORE:
            MUTATIONS[ADD_SCORE](state,action)
            break;

        case SET_QUESTION_LIST:
            MUTATIONS[SET_QUESTION_LIST](state,action)
            break;
    
        default:
            break;
    }

    return {
        ...state
    }
}

export default reducer