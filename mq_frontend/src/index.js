import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store/index'
import App from './views/App'
import SolveQuestions from './views/SolveQuestions'
import Result from './views/Result'
import './static/css/index.css'


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={App} />
      <Route path="/SolveQuestions" exact component={SolveQuestions} />
      <Route path="/Result" exact component={Result} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

