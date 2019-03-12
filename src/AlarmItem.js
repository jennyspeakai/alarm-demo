import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmActiveIcon from './AlarmActiveIcon.js';
import SelectedDates from './SelectedDates.js';

// Styled component for the name of the alarm
const AlarmName = styled.h1`
    font-size: 3em;
    margin-top: 0;
`;

// Styled component for the time of the alarm
const AlarmTime = styled.h2`
    font-size: 3em;
    padding: .3em;
    margin: 0 .5em;
`;

// Consider converting to stateless component
class AlarmItem extends PureComponent {
  state = {
      id: null,
      name: '',
      dates: [],
      time: '',
      reoccuring: false,
      active: false
  }

  // if alarm is empty, redirect to alarms
  componentWillMount() {
    this.setState({...this.props.alarm});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.alarm});
  }
  
  // callback to change the parent state name of the alarm
  changeName = (e) => {
    const newName = e.currentTarget.innerHTML;
    this.setState({name: newName});
    this.props.updateName(newName, this.state.id);
  }

  // unselect the editable component
  loseEditFocus = (e) => {
    if(e.key === 'Enter') {
      e.target.blur();
    }
  }

  // deletes this alarm
  deleteAlarm = () => {
    this.props.removeAlarm(this.props.alarm.id);
  }

  // toggle the occurance
  toggleReoccuring = () => {
    this.props.toggleReoccuring(this.props.alarm.id);
  }

  render() {
    const alarm = this.state;

    return (
      <Grid container className="alarm-item" direction="column" justify="space-around" alignItems="center">
        <Grid container direction="row" alignItems="center" justify="space-around">
          <AlarmActiveIcon alarm={alarm} toggleActiveAlarm={this.props.toggleActiveAlarm} />
          <IconButton className="delete-button" onClick={this.deleteAlarm}><DeleteIcon /></IconButton>
        </Grid>
        <AlarmName suppressContentEditableWarning={true} contentEditable={true} onBlur={this.changeName} onKeyDown={this.loseEditFocus}>{alarm.name}</AlarmName>
        <SelectedDates alarm={alarm} toggleSelectedDates={this.props.toggleSelectedDates} />
        <Grid container direction="row" alignItems="baseline" justify="center">
          <AlarmTime>{alarm.time}</AlarmTime>
          <h1 style={alarm.reoccuring ? {color: 'white', cursor: 'pointer'} : {color: '#2f2f2f', cursor: 'pointer'}} onClick={this.toggleReoccuring}>Reoccuring</h1>
        </Grid>
      </Grid>
    );
  }
}

export default AlarmItem;
