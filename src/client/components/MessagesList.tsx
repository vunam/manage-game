import * as React from 'react';
import styled from 'styled-components';
import {color, spaces} from '../styles';
import MessageType from '../types/Message';
import Message from './Message';

interface Props {
  list: [MessageType];
}

const MessagesList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
  max-height: 160px;
  overflow-y: scroll;
`;

export default ({list}: Props) =>
  list ? (
    <MessagesList>
      {list.length
        ? list.map((message, key) => (
            <Message key={`${key + message.message}`} {...message} />
          ))
        : 'No messages.'}
    </MessagesList>
  ) : null;
