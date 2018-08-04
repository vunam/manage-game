import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from './Login';

const Main = () => (
  <BrowserRouter>
    <Route exact path="/" component={Login} />
  </BrowserRouter>
);

export default Main;
