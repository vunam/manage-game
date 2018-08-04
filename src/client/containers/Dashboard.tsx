import * as React from 'react';
import styled from 'styled-components';
import TeamList from '../components/TeamList';
import QuickProfile from '../components/QuickProfile';
import { spaces } from '../constants/styles';

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

export default () => (
  <StyledPage>
    <QuickProfile />
    <TeamList />
  </StyledPage>
);
