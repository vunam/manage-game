import * as React from 'react';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {color, typography, spaces} from '../styles';
import {toCurrency} from '../helpers/locale';

const QuickProfile = styled.div`
  display: flex;
  background: ${color.extraLightGray};
`;

const Stat = styled.div`
  flex: 1;
  padding: ${spaces.m} ${spaces.sm};
  font-weight: 300;
  font-size: ${typography.semiLarge};
  color: ${color.darkGray};
  border-right: 1px solid ${color.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:last-child {
    border: none;
  }
`;

const Label = styled.div`
  padding: 0 0 ${spaces.xxs};
  font-weight: bold;
  font-size: ${typography.small};
  color: ${color.dark};
`;

export default ({name, country, money, value}) => (
  <QuickProfile>
    <Stat>
      <Label>Team</Label>
      {name}
    </Stat>
    <Stat>
      <Label>Country</Label>
      {countryList.find(item => item.code === country).name}
    </Stat>
    <Stat>
      <Label>Cash</Label>
      {toCurrency(money)}
    </Stat>
    <Stat>
      <Label>Value</Label>
      {toCurrency(value)}
    </Stat>
  </QuickProfile>
);
