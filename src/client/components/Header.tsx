import * as React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {color, layout, spaces} from '../styles';

interface Props {
  user?: {
    role: string;
  };
  location: {
    pathname: string;
  };
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  background: ${color.primary};
  height: ${layout.header};
  width: 100%;
  align-items: center;
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

interface StyledLinkProps {
  to: string;
  pathname?: string;
}

const StyledLink = styled(Link)`
  padding: ${spaces.m};
  color: ${({to, pathname}: StyledLinkProps) => (to === pathname ? color.amber : color.light)};
  font-weight: bold;
  text-decoration: none;
  &:last-child {
    padding-right: 0;
  }
`;

export default ({user, location}: Props) => (
  <Header>
    <Logo>Football Manager</Logo>
    {user && (
      <Nav>
        <StyledLink to="/dashboard" pathname={location.pathname}>
          Dashboard
        </StyledLink>
        <StyledLink to="/market" pathname={location.pathname}>
          Player market
        </StyledLink>
        {(user.role === 'manager' || user.role === 'admin') && (
          <StyledLink to="/teams" pathname={location.pathname}>
            Teams
          </StyledLink>
        )}
        {user.role === 'admin' && (
          <StyledLink to="/admin" pathname={location.pathname}>
            Admin
          </StyledLink>
        )}
        <StyledLink to="/settings" pathname={location.pathname}>
          Settings
        </StyledLink>
        <StyledLink to="/logout">Log out</StyledLink>
      </Nav>
    )}
  </Header>
);
