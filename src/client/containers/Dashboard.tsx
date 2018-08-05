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
  getPlayers: () => void;
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
    this.props.getPlayers();
  }

  render() {
    const { players, user } = this.props;
    if (!user) return null;
    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>Current players</h2>
          <PlayerList list={players} />
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  user: userSelectors.getUser(state.user),
  players: selectors.getPlayers(state.players),
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
