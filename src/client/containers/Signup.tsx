import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import SignupForm from '../forms/SignupForm';
import {actions, selectors} from '../redux/user';
import { color, layout, spaces } from '../constants/styles';

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

const SignUpPage = ({ submitHandler }) => (
  <StyledPage>
    <h1>Sign up</h1>
    <SignupForm submitHandler={submitHandler} />
  </StyledPage>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  submitHandler: (formData) => dispatch(actions.createAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
