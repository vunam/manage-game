import * as React from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {spaces} from '../styles';

const FORM_NAME = 'signup';

const StyledForm = styled(Form)``;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({handleSubmit, submitHandler}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    <Row>
      <label htmlFor="team">Team name</label>
      <Field name="team" component="input" />
    </Row>
    <Row>
      <label htmlFor="country">Country</label>
      <Field name="country" component="select">
        <option value="">Choose country</option>
        {countryList.map(({name, code}) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </Field>
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
})(FormOuter);
