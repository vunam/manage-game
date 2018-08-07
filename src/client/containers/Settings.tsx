import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {color, layout, spaces} from '../constants/styles';
import SettingsForm from '../forms/SettingsForm';
import {actions, selectors} from '../redux/user';

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

const Settings = ({user, submitHandler}) => (
  <StyledPage>
    <h1>Team settings</h1>
    <p>Update your team settings here</p>
    {user && (
      <SettingsForm
        submitHandler={submitHandler}
        initialValues={{
          team: user.team.name,
          country: user.team.country,
          user: user.username,
        }}
      />
    )}
  </StyledPage>
);

const mapStateToProps = state => ({
  user: selectors.getUser(state.user),
});

const mapDispatchToProps = dispatch => ({
  submitHandler: formData => dispatch(actions.updateAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
