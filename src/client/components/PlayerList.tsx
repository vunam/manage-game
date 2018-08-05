import * as React from 'react';
import styled from 'styled-components';
import Player from './Player';
import {spaces, color} from '../constants/styles';
import PlayerType from '../types/player';

type Props = {
  list: [PlayerType],
};

const PlayerList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 ${spaces.m} 0;
  padding: ${spaces.s} 0;
  font-weight: bold;
  border-bottom: 1px solid ${color.dark};
`;

const ItemWide = styled.div`
  flex: 3;
`;

const ItemSmall = styled.div`
  flex: 1;
`;

export default ({list}: Props) => (
  <PlayerList>
    <Head>
      <ItemWide>First name</ItemWide>
      <ItemWide>Last name</ItemWide>
      <ItemSmall>Country</ItemSmall>
      <ItemSmall>Age</ItemSmall>
      <ItemWide>Market value</ItemWide>
      <ItemSmall>Transfer list</ItemSmall>
    </Head>
    {list && list.map(player => (
      <Player key={player.id} {...player} />
    ))}
  </PlayerList>
);
