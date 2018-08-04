import * as React from 'react';
import styled from 'styled-components';
import { spaces } from '../constants/styles';

const FilterStyled = styled.div``;

export default () => (
  <FilterStyled>
    <div>
      country
      <select>
        <option>Portugal</option>
        <option>Spain</option>
        <option>Netherlands</option>
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
        <option>0-100.000</option>
        <option>0-100.000</option>
      </select>
    </div>
    <div>
      Max
      <select>
        <option>0-100.000</option>
        <option>0-100.000</option>
      </select>
    </div>
    <div>
      Name
      <input type="text" />
    </div>
  </FilterStyled>
);
