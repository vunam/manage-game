import * as React from 'react';
import styled from 'styled-components';

const StyledForm = styled.div`
  background: red;
`;

export default () => (
  <StyledForm>
    <h1>Login</h1>
    <p>Type in a password</p>
    <label>Username</label>
    <input name="user" type="text" />
    <label>Password</label>
    <input name="password" type="password" />
  </StyledForm>
);
