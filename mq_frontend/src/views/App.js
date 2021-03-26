import React from 'react';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux'

function mapStateToProps(state){
    return {...state}
}

function mapDispatchToProps(dispatch){
    return {
      initScore: () => {
          dispatch({
            type: "initScore",
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
                  <Button type="primary" onClick={ this.goSolveQuestions } >随即答题</Button>
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