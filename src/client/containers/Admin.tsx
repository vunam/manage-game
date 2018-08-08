import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import {spaces} from '../constants/styles';
import {actions as historyActions} from '../redux/history';
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
  editPlayer: (id: string) => void;
  deletePlayer: (id: string) => void;
  players: [PlayerType];
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
    const {players, createNewPlayer, deletePlayer, editPlayer} = this.props;

    return (
      <StyledPage>
        <Inner>
          <h2>Player admin</h2>
          <button onClick={createNewPlayer}>Create new player +</button>
          <PlayerList
            list={players}
            withTeam={true}
            admin={true}
            clickHandler={editPlayer}
            deleteHandler={deletePlayer}
          />
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  players: selectors.getPlayersFull(state.players),
});

const mapDispatchToProps = dispatch => ({
  editPlayer: id => dispatch(historyActions.nextRoute(`/edit-player/${id}`)),
  createNewPlayer: () => dispatch(actions.createPlayerAttempt()),
  deletePlayer: id => dispatch(actions.deletePlayerAttempt(id)),
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
