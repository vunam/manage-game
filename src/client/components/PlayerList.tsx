import * as React from 'react';
import styled from 'styled-components';
import Player from './Player';
import {spaces, color} from '../constants/styles';
import PlayerType from '../types/player';

type Props = {
  list: [PlayerType];
  withTeam?: boolean;
  currentTeam: string;
  clickHandler?: (number: string, available: boolean, sellValue: number) => void;
  buyHandler?: (number: string) => void;
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

export default ({list, withTeam = false, clickHandler, currentTeam, buyHandler}: Props) => (
  <PlayerList>
    <Head>
      {withTeam && <ItemWide>Team</ItemWide>}
      <ItemWide>Position</ItemWide>
      <ItemWide>Name</ItemWide>
      <ItemWide>Country</ItemWide>
      <ItemSmall>Age</ItemSmall>
      <ItemWide>Transfer value</ItemWide>
      <ItemSmall>Action</ItemSmall>
    </Head>
    {list &&
      list.map(player => (
        <Player
          key={player.id}
          {...player}
          withTeam={withTeam}
          clickHandler={clickHandler}
          buyHandler={buyHandler}
          currentTeam={currentTeam}
        />
      ))}
  </PlayerList>
);
