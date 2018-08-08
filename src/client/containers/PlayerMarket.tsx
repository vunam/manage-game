import {isEqual} from 'lodash';
import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Filter from '../components/Filter';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import {spaces} from '../styles';
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
  transferPlayer: (
    player: string,
    available: boolean,
    sellValue: number,
  ) => void;
  buyPlayer: (player: string, team: string) => void;
  getTeams: () => void;
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
    this.state = {
      filters: {
        country: null,
        team: null,
        min: null,
        max: null,
        firstName: null,
        lastName: null,
      },
    };
  }

  componentDidMount() {
    this.props.getPlayers();
    this.props.getTeams();
  }

  componentDidUpdate(_, prevState) {
    const {filters} = this.state;
    if (!isEqual(prevState.filters, filters)) {
      const useFilters = Object.keys(filters).reduce(
        (prev, next) =>
          filters[next] ? {...prev, [next]: filters[next]} : prev,
        {},
      );
      this.props.getPlayers(useFilters);
    }
  }

  setFilter = (filterName, value) => {
    this.setState(state => ({
      filters: {
        ...state.filters,
        [filterName]: value,
      },
    }));
  };

  render() {
    const {players, user, teams, transferPlayer, buyPlayer} = this.props;

    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>Player market</h2>
          <MarketLayout>
            <Filter changeHandler={this.setFilter} teams={teams} />
            <PlayerList
              currentTeam={user.team.id}
              list={players}
              buyHandler={player => buyPlayer(player, user.team.id)}
              clickHandler={transferPlayer}
              withTeam={true}
            />
          </MarketLayout>
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.getUser(state.user),
  teams: teamsSelectors.getTeams(state.teams),
  players: selectors.getPlayersFull(state.players),
});

const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(teamsActions.getTeamsAttempt()),
  getPlayers: (filters = {}) =>
    dispatch(
      actions.getPlayersAttempt({
        withTeam: true,
        ...filters,
      }),
    ),
  transferPlayer: (player, available, sellValue) =>
    dispatch(
      actions.transferPlayerAttempt({
        player,
        available,
        withTeam: true,
        sellValue,
      }),
    ),
  buyPlayer: (player, team) =>
    dispatch(
      actions.buyPlayerAttempt({
        player,
        team,
        withTeam: true,
      }),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerMarket);
