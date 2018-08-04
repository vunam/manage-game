import * as React from 'react';
import styled from 'styled-components';
import Player from './Player';

const PlayerList = styled.ul`
  margin: 0;
  padding: 0;
`;

export default () => (
  <PlayerList>
    <Player />
    <Player />
    <Player />
    <Player />
  </PlayerList>
);
