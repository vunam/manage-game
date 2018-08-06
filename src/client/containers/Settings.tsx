import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SettingsForm from '../forms/SettingsForm';
import {actions, selectors} from '../redux/user';
import { color, layout, spaces } from '../constants/styles';

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

const Settings = ({ user, submitHandler }) => (
  <StyledPage>
    <h1>Settings</h1>
    <p>Update your team settings here</p>
    {user && <SettingsForm submitHandler={submitHandler} initialValues={{
      team: user.team.name,
      country: user.country,
      user: user.username,
    }} />}
  </StyledPage>
);

const mapStateToProps = state => ({
  user: selectors.getUser(state.user),
});

const mapDispatchToProps = dispatch => ({
  submitHandler: (formData) => dispatch(actions.createAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
