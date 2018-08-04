import * as React from 'react';
import styled from 'styled-components';

const TeamList = styled.ul`
  margin: 0;
  padding: 0;
`;

export default () => (
  <TeamList>
    <li>
      <div>First name</div>
      <div>Last name</div>
      <div>Country</div>
      <div>Age</div>
      <div>Market value</div>
      <div>Add to transfer list</div>
    </li>
  </TeamList>
);
