import * as React from 'react';
import styled from 'styled-components';
import countryList from '../constants/countryList';
import { spaces } from '../constants/styles';

const FilterStyled = styled.div`
  width: 400px;
`;

export default () => (
  <FilterStyled>
    <div>
      country
      <select>
        <option value="">All</option>
        {countryList.map(({ name, code }) => (<option value={code}>{name}</option>))}
      </select>
    </div>
    <div>
      Team
      <select>
        <option>Portugal</option>
        <option>Spain</option>
        <option>Netherlands</option>
      </select>
    </div>
    <div>
      Min
      <select>
        <option value="0">0</option>
        <option value="100000">100.000</option>
        <option value="250000">250.000</option>
        <option value="500000">500.000</option>
        <option value="1000000">1.000.000</option>
        <option value="2500000">2.500.000</option>
        <option value="5000000">5.000.000</option>
      </select>
    </div>
    <div>
      Max
      <select>
        <option value="100000">100.000</option>
        <option value="250000">250.000</option>
        <option value="500000">500.000</option>
        <option value="1000000">1.000.000</option>
        <option value="2500000">2.500.000</option>
        <option value="5000000">5.000.000</option>
        <option value="10000000">10.000.000</option>
        <option value="-1">10.000.000+</option>
      </select>
    </div>
    <div>
      Name
      <input type="text" />
    </div>
  </FilterStyled>
);
