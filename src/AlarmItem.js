import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AlarmActiveIcon from './AlarmActiveIcon.js';
import SelectedDates from './SelectedDates.js';

// Need to clean up the css here; mix between styled and inline
const AlarmName = styled.h1`
    font-size: 3em;
    margin-top: 0;
`;

const AlarmTime = styled.h2`
    font-size: 3em;
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

  // if alarm is empty, redirect to alarms
  componentWillMount() {
    this.setState({...this.props.alarm});
  }
  componentWillReceiveProps(nextProps) {
    this.setState({...nextProps.alarm});
  }
  
  deleteAlarm = () => {
    this.props.removeAlarm(this.props.alarm.id);
  }
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
        <AlarmName>{alarm.name}</AlarmName>
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
