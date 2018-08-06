import * as React from 'react';
import styled from 'styled-components';
import Player from './Player';
import {spaces, color} from '../constants/styles';
import PlayerType from '../types/player';

type Props = {
  list: [PlayerType];
  withTeam?: boolean;
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
  flex: 2;
`;

const ItemSmall = styled.div`
  flex: 1;
`;

export default ({list, withTeam = false}: Props) => (
  <PlayerList>
    <Head>
      {withTeam && <ItemWide>Team</ItemWide>}
      <ItemWide>Position</ItemWide>
      <ItemWide>First name</ItemWide>
      <ItemWide>Last name</ItemWide>
      <ItemWide>Country</ItemWide>
      <ItemSmall>Age</ItemSmall>
      <ItemSmall>Market value</ItemSmall>
      <ItemSmall>Transfer list</ItemSmall>
    </Head>
    {list && list.map(player => (
      <Player key={player.id} {...player} withTeam={withTeam} />
    ))}
  </PlayerList>
);
