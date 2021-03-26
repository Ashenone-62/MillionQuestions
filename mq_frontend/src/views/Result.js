import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import '../static/css/result.css'



function mapStateToProps(state){
    return {...state}
}

function mapDispatchToProps(dispatch){
    return {

    }
}


class ResultCom extends React.Component {
    constructor(props){
        super(props)

        this.state = {
        
        }
    }

    backHome = () => {
        this.props.history.push('/')
    }

    render(){
        let score = this.props.location.state.score
        return(
            <div className="resultPage">
                <div className="result">
                    <h1>当前得分：{score}</h1>
                    <Button type="primary" onClick={this.backHome}>回到首页</Button>
                </div>
            </div>
        )
    }    
}

const Result = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultCom)


export default Result