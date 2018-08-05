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
      console.log('do check', location)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { nextRoute, history } = this.props;

    if (nextRoute !== nextProps.nextRoute) {
      history.push(nextProps.nextRoute);
    }
  }

  render() {
    const { user, verifying } = this.props;

    if (verifying) return 'Loading';

    return (
      <Layout>
        <Header />
        <Scrollable>
          <Notification />
          <Switch>
            <Route exact path="/" component={Login} />
            {user && [
              <Route exact path="/dashboard" component={Dashboard} />,
              <Route exact path="/market" component={PlayerMarket} />,
              <Route exact path="/signup" component={Signup} />,
            ]}
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
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Main);
