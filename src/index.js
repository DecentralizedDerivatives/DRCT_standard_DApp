import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './components/Main';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';

ReactDOM.render(<Main />, document.getElementById('root'));
ReactDOM.render(
  <Router>
    <Route exact path="/" component={Main} />
  </Router>,
  document.getElementById('root')
)

registerServiceWorker();
