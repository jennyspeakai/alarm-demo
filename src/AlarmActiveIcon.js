import React from 'react';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import IconButton from '@material-ui/core/IconButton';

const AlarmActiveIcon = props => {
  // toggles whether the alarm is active or not
  const toggleAlarm = (e) => {
    e.stopPropagation();
    props.toggleActiveAlarm(props.alarm.id);
  }

  // change the alarm icon and its css depending on if it is active
  let alarmIcon = <AlarmOffIcon className="active-icon inactive"/>;
  if (props.alarm.active) {
    alarmIcon = <AlarmOnIcon className="active-icon" color="primary"/>;
  }
  return (
      <div style={{height:'100%'}} data-id={props.alarm.id} onClick={toggleAlarm}>
        <IconButton>
          {alarmIcon}
        </IconButton>
      </div>
  );
}

export default AlarmActiveIcon;
