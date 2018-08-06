import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import LoginForm from '../forms/LoginForm';
import {actions, selectors} from '../redux/user';
import { Link } from 'react-router-dom';
import { color, layout, spaces } from '../constants/styles';

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

const LoginPage = ({ submitHandler }) => (
  <StyledPage>
    <h1>Login</h1>
    <LoginForm submitHandler={submitHandler} />
    or sign up <Link to="/signup">here</Link>
  </StyledPage>
);

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  submitHandler: (formData) => dispatch(actions.loginAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage);
