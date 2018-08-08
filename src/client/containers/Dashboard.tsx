import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import MessagesList from '../components/MessagesList';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';
import {selectors as userSelectors} from '../redux/user';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '../redux/messages';

import PlayerType from '../types/Player';
import TeamType from '../types/Team';
import MessageType from '../types/Message';

interface Props {
  getPlayers: (team: string) => void;
  getMessages: (team: string) => void;
  transferPlayer: (
    player: string,
    team: string,
    available: boolean,
    sellValue: number,
  ) => void;
  players: [PlayerType];
  messages: [MessageType];
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
    const {user} = this.props;
    if (user) {
      this.fetchData();
    }
  }
  componentWillReceiveProps(nextProps) {
    const {user} = this.props;
    if (!user && nextProps.user) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const {user, getPlayers, getMessages} = this.props;
    getMessages(user.team.id);
    getPlayers(user.team.id);
  };

  render() {
    const {players, messages, user, transferPlayer} = this.props;
    if (!user) {
      return null;
    }
    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>My messages</h2>
          <MessagesList list={messages} />
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
  messages: messagesSelectors.getMessages(state.messages),
  user: userSelectors.getUser(state.user),
  players: selectors.getPlayersFull(state.players),
});

const mapDispatchToProps = dispatch => ({
  transferPlayer: (player, team, available, sellValue) =>
    dispatch(
      actions.transferPlayerAttempt({player, team, available, sellValue}),
    ),
  getMessages: team => dispatch(messagesActions.getMessagesAttempt(team)),
  getPlayers: team => dispatch(actions.getPlayersAttempt({team})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
