import * as React from 'react';
import styled from 'styled-components';
import countryList from '../constants/countryList';
import { spaces } from '../constants/styles';

const FilterStyled = styled.div`
  width: 400px;
`;

export default ({ changeHandler }) => (
  <FilterStyled>
    <div>
      country
      <select onChange={({ target }) => changeHandler('country', target.value)}>
        <option value="">All</option>
        {countryList.map(({ name, code }) => (<option key={code} value={code}>{name}</option>))}
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
      <select onChange={({ target }) => changeHandler('min', target.value)}>
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
      <select onChange={({ target }) => changeHandler('max', target.value)}>
        <option value="100000">100.000</option>
        <option value="250000">250.000</option>
        <option value="500000">500.000</option>
        <option value="1000000">1.000.000</option>
        <option value="2500000">2.500.000</option>
        <option value="5000000">5.000.000</option>
        <option value="10000000">10.000.000</option>
        <option selected value="-1">10.000.000+</option>
      </select>
    </div>
    <div>
      First name
      <input type="text" onChange={({ target }) => changeHandler('firstName', target.value)} />
    </div>
    <div>
      Last name
      <input type="text" onChange={({ target }) => changeHandler('lastName', target.value)} />
    </div>
  </FilterStyled>
);
