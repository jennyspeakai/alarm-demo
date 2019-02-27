import React, { Component } from 'react';
//import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AlarmIcon from '@material-ui/icons/Alarm';
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import './HeaderFooter.css';


class Header extends Component {
    render() {
        const path = this.props.location.pathname;
        
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
        
        return (
            <div className="header">
                <div className="alarmListGroup">
                    {path !== '/alarms' && <IconButton component={Link} to="/alarms">
                        <AlarmIcon className="header-icon" />
                        <MoreVertIcon className="header-icon" />
                    </IconButton>}
                </div>
                <div className="navButtonGroup">
                    {path !== '/' && <IconButton className="home-button" component={Link} to="/">
                        <HomeIcon className="header-icon" />
                    </IconButton>}
                    <IconButton className="settings-button" component={Link} to="/settings">
                        <SettingsIcon className="header-icon" />
                    </IconButton>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
