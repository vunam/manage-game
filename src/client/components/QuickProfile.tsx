import * as React from 'react';
import styled from 'styled-components';

const QuickProfile = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default () => (
  <QuickProfile>
    <div>Team name</div>
    <div>Country</div>
    <div>Money</div>
    <div>Value</div>
    <button>Edit</button>
  </QuickProfile>
);
