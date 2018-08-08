import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {color, layout, spaces} from '../styles';
import SettingsForm from '../forms/SettingsForm';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';
import {actions, selectors} from '../redux/user';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
  user: any;
  editedUser: any;
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
    const {user, editedUser, submitHandler} = this.props;

    return (
      <StyledPage>
        <h1>Edit team</h1>
        {editedUser && (
          <SettingsForm
            submitHandler={formData => submitHandler(formData, editedUser.id)}
            initialValues={{
              team: editedUser.team.name,
              country: editedUser.team.country,
              user: editedUser.username,
              role: editedUser.role,
              money: editedUser.team.money,
            }}
            admin={user.role === 'admin'}
          />
        )}
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  user: selectors.getUser(state.user),
  editedUser: selectors.getEditedUser(state.user),
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
