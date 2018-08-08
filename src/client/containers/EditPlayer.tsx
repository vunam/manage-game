import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {color, layout, spaces} from '../constants/styles';
import EditPLayerForm from '../forms/EditPLayerForm';
import {
  actions as playersActions,
  selectors as playersSelectors,
} from '../redux/players';
import {
  actions as teamsActions,
  selectors as teamsSelectors,
} from '../redux/teams';
import TeamType from '../types/Team';

interface Props {
  match: {
    params: {
      id: string;
    };
  };
  player: any;
  editPlayerAttempt: (id) => void;
  submitHandler: (formData: object, id: string) => void;
  getTeams: () => void;
  teams: [TeamType];
}

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

class Edit extends React.Component<Props> {
  componentDidMount() {
    const {match, editPlayerAttempt} = this.props;
    editPlayerAttempt(match.params.id);
  }
  render() {
    const {player, submitHandler, teams} = this.props;

    return (
      <StyledPage>
        <h1>Edit player</h1>
        {player && (
          <EditPLayerForm
            teams={teams}
            submitHandler={submitHandler}
            initialValues={player}
          />
        )}
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  teams: teamsSelectors.getTeams(state.teams),
  player: playersSelectors.getEditedPlayer(state.players),
});

const mapDispatchToProps = dispatch => ({
  getTeams: () => dispatch(teamsActions.getTeamsAttempt()),
  editPlayerAttempt: id => dispatch(playersActions.editPlayerAttempt(id)),
  submitHandler: formData => dispatch(playersActions.updateAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
