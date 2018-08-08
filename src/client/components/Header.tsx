import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {color, layout, spaces} from '../styles';

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
  flex-shrink: 0;
`;

const Nav = styled.nav`
  color: ${color.light};
`;

const StyledLink = styled(Link)`
  padding: ${spaces.m};
  color: ${color.light};
  font-weight: bold;
  text-decoration: none;
  &:last-child {
    padding-right: 0;
  }
`;

export default ({user}) => (
  <Header>
    <Logo>Football Manager</Logo>
    {user && (
      <Nav>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/market">Player market</StyledLink>
        {(user.role === 'manager' || user.role === 'admin') && (
          <StyledLink to="/teams">Teams</StyledLink>
        )}
        {user.role === 'admin' && <StyledLink to="/admin">Admin</StyledLink>}
        <StyledLink to="/settings">Settings</StyledLink>
        <StyledLink to="/logout">Log out</StyledLink>
      </Nav>
    )}
  </Header>
);
