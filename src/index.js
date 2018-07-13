import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';
import AppRouter from './AppRouter';

ReactDOM.render(
  <Root>
    <AppRouter />
  </Root>,
  document.getElementById('root')
);
