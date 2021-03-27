let mutations = {
    //修改state中的问题列表
    setQuestionList: function(state,action){
        state.questionList = action.content;
        
        return state
    },
    //将state中的分数累加10
    addScore: function(state,action){
        state.score += action.content;
        
        return state
    },
    //初始化state中的分数为0
    initScore: function(state,action){
        state.score = 0;
        
        return state
    },
}

export default mutations