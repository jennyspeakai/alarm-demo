import React from 'react';
import IconButton from '@material-ui/core/IconButton';

const SelectedDates = props => {
    const alarm = props.alarm;
    const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];

    // toggle the active dates
    const toggleDates = (e) => {
        e.stopPropagation();
        props.toggleSelectedDates(alarm.id, e.currentTarget.dataset.id);
    }

    let range = [];
    // sets the class for each of the days as active or inactive
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
