import * as React from 'react';
import styled from 'styled-components';
import countryList from '../constants/countryList';
import {color, spaces} from '../constants/styles';
import {toCurrency} from '../helpers/locale';

const QuickProfile = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${color.lightGray};
`;

const Stat = styled.div`
  padding: ${spaces.m} ${spaces.sm};
`;

export default ({name, country, money, value}) => (
  <QuickProfile>
    <Stat>Team: {name}</Stat>
    <Stat>Country: {countryList.find(item => item.code === country).name}</Stat>
    <Stat>Cash: {toCurrency(money)}</Stat>
    <Stat>Value: {toCurrency(value)}</Stat>
  </QuickProfile>
);
