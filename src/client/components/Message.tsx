import * as React from 'react';
import styled from 'styled-components';
import {spaces, typography} from '../constants/styles';

interface Props {
  date: string;
  message: string;
}

const MessageStyled = styled.div`
`;


const Message = ({
  date,
  message,
}: Props) => (
  <MessageStyled>
    {date} - {message}
  </MessageStyled>
)

export default Message;
