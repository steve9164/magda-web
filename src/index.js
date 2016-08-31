import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';
import SearchBody from './SearchBody';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
  <Router history={browserHistory}>
      <Route path="/" component={Search}>
        <Route path="/keyword/:keyword" component={SearchBody}/>
      </Route>
    </Router>,
  document.getElementById('root')
);
