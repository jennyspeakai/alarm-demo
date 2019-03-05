import React, { PureComponent } from 'react';
//import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AlarmIcon from '@material-ui/icons/Alarm';
import HomeIcon from '@material-ui/icons/Home';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import './HeaderFooter.css';


class Header extends PureComponent {
    render() {
        const path = this.props.location.pathname;

        return (
            <Grid container direction="row" justify="space-between" alignItems="baseline" className="header">
                <div className="alarmListGroup">
                    {path !== '/' && <IconButton className="home-button" component={Link} to="/">
                        <HomeIcon className="header-icon" />
                    </IconButton>}
                    {path !== '/alarms' && <IconButton component={Link} to="/alarms">
                        <AlarmIcon className="header-icon" />
                        <MoreVertIcon className="header-icon" />
                    </IconButton>}
                </div>
                <div className="navButtonGroup">
                    <IconButton className="settings-button" component={Link} to="/settings">
                        <SettingsIcon className="header-icon" />
                    </IconButton>
                </div>
            </Grid>
        );
    }
}

export default withRouter(Header);
