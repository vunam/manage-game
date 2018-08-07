import * as React from 'react';
import styled from 'styled-components';
import Message from './Message';
import {color, spaces} from '../constants/styles';

interface Props {
  list: [object];
}

const MessagesList = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export default ({
  list,
}: Props) =>
  list ? (
    <MessagesList>
      {list.length ?
        list.map(message => (
          <Message
            {...message}
          />
        )) : 'No messages.'}
    </MessagesList>
  ) : null;
