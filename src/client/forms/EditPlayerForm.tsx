import * as React from 'react';
import {Field, Form, reduxForm} from 'redux-form';
import styled from 'styled-components';
import countryList from '../../constants/countryList';
import {spaces} from '../styles';

const FORM_NAME = 'edit-player';

const StyledForm = styled(Form)``;

const Row = styled.div`
  margin: ${spaces.sm} 0;
`;

const FormOuter = ({handleSubmit, submitHandler, teams}) => (
  <StyledForm onSubmit={handleSubmit(submitHandler)}>
    {teams &&
      teams.length && (
        <Row>
          <label htmlFor="team">Team</label>
          <Field name="team" component="select">
            <option value="">None</option>
            {teams.map(({name, id}) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </Field>
        </Row>
      )}
    <Row>
      <label htmlFor="country">Country</label>
      <Field name="country" component="select">
        {countryList.map(({name, code}) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </Field>
    </Row>
    <Row>
      <label htmlFor="type">Type</label>
      <Field name="type" component="select">
        <option value="Goal">Goalkeeper</option>
        <option value="Def">Defender</option>
        <option value="Att">Attacker</option>
        <option value="Mid">Midfielder</option>
      </Field>
    </Row>
    <Row>
      <label htmlFor="value">Value</label>
      <Field name="value" component="input" />
    </Row>
    <Row>
      <label htmlFor="sellValue">Sell Value</label>
      <Field name="sellValue" component="input" />
    </Row>
    <Row>
      <label htmlFor="age">Age</label>
      <Field name="age" component="input" />
    </Row>
    <Row>
      <label htmlFor="firstName">First name</label>
      <Field name="firstName" component="input" />
    </Row>
    <Row>
      <label htmlFor="lastName">Last name</label>
      <Field name="lastName" component="input" />
    </Row>
    <button>Submit</button>
  </StyledForm>
);

export default reduxForm({
  form: FORM_NAME,
})(FormOuter);
