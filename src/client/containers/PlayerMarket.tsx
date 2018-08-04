import * as React from 'react';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import Filter from '../components/Filter';
import {spaces} from '../constants/styles';

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

const MarketLayout = styled.div`
  display: flex;
  width: 100%;
`;

export default () => (
  <StyledPage>
    <QuickProfile />
    <Inner>
      <h2>Player market</h2>
      <MarketLayout>
        <Filter />
        <PlayerList />
      </MarketLayout>
    </Inner>
  </StyledPage>
);
