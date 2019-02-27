import React from 'react';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AlarmOffIcon from '@material-ui/icons/AlarmOff';
import IconButton from '@material-ui/core/IconButton';

const AlarmActiveIcon = props => {
  const toggleAlarm = (e) => {
    e.stopPropagation();
    props.toggleActiveAlarm(e.currentTarget.dataset.id);
  }

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
