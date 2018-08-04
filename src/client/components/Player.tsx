import * as React from 'react';
import styled from 'styled-components';
import { spaces } from '../constants/styles';

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

export default () => (
  <Player>
    <ItemWide>First name</ItemWide>
    <ItemWide>Last name</ItemWide>
    <ItemSmall>Country</ItemSmall>
    <ItemSmall>Age</ItemSmall>
    <ItemWide>Market value</ItemWide>
    <ItemSmall><button>Add to transfer list</button></ItemSmall>
  </Player>
);
