import * as React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'ramda';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import Login from './Login';
import Signup from './Signup';
import Settings from './Settings';
import PlayerMarket from './PlayerMarket';
import Header from '../components/Header';
import Notification from '../components/Notification';
import {typography, layout} from '../constants/styles';
import {actions} from '../redux/players';
import {selectors as historySelectors} from '../redux/history';
import {selectors as userSelectors, actions as userActions} from '../redux/user';

interface Props {
  nextRoute?: string;
  location: {
    pathname: string;
  },
  verifying: boolean;
  user: Object;
  history: {
    push: (string) => void;
  };
  verifyAccess: () => void;
  doLogout: () => void;
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
  componentDidMount() {
    const { location, user, verifyAccess } = this.props;

    if (location.pathname !== '/' && !user) {
      verifyAccess();
    }
  }
  componentWillReceiveProps(nextProps) {
    const { nextRoute, history, doLogout } = this.props;

    if (nextRoute !== nextProps.nextRoute) {
      history.push(nextProps.nextRoute);
    }

    if (nextProps.location.pathname === '/logout') doLogout();
  }

  render() {
    const { user, verifying } = this.props;

    if (verifying) return 'Loading';

    return (
      <Layout>
        <Header user={user} />
        <Scrollable>
          <Notification />
          <Switch>
            <Route exact path="/" component={Login} />
            {user && [
              <Route key="dash" exact path="/dashboard" component={Dashboard} />,
              <Route key="market" exact path="/market" component={PlayerMarket} />,
              <Route key="settings" exact path="/settings" component={Settings} />,
            ]}
            <Route exact path="/signup" component={Signup} />,
          </Switch>
        </Scrollable>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.getUser(state.user),
  verifying: userSelectors.getVerifying(state.user),
  nextRoute: historySelectors.getNextRoute(state.history),
});

const mapDispatchToProps = dispatch => ({
  verifyAccess: () => dispatch(userActions.verifyAttempt()),
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
  doLogout: () => dispatch(userActions.logout()),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Main);
