import * as React from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {spaces} from '../styles';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import Button from '../components/Button';

export const FORM_NAME = 'signup';

const StyledForm = styled(Form)``;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({handleSubmit, submitHandler}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    <Field name="team" label="Team name" component={InputField} />
    <Field name="country" label="Country" component={SelectField}>
      <option value="">Choose country</option>
      {countryList.map(({name, code}) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Field>
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
