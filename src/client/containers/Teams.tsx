import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {spaces} from '../styles';
import SignupForm from '../forms/SignupForm';
import countryList from '../../constants/countryList';
import {actions as historyActions} from '../redux/history';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';
import {
  actions as userActions,
  selectors as userSelectors,
} from '../redux/user';
import Button from '../components/Button';

import TeamType from '../types/Team';

interface Props {
  getTeams: () => void;
  editUser: (id) => void;
  deleteUser: (id) => void;
  createTeamHandler: () => void;
  user: {
    team: TeamType;
  };
  teams: [TeamType];
}

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

class Teams extends React.Component<Props> {
  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const {teams, editUser, createTeamHandler, deleteUser} = this.props;

    return (
      <StyledPage>
        <Inner>
          <h2>Create user &amp; team</h2>
          <SignupForm submitHandler={createTeamHandler} />
          <h2>Manage users / teams</h2>
          <Table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Money</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              {teams &&
                teams.map(team => (
                  <tr key={team.user}>
                    <td>{team.name}</td>
                    <td>{countryList.find(({ code}) => team.country === code).name}</td>
                    <td>{team.money}</td>
                    <td>
                      <Button onClick={() => editUser(team.user)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteUser(team.user)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Inner>
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  teams: teamsSelectors.getTeams(state.teams),
});

const mapDispatchToProps = dispatch => ({
  editUser: id => dispatch(historyActions.nextRoute(`/edit-team/${id}`)),
  getTeams: () => dispatch(teamsActions.getTeamsAttempt()),
  deleteUser: id => dispatch(userActions.deleteAttempt(id)),
  createTeamHandler: formData =>
    dispatch(userActions.createAttempt({...formData, manage: true})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
