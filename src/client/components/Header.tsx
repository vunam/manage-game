import * as React from 'react';
import styled from 'styled-components';
import { color, layout, spaces } from '../constants/styles';

const Header = styled.header`
  background: ${color.primary};
  height: ${layout.header};
  width: 100%;
  padding: ${spaces.sm};
`;

const Logo = styled.h1`
  margin: 0;
  color: ${color.light};
`;

export default () => (
  <Header>
    <Logo>Football</Logo>
  </Header>
);
