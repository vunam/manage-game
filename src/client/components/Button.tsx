import * as dayjs from 'dayjs';
import * as React from 'react';
import styled from 'styled-components';
import {spaces, typography, color} from '../styles';

const ButtonStyled = styled.button`
  min-width: 100px;
  padding: ${spaces.xs} ${spaces.s};
  color: ${color.light};
  border: 0;
  font-weight: bold;
  background: ${color.dark};
  letter-spacing: 1px;
  &:hover {
    opacity: 0.8;
  }
`;

const Button = (props) => (
  <ButtonStyled {...props} />
);

export default Button;
