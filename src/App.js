import React, { Component } from 'react'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom';
import socketIOClient from "socket.io-client";
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

class App extends Component {
    state = {
        audio: '',
        tts: '',
        wakeWordActive: false,
        alarms: []
    }

    componentWillMount() {
        socket = socketIOClient(url);
        socket.emit('getAlarms');
        socket.on('alarmsSuccess', alarms => {
            this.setState({alarms});
            socket.disconnect();
        })
    }

    /*componentDidMount() {
        socket.on('ttsResponse', data => {
            this.setState({tts: data});
            this.props.history.push('/response');
        });
    }*/

    // concider putting these in an api component
    sendTranscription(transcript) {
        socket.emit('sendTranscript', transcript);
    }

    startListening = () => {
        socket = socketIOClient(url);
        //socket.connect();
        this.setState({
            wakeWordActive: true,
            audio: ''
        });
        socket.emit('listening');
        socket.on('audio', data => {
            this.setState({audio: `${this.state.audio} ${data}`});
        });
        socket.on('response', this.doAction);
        socket.on('doneListening', () => {
            this.setState({wakeWordActive: false});
        })
    }

    doAction = (data) => {
        console.log(data);
        this.setState({tts: data.tts})
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
            case 'default':
            default:
                this.props.history.push('/response');
                break;
                // need to disconnect to prevent duplication of responses?
        }
        console.log(this.props.history);
        // if followup is true; don't disconnect?
        socket.disconnect();
    }

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

    removeAlarm = (index) => {
        this.setState({
            alarms: this.state.alarms.filter(alarm => alarm.id !== index)
        })
        this.props.history.push('/alarms');
    }

    addAlarm = (alarm) => {
        this.setState({
            alarms: this.state.alarms.push(alarm)
        })
    }

    // display next upcoming alarm
    render() {
        return (
        <div className="app">
            <Header></Header>
            <div className="content">
                <Switch>
                    <Route exact path="/" component={Clock} />
                    <Route path="/alarm/:id" render={(props) =>
                        <AlarmItem {...props} alarm={this.state.alarms.filter(alarm => alarm.id.toString() === props.match.params.id)}
                        toggleActiveAlarm={this.toggleActiveAlarm}
                        toggleSelectedDates={this.toggleSelectedDates}
                        toggleReoccuring={this.toggleReoccuring}
                        removeAlarm={this.removeAlarm} />} />
                    <Route exact path="/alarms" render={(props) =>
                        <AlarmList {...props} alarms={this.state.alarms}
                        toggleActiveAlarm={this.toggleActiveAlarm}
                        toggleSelectedDates={this.toggleSelectedDates}
                        toggleReoccuring={this.toggleReoccuring}
                        removeAlarm={this.removeAlarm} />} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/response" render={(props) =>
                        <Default {...props} response={this.state.tts} />} />
                    <Redirect from='/*' to='/' />
                </Switch>
            </div>
            <Footer
                wakeWordActive={this.state.wakeWordActive}
                audio={this.state.audio}
                startListening={this.startListening}
                sendTranscription={this.sendTranscription}></Footer>
        </div>
        );
    }
}

export default withRouter(App);
