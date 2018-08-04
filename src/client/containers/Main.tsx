import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import Header from '../components/Header';
import Notification from '../components/Notification';;;
import { typography, layout } from '../constants/styles';

const Layout = styled.section`
  position: relative;
  font-size: ${typography.normal};
`;

const Scrollable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: ${layout.header};
`;

const Main = () => (
  <Layout>
    <Header />
    <Notification />
    <Scrollable>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
        </Switch> 
      </BrowserRouter>
    </Scrollable>
  </Layout>
);

export default Main;
