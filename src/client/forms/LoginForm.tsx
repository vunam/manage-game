import * as React from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import {spaces} from '../styles';
import InputField from '../components/InputField';
import Button from '../components/Button';

const FORM_NAME = 'login';

const StyledForm = styled(Form)``;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({handleSubmit, submitHandler}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    <Field name="user" label="Username" component={InputField} />

    <Field
      name="password"
      label="Password"
      component={InputField}
      type="password"
    />

    <Button>Submit</Button>
  </StyledForm>
);

export default reduxForm({
  form: FORM_NAME,
})(FormOuter);
