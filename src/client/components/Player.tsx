import * as React from 'react';
import styled from 'styled-components';
import { spaces } from '../constants/styles';
import PlayerType from '../types/player';

const Player = styled.li`
  display: flex;
  justify-content: space-between;
  margin: ${spaces.m} 0;
`;

const ItemWide = styled.div`
  flex: 3;
`;

const ItemSmall = styled.div`
  flex: 1;
`;

export default ({
  firstName,
  lastName,
  country,
  age,
  value,
}: PlayerType) => (
  <Player>
    <ItemWide>{firstName}</ItemWide>
    <ItemWide>{lastName}</ItemWide>
    <ItemSmall>{country}</ItemSmall>
    <ItemSmall>{age}</ItemSmall>
    <ItemWide>{value}</ItemWide>
    <ItemSmall><button>Add to transfer list</button></ItemSmall>
  </Player>
);
