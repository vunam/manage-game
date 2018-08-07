import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {spaces} from '../constants/styles';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';
import {
  actions as userActions,
  selectors as userSelectors,
} from '../redux/user';
import SignupForm from '../forms/SignupForm';

import TeamType from '../types/Team';

interface Props {
  getTeams: () => void;
  deleteUser: (id) => void;
  createTeamHandler: () => void;
  user: {
    team: TeamType;
  };
  teams: [TeamType];
}

interface State {}

const StyledPage = styled.div``;

const Inner = styled.div`
  padding: ${spaces.sm};
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
`;

class Teams extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    const {teams, createTeamHandler, deleteUser} = this.props;

    return (
      <StyledPage>
        <Inner>
          <h2>Create team</h2>
          <SignupForm submitHandler={createTeamHandler} />
          <h2>Manage teams</h2>
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
                  <tr key={team.id}>
                    <td>{team.name}</td>
                    <td>{team.country}</td>
                    <td>{team.money}</td>
                    <td><button>Edit</button></td>
                    <td><button onClick={() => deleteUser(team.user)}>Delete</button></td>
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
  getTeams: () => dispatch(teamsActions.getTeamsAttempt()),
  deleteUser: (id) => dispatch(userActions.deleteAttempt(id)),
  createTeamHandler: formData =>
    dispatch(userActions.createAttempt({...formData, manage: true})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);
