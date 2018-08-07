import * as React from 'react';
import styled from 'styled-components';
import * as dayjs from 'dayjs';
import MessageType from '../types/Message';
import {spaces, typography} from '../constants/styles';

const MessageStyled = styled.div`
`;

const Message = ({
  date,
  message,
}: MessageType) => (
  <MessageStyled>
    {dayjs(date).format('YYYY-MM-DD HH:mm')} - {message}
  </MessageStyled>
)

export default Message;
