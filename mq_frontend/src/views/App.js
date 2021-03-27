import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { INIT_SCORE } from '../store/actionType'

//将state映射到props上
function mapStateToProps(state){
    return {...state}
}

//将派发action映射到props上
function mapDispatchToProps(dispatch){
    return {
      initScore: () => {
          dispatch({
            type: INIT_SCORE,
            content: 0
          })
      }
    }
}

//App组件
class AppCom extends React.Component {
  //去答题页
  goSolveQuestions = () => {
    //初始化store.state里的分数
    this.props.initScore()
    //通过history前往答题页
    this.props.history.push('/SolveQuestions')
  }

  render(){
    return (
        <div className="appPage">
              <div className="app">
                  <Button type="primary" onClick={ this.goSolveQuestions } >马上答题</Button>
              </div>
        </div>
    )
  }
}

//连接React组件与store的state
const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCom)


export default App