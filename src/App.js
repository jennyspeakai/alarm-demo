import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import AlarmIcon from '@material-ui/icons/Alarm';
import HomeIcon from '@material-ui/icons/Home';
import MicIcon from '@material-ui/icons/Mic';
//import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import AlarmItem from './AlarmItem';
import AlarmList from './AlarmList';
import Clock from './Clock';
import Settings from './Settings';

const styles = {
    alarmList: {
        listStyle: 'none',
        flex: '1 1 auto',
    },
    alarmItem: {
        float: 'left',
    },
    alarmIcon: {
        fontSize: '3vw',
        minWidth: '33px',
        minHeight: '33px',
    },
    homeButton: {
        color: 'white',
    },
    settingsButton: {
        color: 'white',
        marginRight: '40px',
    },
    micButton: {
        width: '7vw',
        height: '7vw',
        minWidth: '55px',
        minHeight: '55px',
        padding: '.2em',
        borderWidth: '2px',
        borderColor: 'white',
        borderRadius: '12px',
        color: 'white',
        position: 'relative',
        bottom: '12px',
        left: '12px',
    },
    micIcon: {
        fontSize: '6vw',
        minWidth: '45px',
        minHeight: '45px',
    }
};

class App extends Component {
    state = {
        wakeWordActive: false,
        alarms: [
            {
                id: 0,
                name: 'Weekday Wake Up Alarm',
                dates: ['M', 'T', 'W', 'Th', 'F'],
                time: '7:00 am',
                reoccuring: true,
                active: true
            },
            {
                id: 1,
                name: 'Pick up kids',
                dates: ['M', 'W', 'F'],
                time: '5:30 pm',
                reoccuring: true,
                active: false
            },
            {
                id: 2,
                name: 'Soccer game',
                dates: ['T'],
                time: '7:45 pm',
                reoccuring: false,
                active: true
            },
            {
                id: 3,
                name: 'Go to Bed',
                dates: ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'],
                time: '11:00 pm',
                reoccuring: true,
                active: true
            },
        ]
    }

    activateWakeWord = () => {
        this.setState({wakeWordActive: true});
    }

    toggleActiveAlarm = (index) => {
        this.setState({
            alarms: this.state.alarms.map((alarm, i) => {
                if (i.toString() === index) {
                    return {...alarm, active: !alarm.active};
                }
                return alarm;
            })
        })
    }

    toggleSelectedDates = (index, day) => {
        this.setState({
            alarms: this.state.alarms.map((alarm, i) => {
                if (i === index) {
                    return {...alarm, dates: alarm.dates.includes(day) ? alarm.dates.filter(date => date !== day) : alarm.dates.concat(day)}
                }
                return alarm;
            })
        })
    }

    // display defaults to spoken tts
    // display active/inactive alarms with different icons
    render() {
        const classes = this.props.classes;
        // eventually use media to show a certain number depending on width
        /*const alarms = this.state.alarms.slice(0, 3).map((alarm, index) =>
            <li key={index} className={classes.alarmItem}>
                <IconButton aria-label={alarm.name} color="primary">
                    <AlarmIcon className={classes.alarmIcon} />
                </IconButton>
            </li>
        )
        if (this.state.alarms.length > 3) {
            alarms.push(<li key='-1'>
                <IconButton color="primary" component={Link} to="/alarms">
                    <MoreHorizIcon className={classes.alarmIcon} />
                </IconButton>
            </li>)
        }*/
        console.log(this.props.history);
        console.log(this.props.location);

        return (
        <div className="app">
            <div className="header">
                <ul className={classes.alarmList}>
                    <IconButton color="primary" className={classes.alarmItem} component={Link} to="/alarms">
                        <AlarmIcon className={classes.alarmIcon} /><MoreVertIcon className={classes.alarmIcon} />
                    </IconButton>
                </ul>
                <div className="navButtonGroup">
                    <IconButton className={classes.homeButton} component={Link} to="/">
                        <HomeIcon className={classes.alarmIcon} />
                    </IconButton>
                    <IconButton className={classes.settingsButton} component={Link} to="/settings">
                        <SettingsIcon className={classes.alarmIcon} />
                    </IconButton>
                </div>
            </div>
            <div className="content">
                <Route exact path="/" component={Clock} />
                <Route path="/alarm/:id" render={(props) =>
                    <AlarmItem {...props} alarm={this.state.alarms.filter(alarm => alarm.id.toString() === props.match.params.id)} toggleActiveAlarm={this.toggleActiveAlarm} toggleSelectedDates={this.toggleSelectedDates} />} />
                <Route exact path="/alarms" render={(props) =>
                    <AlarmList {...props} alarms={this.state.alarms} toggleActiveAlarm={this.toggleActiveAlarm} toggleSelectedDates={this.toggleSelectedDates} />} />
                <Route path="/settings" component={Settings} />
            </div>
            <div className="footer">
                <Button variant="outlined" className={classes.micButton} onClick={this.activateWakeWord}>
                    <MicIcon className={classes.micIcon}/>
                </Button>
                <div className="input-group">
                    <Input style={{color: 'white', fontSize: '3vw'}} disableUnderline={true} fullWidth={true} value={this.state.input} onKeyPress={(e) => { if(e.key === 'Enter') console.log(e.target.value)}}></Input>
                </div>
            </div>
        </div>
        );
    }
}

export default withStyles(styles)(App);
