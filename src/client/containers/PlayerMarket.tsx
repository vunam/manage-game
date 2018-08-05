import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import Filter from '../components/Filter';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';

import PlayerType from '../types/player';

interface Props {
  getPlayers: () => void;
  players: [PlayerType],
}

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

const MarketLayout = styled.div`
  display: flex;
  width: 100%;
`;

class PlayerMarket extends React.Component<Props> {
  componentDidMount() {
    this.props.getPlayers();
  }

  render() {
    const { players } = this.props;

    return (
      <StyledPage>
        <QuickProfile />
        <Inner>
          <h2>Player market</h2>
          <MarketLayout>
            <Filter />
            <PlayerList list={players} />
          </MarketLayout>
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  players: selectors.getPlayers(state.players),
});

const mapDispatchToProps = dispatch => ({
  getPlayers: () => dispatch(actions.getPlayersAttempt()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayerMarket);


