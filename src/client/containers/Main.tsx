import {compose} from 'ramda';
import * as React from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter} from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Notification from '../components/Notification';
import {layout, typography} from '../constants/styles';
import {
  actions as historyActions,
  selectors as historySelectors,
} from '../redux/history';
import {actions} from '../redux/players';
import {
  actions as notificationActions,
  selectors as notificationSelectors,
} from '../redux/notification';
import {
  actions as userActions,
  selectors as userSelectors,
} from '../redux/user';
import Dashboard from './Dashboard';
import Login from './Login';
import PlayerMarket from './PlayerMarket';
import Settings from './Settings';
import Signup from './Signup';
import Teams from './Teams';

interface Props {
  message?: string;
  nextRoute?: string;
  location: {
    pathname: string;
  };
  verifying: boolean;
  user: object;
  history: {
    push: (str: string) => void;
  };
  verifyAccess: () => void;
  doLogout: () => void;
  clearNextRoute: () => void;
  closeNotification: () => void;
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
    const {location, user, verifyAccess} = this.props;

    if (location.pathname !== '/' && !user) {
      verifyAccess();
    }
  }
  componentWillReceiveProps(nextProps) {
    const {
      location,
      nextRoute,
      history,
      doLogout,
      closeNotification,
      clearNextRoute,
    } = this.props;

    if (location.pathname !== nextProps.location.pathname && nextProps.message) {
      closeNotification();
    }

    if (nextRoute !== nextProps.nextRoute && nextProps.nextRoute) {
      history.push(nextProps.nextRoute);
    }

    if (nextProps.location.pathname === '/logout') {
      doLogout();
    }
  }

  render() {
    const {user, verifying, closeNotification, message} = this.props;

    if (verifying) {
      return 'Loading';
    }

    return (
      <Layout>
        <Header user={user} />
        <Scrollable>
          <Notification close={closeNotification} message={message} />
          <Switch>
            <Route exact={true} path="/" component={Login} />
            {user && [
              <Route
                key="dash"
                exact={true}
                path="/dashboard"
                component={Dashboard}
              />,
              <Route
                key="market"
                exact={true}
                path="/market"
                component={PlayerMarket}
              />,
              <Route
                key="teams"
                exact={true}
                path="/teams"
                component={Teams}
              />,
              <Route
                key="settings"
                exact={true}
                path="/settings"
                component={Settings}
              />,
            ]}
            <Route exact={true} path="/signup" component={Signup} />,
          </Switch>
        </Scrollable>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  message: notificationSelectors.getNotification(state.notification),
  user: userSelectors.getUser(state.user),
  verifying: userSelectors.getVerifying(state.user),
  nextRoute: historySelectors.getNextRoute(state.history),
});

const mapDispatchToProps = dispatch => ({
  closeNotification: () => dispatch(notificationActions.closeNotification()),
  verifyAccess: () => dispatch(userActions.verifyAttempt()),
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
  doLogout: () => dispatch(userActions.logout()),
  clearNextRoute: () => dispatch(historyActions.nextRoute(null)),
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Main);
