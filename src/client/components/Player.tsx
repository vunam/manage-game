import * as React from 'react';
import styled from 'styled-components';
import Button from './Button';
import {toCurrency} from '../helpers/locale';
import {spaces, typography} from '../styles';
import PlayerType from '../types/Player';

interface Props {
  withTeam?: boolean;
  currentTeam?: string;
  clickHandler: (
    player: string,
    available?: boolean,
    sellValue?: number,
  ) => void;
  buyHandler?: (player: string) => void;
  deleteHandler?: (player: string) => void;
  admin: boolean;
}

interface State {
  currentSellValue: number;
}

const PlayerStyled = styled.li`
  display: flex;
  justify-content: space-between;
  margin: ${spaces.m} 0;
`;

const ItemWide = styled.div`
  flex: 2;
`;

const ItemSmall = styled.div`
  flex: 1;
  padding: 0 ${spaces.xs};
  white-space: nowrap;
`;

const SellInput = styled.input`
  width: 90px;
  margin: 0 ${spaces.xs};
  font-size: ${typography.normal};
  text-align: right;
`;

class Player extends React.Component<PlayerType & Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      currentSellValue: props.sellValue,
    };
  }

  changeSell = ({target}) =>
    this.setState(() => ({currentSellValue: Number(target.value)}));

  render() {
    const {
      id,
      clickHandler,
      status,
      currentTeam,
      buyHandler,
      team,
      teamName,
      firstName,
      lastName,
      countryName,
      type,
      age,
      value,
      withTeam,
      sellValue,
      admin,
      deleteHandler,
    } = this.props;

    const {currentSellValue} = this.state;
    const available = status === 'AVAILABLE';
    const sameTeam = currentTeam === team;

    return (
      <PlayerStyled>
        {withTeam && <ItemSmall>{teamName}</ItemSmall>}
        <ItemSmall>{type}</ItemSmall>
        <ItemWide>
          {firstName} {lastName}
        </ItemWide>
        <ItemWide>{countryName}</ItemWide>
        <ItemSmall>{age}</ItemSmall>
        <ItemSmall>{toCurrency(value)}</ItemSmall>
        <ItemSmall>
          {sameTeam && !available ? (
            <SellInput
              key="input"
              type="text"
              defaultValue={`${value}`}
              onChange={this.changeSell}
            />
          ) : (
            toCurrency(sellValue)
          )}
        </ItemSmall>
        {admin ? (
          [
            <ItemSmall key="edit">
              <Button onClick={() => clickHandler(id)}>Edit</Button>
            </ItemSmall>,
            <ItemSmall key="delete">
              <Button onClick={() => deleteHandler(id)}>Delete</Button>
            </ItemSmall>,
          ]
        ) : (
          <ItemSmall>
            {sameTeam ? (
              <Button
                key="button"
                onClick={() => clickHandler(id, !available, currentSellValue)}
              >
                {!available ? 'Add Transfer' : 'Retract'}
              </Button>
            ) : (
              available && <Button onClick={() => buyHandler(id)}>BUY</Button>
            )}
          </ItemSmall>
        )}
      </PlayerStyled>
    );
  }
}

export default Player;
