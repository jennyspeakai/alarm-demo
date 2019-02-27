import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AlarmItem from './AlarmItem';
import AlarmList from './AlarmList';
import Clock from './Clock';
import Settings from './Settings';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import Default from './Default';

class App extends Component {
    state = {
        input: '',
        tts: 'This is a response',
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
    render() {
        return (
        <div className="app">
            <Header></Header>
            <div className="content">
                <Route exact path="/" component={Clock} />
                <Route path="/alarm/:id" render={(props) =>
                    <AlarmItem {...props} alarm={this.state.alarms.filter(alarm => alarm.id.toString() === props.match.params.id)} toggleActiveAlarm={this.toggleActiveAlarm} toggleSelectedDates={this.toggleSelectedDates} />} />
                <Route exact path="/alarms" render={(props) =>
                    <AlarmList {...props} alarms={this.state.alarms} toggleActiveAlarm={this.toggleActiveAlarm} toggleSelectedDates={this.toggleSelectedDates} />} />
                <Route path="/settings" component={Settings} />
                <Route path="/response" render={(props) =>
                    <Default {...props} response={this.state.tts} />} />
            </div>
            <Footer></Footer>
        </div>
        );
    }
}

export default App;
