import React, { Component } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmActiveIcon from './AlarmActiveIcon.js';
import SelectedDates from './SelectedDates.js';
import { IconButton } from '@material-ui/core';

// Need to clean up the css here; mix between styled and inline
const AlarmDetails = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AlarmName = styled.h1`
    font-size: 4vw;
    color: white;
    padding: .3em;
    margin-top: 0;
`;

const AlarmTime = styled.h2`
    font-size: 4vw;
    color: white;
    padding: .3em;
    margin: 0 .5em;
`;

// Consider converting to stateless component (not sure if state needed for alarm edits?)
class AlarmItem extends Component {
  render() {
    const alarm = this.props.alarm[0];
    return (
      <AlarmDetails className="alarm-item">
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <AlarmActiveIcon alarm={alarm} toggleActiveAlarm={this.props.toggleActiveAlarm} />
          <IconButton className="delete-button"><DeleteIcon /></IconButton>
        </div>
        <AlarmName>{alarm.name}</AlarmName>
        <SelectedDates alarm={alarm} toggleSelectedDates={this.props.toggleSelectedDates} />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
          <AlarmTime>{alarm.time}</AlarmTime>
          <h1>{alarm.reoccuring ? 'Reoccuring' : ''}</h1>
        </div>
      </AlarmDetails>
    );
  }
}

export default AlarmItem;
