import React from 'react';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import IconButton from '@material-ui/core/IconButton';

const AlarmActiveIcon = props => {
  const toggleAlarm = (e) => {
    e.stopPropagation();
    props.toggleActiveAlarm(e.currentTarget.dataset.id);
  }

  let alarmIcon = <AlarmOffIcon className="alarm-icon inactive"/>;
    if (props.alarm.active) {
      alarmIcon = <AlarmIcon className="alarm-icon" color="primary"/>;
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
