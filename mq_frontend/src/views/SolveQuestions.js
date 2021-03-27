import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import loadingGif from '../static/img/loading.gif';
import '../static/css/solveQuestions.css';
import { ADD_SCORE, SET_QUESTION_LIST } from '../store/actionType'


function mapStateToProps(state){
    return {...state}
}

function mapDispatchToProps(dispatch){
    return {
        getQuestions: async () => {
            let list = await axios.get('http://localhost:3000/api/getQuestions/');
            list = list.data;
            dispatch({
                type: SET_QUESTION_LIST,
                content: list
            })
        },
        addScore: () =>{
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

        this.state = {
            curQuestion: 0,
            choiceItemStyle: ["choiceItem","choiceItem","choiceItem","choiceItem"],
            isChoose: false,
        }
    }

    componentDidMount(){
        this.props.getQuestions();
    }

    answer = (index) => {
        let isChoose = this.state.isChoose;
        let updateCur = this.state.curQuestion;
        let answerIndex = parseInt(this.props.questionList[updateCur].answer);
        let choiceItemStyle = this.state.choiceItemStyle;

        if(isChoose === false){
            if(index+1 === answerIndex){
                choiceItemStyle[index] = "choiceItem true"
                this.props.addScore()
            }else{
                choiceItemStyle[index] = "choiceItem false"
                choiceItemStyle[answerIndex-1] = "choiceItem true"
            }

            this.setState({
                choiceItemStyle: choiceItemStyle,
                isChoose: true,
            })
            
            setTimeout(() => {
                updateCur++
                if(updateCur === 10){
                    this.props.history.push('/Result',{score: this.props.score})
                }else{
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
        let score = this.props.score
        let questionList = this.props.questionList;
        let curQuestion = this.state.curQuestion;
        let choiceItemStyle = this.state.choiceItemStyle;

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
            return (
                <div className="solveQuestions">
                     <img src={loadingGif} alt="loading" />
                </div>
            )
        }
    }
}

const solveQuestions = connect(
    mapStateToProps,
    mapDispatchToProps
)(solveQuestionsCom)


export default solveQuestions