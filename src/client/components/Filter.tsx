import * as React from 'react';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {spaces} from '../styles';

const FilterStyled = styled.div`
  width: 240px;
  margin-right: ${spaces.sm};
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin: ${spaces.s} 0 ${spaces.xxs};
`;

export default ({changeHandler, teams}) => (
  <FilterStyled>
    <InputGroup>
      <Label>Position</Label>
      <select onChange={({target}) => changeHandler('type', target.value)}>
        <option value="">All</option>
        <option value="Goal">Goalkeeper</option>
        <option value="Mid">Midfielder</option>
        <option value="Att">Attacker</option>
        <option value="Def">Defender</option>
      </select>
    </InputGroup>
    <InputGroup>
      <Label>Country</Label>
      <select onChange={({target}) => changeHandler('country', target.value)}>
        <option value="">All</option>
        {countryList.map(({name, code}) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
    </InputGroup>
    {teams && (
      <InputGroup>
        <Label>Team</Label>
        <select onChange={({target}) => changeHandler('team', target.value)}>
          <option value="">All</option>
          {teams.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </InputGroup>
    )}
    <InputGroup>
      <Label>Minimum value</Label>
      <select onChange={({target}) => changeHandler('min', target.value)}>
        <option value="0">0</option>
        <option value="100000">100.000</option>
        <option value="250000">250.000</option>
        <option value="500000">500.000</option>
        <option value="1000000">1.000.000</option>
        <option value="2500000">2.500.000</option>
        <option value="5000000">5.000.000</option>
      </select>
    </InputGroup>
    <InputGroup>
      <Label>Maximum value</Label>
      <select
        defaultValue="-1"
        onChange={({target}) => changeHandler('max', target.value)}
      >
        <option value="100000">100.000</option>
        <option value="250000">250.000</option>
        <option value="500000">500.000</option>
        <option value="1000000">1.000.000</option>
        <option value="2500000">2.500.000</option>
        <option value="5000000">5.000.000</option>
        <option value="10000000">10.000.000</option>
        <option value="-1">10.000.000+</option>
      </select>
    </InputGroup>
    <InputGroup>
      <Label>First name</Label>
      <input
        type="text"
        onChange={({target}) => changeHandler('firstName', target.value)}
      />
    </InputGroup>
    <InputGroup>
      <Label>Last name</Label>
      <input
        type="text"
        onChange={({target}) => changeHandler('lastName', target.value)}
      />
    </InputGroup>
  </FilterStyled>
);
