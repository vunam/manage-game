import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';
import {selectors as userSelectors} from '../redux/user';

import PlayerType from '../types/Player';
import TeamType from '../types/Team';

interface Props {
  getPlayers: (team: string) => void;
  transferPlayer: (
    player: string,
    team: string,
    available: boolean,
    sellValue: number,
  ) => void;
  players: [PlayerType];
  user: {
    team: TeamType;
  };
}

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

class Dashboard extends React.Component<Props> {
  componentDidMount() {
    const {user, getPlayers} = this.props;
    if (user) {
      getPlayers(user.team.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    const {user, getPlayers} = this.props;
    if (!user && nextProps.user) {
      getPlayers(user.team.id);
    }
  }

  render() {
    const {players, user, transferPlayer} = this.props;
    if (!user) {
      return null;
    }
    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>My players</h2>
          <PlayerList
            currentTeam={user.team.id}
            list={players}
            clickHandler={(player, available, sellValue) =>
              transferPlayer(player, user.team.id, available, sellValue)
            }
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
  transferPlayer: (player, team, available, sellValue) =>
    dispatch(
      actions.transferPlayerAttempt({player, team, available, sellValue}),
    ),
  getPlayers: team => dispatch(actions.getPlayersAttempt({team})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
