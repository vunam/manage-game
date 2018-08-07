import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {
  actions as notificationActions,
  selectors as notificationSelectors,
} from '../redux/notification';
import {spaces, typography, color} from '../constants/styles';

const NotificationStyled = styled.div`
  padding: ${spaces.sm};
  color: ${color.light};
  font-weight: 400;
  background: ${color.secondary};
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: ${typography.normal};
`;

const Close = styled.button``;

const Notification = ({close, message}) =>
  message ? (
    <NotificationStyled>
      {message}
      <Close onClick={close}>Close</Close>
    </NotificationStyled>
  ) : null;

export default Notification