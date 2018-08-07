import * as React from 'react';
import styled from 'styled-components';
import {spaces, typography} from '../constants/styles';

interface Props {
}

interface State {
  currentSellValue: number;
}

const PlayerStyled = styled.li`
  display: flex;
  justify-content: space-between;
  margin: ${spaces.m} 0;
`;


const Message = ({
  closeHandler,
}) => (
  <div>
    SOme message
  </div>
)

export default Message;
