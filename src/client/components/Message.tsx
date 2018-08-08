import * as dayjs from 'dayjs';
import * as React from 'react';
import styled from 'styled-components';
import {spaces, typography} from '../constants/styles';
import MessageType from '../types/Message';

const MessageStyled = styled.div``;

const Message = ({date, message}: MessageType) => (
  <MessageStyled>
    {dayjs(date).format('YYYY-MM-DD HH:mm')} - {message}
  </MessageStyled>
);

export default Message;
