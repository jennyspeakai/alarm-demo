import React, { Component } from 'react'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import socketIOClient from "socket.io-client";
import Speech from 'speak-tts';
import AlarmItem from './AlarmItem';
import AlarmList from './AlarmList';
import Clock from './Clock';
import Settings from './Settings';
import Header from './Header';
import Footer from './Footer';
import Default from './Default';
import './App.css';

let socket;// = socketIOClient('http://127.0.0.1:3001');
const url = 'http://127.0.0.1:3001';

// TTS
const speech = new Speech();
if(!speech.hasBrowserSupport()) {
    console.log('speech synthesis not supported');
}
// ToDo: put tts settings in the settings page
speech.init({
    voice: 'Google UK English Female'
});

class App extends Component {
    state = {
        audio:  '',
        volume: 0,
        tts: '',
        followup: false,
        wakeWordActive: false,
        alarms: []
    }

    // gets the initial list of alarms
    componentWillMount() {
        socket = socketIOClient(url);
        socket.emit('getAlarms');
        socket.on('alarmsSuccess', alarms => {
            this.setState({alarms});
            socket.disconnect();
        })
    }

    // callback function to send typed transcription to the backend
    sendTranscription = (transcript) => {
        this.setState({
            audio: transcript,
            wakeWordActive: false
        });
        socket = socketIOClient(url);
        if (this.state.followup) {
            socket.emit('followup');
        } else {
            socket.emit('sendTranscript', transcript);
        }
        // need to support context? (or handled by backend)
        socket.on('response', this.doAction);
    }

    // callback function to start listening to audio
    // (gets a random utterance from the mock backend)
    startListening = () => {
        this.setState({
            wakeWordActive: true,
            audio: '',
            volume: 0
        });
        socket = socketIOClient(url);
        //socket.connect();
        if (this.state.followup) {
            socket.emit('followup');
        } else if (this.props.location.pathname === '/alarms') {
            socket.emit('listening', 1)
        } else {
            socket.emit('listening');
        }
        socket.on('audio', data => {
            this.setState({
                audio: `${this.state.audio} ${data.text}`,
                volume: data.volume
            });
        });
        socket.on('response', this.doAction);
        socket.on('doneListening', () => {
            this.setState({wakeWordActive: false});
        })
    }

    // do the action specified by the backend
    // (this would be the returned command)
    doAction = (data) => {
        this.setState({
            tts: data.tts,
            followup: data.followup
        })
        switch(data.action) {
            case 'delete_alarm':    // not sure if data will return the deleted item or what remains
            case 'delete_alarms':
                this.setState({alarms: data.data});
                // fall through
            case 'show_alarms':
                this.props.history.push('/alarms');
                break;
            case 'create_alarm':
                this.setState({alarms: this.state.alarms.concat(data.data)});
                // fall through
            case 'show_alarm':
                this.props.history.push(`/alarm/${data.data.id}`);
                break;
            case 'update_alarm':
                this.setState({
                    alarms: this.state.alarms.map((alarm) => {
                        if (alarm.id === data.data.id) {
                            return data.data;
                        }
                        return alarm;
                    })
                })
                break;
            case 'default':
            default:
                this.props.history.push('/response');
                break;
        }
        speech.speak({text: this.state.tts});
        // Bug?: needed to disconnect to prevent duplication of responses
        socket.disconnect();
    }

    // updates the name of the selected alarm+
    updateName = (name, index) => {
        this.setState({
            alarms: this.state.alarms.map((alarm) => {
                if (alarm.id === index) {
                    return {...alarm, name};
                }
                return alarm;
            })
        })
    }

    // toggles the selected alarm to be on or off
    toggleActiveAlarm = (index) => {
        this.setState({
            alarms: this.state.alarms.map((alarm) => {
                if (alarm.id === index) {
                    return {...alarm, active: !alarm.active};
                }
                return alarm;
            })
        })
    }

    // toggles the active dates for the selected alarm
    toggleSelectedDates = (index, day) => {
        this.setState({
            alarms: this.state.alarms.map((alarm) => {
                if (alarm.id === index) {
                    return {...alarm, dates: alarm.dates.includes(day) ? alarm.dates.filter(date => date !== day) : alarm.dates.concat(day)}
                }
                return alarm;
            })
        })
    }

    // toggles the occurance of the selected alarm
    toggleReoccuring = (index) => {
        this.setState({
            alarms: this.state.alarms.map((alarm) => {
                if (alarm.id === index) {
                    return {...alarm, reoccuring: !alarm.reoccuring};
                }
                return alarm;
            })
        })
    }

    // removes the selected alarm from the alarm list
    removeAlarm = (index) => {
        this.setState({
            alarms: this.state.alarms.filter(alarm => alarm.id !== index)
        })
        this.props.history.push('/alarms');
    }

    // ToDo: add clickable button to allow adding alarms
    // adds a new alarm to the alarm list
    addAlarm = (alarm) => {
        this.setState({
            alarms: this.state.alarms.push(alarm)
        })
    }

    render() {
        return (
        <div className="app">
            <Grid container direction="column" justify="space-evenly" alignItems="stretch" style={{height: '100vh', flexWrap: 'nowrap'}}>
                <Header></Header>
                <div className="content">
                    <Switch>
                        <Route exact path="/" component={Clock} />
                        <Route path="/alarm/:id" render={(props) =>
                            <AlarmItem {...props} alarm={this.state.alarms.find(alarm => alarm.id.toString() === props.match.params.id)}
                            toggleActiveAlarm={this.toggleActiveAlarm}
                            toggleSelectedDates={this.toggleSelectedDates}
                            toggleReoccuring={this.toggleReoccuring}
                            removeAlarm={this.removeAlarm}
                            updateName={this.updateName} />} />
                        <Route exact path="/alarms" render={(props) =>
                            <AlarmList {...props} alarms={this.state.alarms}
                            toggleActiveAlarm={this.toggleActiveAlarm}
                            toggleSelectedDates={this.toggleSelectedDates}
                            toggleReoccuring={this.toggleReoccuring}
                            removeAlarm={this.removeAlarm}
                            updateName={this.updateName} />} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/response" render={(props) =>
                            <Default {...props} response={this.state.tts} />} />
                        <Redirect from='/*' to='/' />
                    </Switch>
                </div>
                <Footer
                    wakeWordActive={this.state.wakeWordActive}
                    audio={this.state.audio}
                    volume={this.state.volume}
                    startListening={this.startListening}
                    sendTranscription={this.sendTranscription}>
                </Footer>
            </Grid>
        </div>
        );
    }
}

export default withRouter(App);
