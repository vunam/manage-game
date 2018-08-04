import * as React from 'react';
import styled from 'styled-components';
import PlayerList from '../components/PlayerList';
import QuickProfile from '../components/QuickProfile';
import { spaces } from '../constants/styles';

const StyledPage = styled.div`
`;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

export default () => (
  <StyledPage>
    <QuickProfile />
    <Inner>
      <h2>Current players</h2>
      <PlayerList />
    </Inner>
  </StyledPage>
);
