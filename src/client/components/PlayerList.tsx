import * as React from 'react';
import styled from 'styled-components';
import Player from './Player';
import {color, spaces} from '../constants/styles';
import PlayerType from '../types/Player';

interface Props {
  list: [PlayerType];
  withTeam?: boolean;
  admin?: boolean;
  currentTeam: string;
  clickHandler?: (id: string, available?: boolean, sellValue?: number) => void;
  buyHandler?: (id: string) => void;
  playerEdit?: (id: string) => void;
  deleteHandler?: (id: string) => void;
}

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
  padding: 0 ${spaces.xs};
`;

export default ({
  list,
  withTeam = false,
  clickHandler,
  currentTeam,
  buyHandler,
  admin = false,
  deleteHandler,
}: Props) =>
  list ? (
    <PlayerList>
      <Head>
        {withTeam && <ItemSmall>Team</ItemSmall>}
        <ItemSmall>Position</ItemSmall>
        <ItemWide>Name</ItemWide>
        <ItemWide>Country</ItemWide>
        <ItemSmall>Age</ItemSmall>
        <ItemSmall>Value</ItemSmall>
        <ItemSmall>Sell value</ItemSmall>
        {!admin && <ItemSmall>Action</ItemSmall>}
        {admin && <ItemSmall>Edit</ItemSmall>}
        {admin && <ItemSmall>Delete</ItemSmall>}
      </Head>
      {list.length ?
        list.map(player => (
          <Player
            key={player.id}
            {...player}
            withTeam={withTeam}
            clickHandler={clickHandler}
            buyHandler={buyHandler}
            currentTeam={currentTeam}
            admin={admin}
            deleteHandler={deleteHandler}
          />
        )) : 'No matching players'}
    </PlayerList>
  ) : null;
