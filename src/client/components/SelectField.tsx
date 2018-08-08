import * as React from 'react';
import styled from 'styled-components';
import {spaces, typography, color} from '../styles';

const Row = styled.div`
  position: relative;
  margin: ${spaces.sm} 0;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  &:before {
    position: absolute;
    bottom: ${spaces.sm};
    right: ${spaces.xxs};
    content: "▼";
    font-size: ${typography.extraSmall};
  }
`;

const SelectStyled = styled.select`
  -webkit-appearance: none;
  margin: ${spaces.xs} 0;
  padding: ${spaces.xxs} ${spaces.xs};
  width: 100%;
  border: 1px solid ${color.gray};
  font-size: ${typography.normal};
  border-radius: ${spaces.xxxs};
`;

const InputField = ({input, label, errorMessage, ...props}) => (
  <Row>
    <label>{label}</label>
    <SelectStyled {...input} {...props} />
  </Row>
);

export default InputField;
