import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { INIT_SCORE } from '../store/actionType'

function mapStateToProps(state){
    return {...state}
}

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


class AppCom extends React.Component {

  goSolveQuestions = () => {
    this.props.initScore()
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

const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppCom)


export default App