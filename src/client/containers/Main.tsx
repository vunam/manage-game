import * as React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import PlayerMarket from './PlayerMarket';
import Header from '../components/Header';
import Notification from '../components/Notification';
import {typography, layout} from '../constants/styles';
import { actions } from '../redux/players';

const Layout = styled.section`
  position: relative;
  font-size: ${typography.normal};
`;

const Scrollable = styled.div`
  position: absolute;
  top: ${layout.header};
  left: 0;
  width: 100%;
  height: calc(100% - ${layout.header});
`;

const Main = () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <Scrollable>
        <Notification />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/market" component={PlayerMarket} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Scrollable>
    </Layout>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
