import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd-mobile';
import '../static/css/result.css'


//将state映射到props上
function mapStateToProps(state){
    return {...state}
}
//将派发action映射到props上
function mapDispatchToProps(dispatch){
    return {

    }
}


class ResultCom extends React.Component {
    constructor(props){
        //将props绑定到当前组件上（this）
        super(props)

        this.state = {
        
        }
    }

    backHome = () => {
        //返回首页
        this.props.history.push('/')
    }

    render(){
        //在location.state中获取路由传入的参数
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

//连接React组件与store的state
const Result = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultCom)


export default Result