import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './containers/Main';
import configureStore from './store';

const store = configureStore({});

render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);
