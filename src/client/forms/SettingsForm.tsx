import * as React from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {spaces} from '../styles';
import Button from '../components/Button';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';

export const FORM_NAME = 'settings';

const StyledForm = styled(Form)``;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({handleSubmit, submitHandler, admin = false}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    <Field name="team" label="Team name" component={InputField} />
    <Field name="country" label="Country" component={SelectField}>
      {countryList.map(({name, code}) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </Field>
    <Field name="user" label="Username" component={InputField} />
    {admin && [
      <Field key="role" name="role" label="Role" component={SelectField}>
        <option value="owner">Owner</option>
        <option value="manager">League manager</option>
        <option value="admin">Admin</option>
      </Field>,
      <Field key="money" name="money" label="Money" component={InputField} />,
    ]}
    <Button>Submit</Button>
  </StyledForm>
);

export default reduxForm({
  form: FORM_NAME,
})(FormOuter);
