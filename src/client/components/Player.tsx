import * as React from 'react';
import styled from 'styled-components';
import {spaces} from '../constants/styles';
import PlayerType from '../types/player';

interface Props {
  withTeam?: boolean;
  currentTeam: number;
  clickHandler: (number: number, available: boolean) => void;
  buyHandler?: (number: number) => void;
}

const Player = styled.li`
  display: flex;
  justify-content: space-between;
  margin: ${spaces.m} 0;
`;

const ItemWide = styled.div`
  flex: 2;
`;

const ItemSmall = styled.div`
  flex: 1;
`;

export default ({
  id,
  teamName,
  firstName,
  lastName,
  countryName,
  type,
  age,
  value,
  withTeam,
  clickHandler,
  status,
  team,
  currentTeam,
  buyHandler,
}: PlayerType & Props) => (
  <Player>
    {withTeam && <ItemWide>{teamName}</ItemWide>}
    <ItemWide>{type}</ItemWide>
    <ItemWide>{firstName}</ItemWide>
    <ItemWide>{lastName}</ItemWide>
    <ItemWide>{countryName}</ItemWide>
    <ItemSmall>{age}</ItemSmall>
    <ItemSmall>{value}</ItemSmall>
    <ItemSmall>
      {currentTeam === team ? (
        <button onClick={() => clickHandler(id, status === 'NONE')}>
          {status === 'NONE' ? 'Add Transfer' : 'Retract'}
        </button>
      ) : status === 'AVAILABLE' && <button onClick={() => buyHandler(id)}>BUY</button>}
    </ItemSmall>
  </Player>
);
