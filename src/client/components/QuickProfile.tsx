import * as React from 'react';
import styled from 'styled-components';
import { color, layout, spaces } from '../constants/styles';

const QuickProfile = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${color.lightGray};
`;

const Stat = styled.div`
  padding: ${spaces.m} ${spaces.sm};
`;

export default () => (
  <QuickProfile>
    <Stat>Team name</Stat>
    <Stat>Country</Stat>
    <Stat>Money</Stat>
    <Stat>Value</Stat>
    <button>Edit</button>
  </QuickProfile>
);
