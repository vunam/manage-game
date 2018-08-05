import * as React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import PlayerMarket from './PlayerMarket';
import Header from '../components/Header';
import Notification from '../components/Notification';
import {typography, layout} from '../constants/styles';
import {actions} from '../redux/players';
import {selectors as historySelectors} from '../redux/history';

interface Props {
  nextRoute?: string;
  history: {
    push: (string) => void;
  };
}

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

class Main extends React.Component<Props> {
  componentWillReceiveProps(nextProps) {
    const { nextRoute, history } = this.props;

    if (nextRoute !== nextProps.nextRoute) {
      history.push(nextProps.nextRoute);
    }
  }

  render() {
    return (
      <Layout>
        <Header />
        <Scrollable>
          <Notification />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/market" component={PlayerMarket} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Scrollable>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  nextRoute: historySelectors.getNextRoute(state.history),
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Main);
