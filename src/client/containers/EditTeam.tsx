import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {color, layout, spaces} from '../constants/styles';
import SettingsForm from '../forms/SettingsForm';
import {actions, selectors} from '../redux/user';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
  user: any;
  getUserAttempt: (id) => void;
  submitHandler: (formData: object, id: string) => void;
}

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

class Edit extends React.Component<Props> {
  componentDidMount() {
    const {match, getUserAttempt} = this.props;
    getUserAttempt(match.params.id);
  }
  render() {
    const {user, submitHandler} = this.props;

    return (
      <StyledPage>
        <h1>Edit team</h1>
        {user && (
          <SettingsForm
            submitHandler={formData => submitHandler(formData, user.id)}
            initialValues={{
              team: user.team.name,
              country: user.team.country,
              user: user.username,
            }}
          />
        )}
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getEditedUser(state.user),
});

const mapDispatchToProps = dispatch => ({
  getUserAttempt: id => dispatch(actions.getUserAttempt(id)),
  submitHandler: (formData, id) =>
    dispatch(actions.updateAttempt({id, manage: true, ...formData})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
