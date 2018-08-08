import {isEqual} from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Filter from '../components/Filter';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';
import {selectors as userSelectors} from '../redux/user';

import PlayerType from '../types/Player';
import TeamType from '../types/Team';

interface Props {
  getPlayers: (Object?) => void;
  createNewPlayer: () => void;
  players: [PlayerType];
  user: {
    team: TeamType;
  };
  teams: [TeamType];
}

interface State {
  filters: any;
}

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

const MarketLayout = styled.div`
  display: flex;
  width: 100%;
`;

class PlayerMarket extends React.Component<Props, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getPlayers();
  }

  render() {
    const {players, user, createNewPlayer} = this.props;

    return (
      <StyledPage>
        <Inner>
          <h2>Player admin</h2>
          <button onClick={createNewPlayer}>Create new player</button>
          <PlayerList
            currentTeam={user.team.id}
            list={players}
            withTeam={true}
            admin={true}
          />
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.getUser(state.user),
  players: selectors.getPlayersFull(state.players),
});

const mapDispatchToProps = dispatch => ({
  createNewPlayer: () => dispatch(actions.createPlayerAttempt()),
  getPlayers: (filters = {}) =>
    dispatch(
      actions.getPlayersAttempt({
        withTeam: true,
        ...filters,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerMarket);
