import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import loadingGif from '../static/img/loading.gif';
import '../static/css/solveQuestions.css';
import { ADD_SCORE, SET_QUESTION_LIST } from '../store/actionType'

//将state映射到props上
function mapStateToProps(state){
    return {...state}
}
//将派发action映射到props上
function mapDispatchToProps(dispatch){
    return {
        //通过axios发送get请求，请求10个随机问题
        getQuestions: async () => {
            let list = await axios.get('http://localhost:3000/api/getQuestions/');
            list = list.data;
            //派发action
            dispatch({
                type: SET_QUESTION_LIST,
                content: list
            })
        },
        //答对加十分
        addScore: () =>{
            //派发action
            dispatch({
                type: ADD_SCORE,
                content: 10
            })
        }
    }
}


class solveQuestionsCom extends React.Component {
    constructor(props){
        super(props)

        //定义state数据
        this.state = {
            //当前问题索引
            curQuestion: 0,
            //当前题目的选项样式
            choiceItemStyle: ["choiceItem","choiceItem","choiceItem","choiceItem"],
            //当前是否已经选择了答案
            isChoose: false,
        }
    }

    componentDidMount(){
        //组件挂载完请求问题数据
        this.props.getQuestions();
    }

    //answer方法
    answer = (index) => {
        //获取state所需数据

        //是否选了答案
        let isChoose = this.state.isChoose;
        //当前问题索引
        let updateCur = this.state.curQuestion;
        //答案索引
        let answerIndex = parseInt(this.props.questionList[updateCur].answer);
        //选项样式
        let choiceItemStyle = this.state.choiceItemStyle;

        //如果当前没有选答案
        if(isChoose === false){
            //如果答对
            if(index+1 === answerIndex){
                //设置true的样式
                choiceItemStyle[index] = "choiceItem true"
                //派发加分操作
                this.props.addScore()
            }else{
                //设置false的样式
                choiceItemStyle[index] = "choiceItem false"
                //现实对的答案
                choiceItemStyle[answerIndex-1] = "choiceItem true"
            }

            //通过setState修改已设置的样式，同时将isChoose设置为true
            this.setState({
                choiceItemStyle: choiceItemStyle,
                isChoose: true,
            })
            
            //延迟1.2秒后变为下一题
            setTimeout(() => {
                //当前题目索引+1
                updateCur++
                //如果当前题目为10了就将当前得分传入，然后跳转到结算页面
                if(updateCur === 10){
                    this.props.history.push('/Result',{score: this.props.score})
                }else{
                    //如果没有到最后一道题，将isChoose置为false（防抖），然后将新的curQuestion设置同时，初始化选项样式
                    this.setState({
                        isChoose: false,
                        curQuestion: updateCur,
                        choiceItemStyle: ["choiceItem","choiceItem","choiceItem","choiceItem"]
                    })
                }
            }, 1200);
        }else{
            return
        }
    }

    render(){
        //获取state所需数据

        //当前分数
        let score = this.props.score
        //当前问题列表
        let questionList = this.props.questionList;
        //获取当前问题索引
        let curQuestion = this.state.curQuestion;
        //获取当前问题选项样式
        let choiceItemStyle = this.state.choiceItemStyle;

        //如果questionList不为空，返回相应的问题
        if(questionList.length > 0){
            let choices = JSON.parse(questionList[curQuestion].options) 
            return (
                <div className="solveQuestions">
                     <h1>
                         {
                            questionList[curQuestion].quiz
                         }
                     </h1>
    
                     <div className="choices">
                        {
                            choices.map((item,index) => {
                                //通过map返回对应1，2，3，4的A，B，C，D
                                let choiceIndex = "";
                                switch (index+1) {
                                    case 1:
                                        choiceIndex = "A"
                                        break;
                                    case 2:
                                        choiceIndex = "B"
                                        break;
                                    case 3:
                                        choiceIndex = "C"
                                        break;
                                    case 4:
                                        choiceIndex = "D"
                                        break;    
                                
                                    default:
                                        break;
                                }

                                return (
                                    <div className={choiceItemStyle[index]} key={index} onClick={() => {this.answer(index)}}>
                                        { choiceIndex }:{ item }
                                    </div>
                                )
                            })
                        }
                     </div>

                     <div>
                         <h1>当前得分：{score}</h1>
                     </div>
                </div>
            )
        }else{

            //如果当前问题列表为空，返回一个loading图片
            return (
                <div className="solveQuestions">
                     <img src={loadingGif} alt="loading" />
                </div>
            )
        }
    }
}

//连接React组件与store的state
const solveQuestions = connect(
    mapStateToProps,
    mapDispatchToProps
)(solveQuestionsCom)


export default solveQuestions