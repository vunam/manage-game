import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {isEqual} from 'lodash';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import Filter from '../components/Filter';
import {spaces} from '../constants/styles';
import {actions, selectors} from '../redux/players';
import {selectors as userSelectors} from '../redux/user';

import PlayerType from '../types/player';
import TeamType from '../types/team';

interface Props {
  getPlayers: (Object?) => void;
  players: [PlayerType];
  user: {
    team: TeamType;
  };
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
    const {players, user} = this.props;

    return (
      <StyledPage>
        <QuickProfile {...user.team} />
        <Inner>
          <h2>Player market</h2>
          <MarketLayout>
            <Filter changeHandler={this.setFilter} />
            <PlayerList list={players} withTeam />
          </MarketLayout>
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
