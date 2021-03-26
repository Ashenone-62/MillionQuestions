import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd-mobile';
import axios from 'axios'
import './index.css';

class App extends React.Component {
  async componentWillMount(){
    let getQuestions = await axios.get('http://localhost:3000/api/getQuestions/')
    console.log(getQuestions.data)
  }

  render(){
    return (
      <Button type="primary">primary</Button>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

