import * as React from 'react';
import styled from 'styled-components';
import { Form, Field, reduxForm } from 'redux-form';
import { color, layout, spaces } from '../constants/styles';

const FORM_NAME = 'signup';

const StyledForm = styled(Form)`
`;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({
  handleSubmit,
  submitHandler,
}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    <Row>
      <label htmlFor="team">Team name</label>
      <Field name="team" component="input" />
    </Row>
    <Row>
      <label htmlFor="user">Username</label>
      <Field name="user" component="input" />
    </Row>
    <Row>
      <label htmlFor="password">Password</label>
      <Field name="password" component="input" type="password" />
    </Row>
    <button>Submit</button>
  </StyledForm>
);

export default reduxForm({
  form: FORM_NAME,
})(FormOuter)
