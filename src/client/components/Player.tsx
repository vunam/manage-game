import * as React from 'react';
import styled from 'styled-components';

const Player = styled.li`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <Player>
    <div>First name</div>
    <div>Last name</div>
    <div>Country</div>
    <div>Age</div>
    <div>Market value</div>
    <button>Add to transfer list</button>
  </Player>
);
