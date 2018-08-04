import * as React from 'react';
import styled from 'styled-components';
import TeamList from '../components/TeamList';
import QuickProfile from '../components/QuickProfile';

const StyledPage = styled.div`
`;

export default () => (
  <StyledPage>
    <QuickProfile />
    <TeamList />
  </StyledPage>
);
