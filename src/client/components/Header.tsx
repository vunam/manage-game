import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { color, layout, spaces } from '../constants/styles';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${color.primary};
  height: ${layout.header};
  width: 100%;
  padding: ${spaces.sm};
`;

const Logo = styled.h1`
  margin: 0;
  color: ${color.light};
`;

const Nav = styled.nav`
  color: ${color.light};
`;

export default () => (
  <Header>
    <Logo>Football</Logo>
    <Nav>
      <Link to="/">Dashboard</Link>
      <Link to="/market">Player market</Link>
      <Link to="/logout">Log out</Link>
    </Nav>
  </Header>
);
