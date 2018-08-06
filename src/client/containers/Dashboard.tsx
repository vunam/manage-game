import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';
import {selectors as userSelectors} from '../redux/user';

import PlayerType from '../types/player';
import TeamType from '../types/team';

interface Props {
  getPlayers: (team: number) => void;
  transferPlayer: (player: number, team: number, available: boolean) => void;
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
    if (user) getPlayers(user.team.id);
  }
  componentWillReceiveProps(nextProps) {
    const {user, getPlayers} = this.props;
    if (!user && nextProps.user) getPlayers(user.team.id);
  }

  render() {
    const {players, user, transferPlayer} = this.props;
    if (!user) return null;
    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>My players</h2>
          <PlayerList
            list={players}
            clickHandler={(player, available) =>
              transferPlayer(player, user.team.id, available)
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
  transferPlayer: (player, team, available) =>
    dispatch(actions.transferPlayerAttempt({player, team, available})),
  getPlayers: team => dispatch(actions.getPlayersAttempt({team})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
