import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const SelectedDates = props => {
    const alarm = props.alarm;
    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

    const toggleDates = (e) => {
        e.stopPropagation();
        props.toggleSelectedDates(alarm.id, e.currentTarget.dataset.id);
    }

    let range = [];
    days.forEach(day => {
        const selectClass = alarm.dates.includes(day) ? 'selected' : 'unselected'
        range.push(<span key={day} data-id={day} onClick={toggleDates}>
            <IconButton className={selectClass}>{day}</IconButton>
        </span>);
    })
    return (
        <div>{range}</div>
    );
}

export default SelectedDates;
