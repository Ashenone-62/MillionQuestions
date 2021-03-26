let mutations = {
    setQuestionList: function(state,action){
        state.questionList = action.content;
        
        return state
    },
    addScore: function(state,action){
        state.score += action.content;
        
        return state
    },
    initScore: function(state,action){
        state.score = 0;
        
        return state
    },
}

export default mutations