import * as React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {color, layout, spaces} from '../constants/styles';
import EditPLayerForm from '../forms/EditPLayerForm';
import {actions as playersActions, selectors as playersSelectors} from '../redux/players';

interface Props {
  match: {
    params: {
      id: string;
    }
  };
  player: any;
  editPlayerAttempt: (id) => void;
  submitHandler: (formData: object, id: string) => void;
}

const StyledPage = styled.div`
  padding: ${spaces.sm};
`;

class Edit extends React.Component<Props> {
  componentDidMount() {
    const { match, editPlayerAttempt } = this.props;
    editPlayerAttempt(match.params.id);
  }
  render() {
    const {player, submitHandler} = this.props;

    return (
      <StyledPage>
        <h1>Edit player</h1>
        {player && (
          <EditPLayerForm
            submitHandler={submitHandler}
            initialValues={player}
          />
        )}
      </StyledPage>
    );
  }
}

const mapStateToProps = state => ({
  player: playersSelectors.getEditedPlayer(state.players),
});

const mapDispatchToProps = dispatch => ({
  editPlayerAttempt: id =>
    dispatch(playersActions.editPlayerAttempt(id)),
  submitHandler: (formData) =>
    dispatch(playersActions.updateAttempt(formData)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Edit);
