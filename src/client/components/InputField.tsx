import * as React from 'react';
import styled from 'styled-components';
import {color, spaces, typography} from '../styles';

const Row = styled.div`
  margin: ${spaces.sm} 0;
  display: flex;
  flex-direction: column;
`;

const InputStyled = styled.input`
  margin: ${spaces.xs} 0;
  padding: ${spaces.xxs} ${spaces.xs};
  width: 100%;
  border: 1px solid ${color.gray};
  font-size: ${typography.normal};
  border-radius: ${spaces.xxxs};
  max-width: 400px;
`;

const InputField = ({input, label, errorMessage, ...props}) => (
  <Row>
    <label>{label}</label>
    <InputStyled {...input} {...props} />
  </Row>
);

export default InputField;
