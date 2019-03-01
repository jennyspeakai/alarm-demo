import React, { PureComponent } from 'react';
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
class AlarmItem extends PureComponent {
  state = {
      id: null,
      name: '',
      dates: [],
      time: '',
      reoccuring: false,
      active: false
  }
  /*componentWillMount() {
    this.setState({...this.props.alarm[0]});
  }*/
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.alarm[0]});
  }
  
  deleteAlarm = () => {
    this.props.removeAlarm(this.props.alarm[0].id);
  }
  toggleReoccuring = () => {
    this.props.toggleReoccuring(this.props.alarm[0].id);
  }

  render() {
    const alarm = this.state;
    console.log(alarm);

    return (
      <AlarmDetails className="alarm-item">
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%'}}>
          <AlarmActiveIcon alarm={alarm} toggleActiveAlarm={this.props.toggleActiveAlarm} />
          <IconButton className="delete-button" onClick={this.deleteAlarm}><DeleteIcon /></IconButton>
        </div>
        <AlarmName>{alarm.name}</AlarmName>
        <SelectedDates alarm={alarm} toggleSelectedDates={this.props.toggleSelectedDates} />
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
          <AlarmTime>{alarm.time}</AlarmTime>
          <h1 style={alarm.reoccuring ? {color: 'white', cursor: 'pointer'} : {color: '#2f2f2f', cursor: 'pointer'}} onClick={this.toggleReoccuring}>Reoccuring</h1>
        </div>
      </AlarmDetails>
    );
  }
}

export default AlarmItem;
