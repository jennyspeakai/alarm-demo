import React, { Component } from 'react';
import styled from 'styled-components';

const ClockGroup = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ClockTime = styled.h1`
    font-size: 11vw;
    color: white;
    padding: .3em;
`;

const PeriodGroup = styled.div`
    font-size: 4vw;
    font-weight: bold;
;`

const PeriodItem = styled.div`
    padding: .2em 1em;
    margin: .2em;
    background: #333333;
    color: black;

    ${({ active }) => active && `
        background: #0077ff;
        color: white;
    `}
`;

class Clock extends Component {
    state = {
        date: new Date(),
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <ClockGroup>
                <ClockTime id='clock-time'>{this.state.date.toLocaleTimeString().slice(0, -3)}</ClockTime>
                <PeriodGroup>
                    <PeriodItem active={this.state.date.getHours() < 12}>AM</PeriodItem>
                    <PeriodItem active={this.state.date.getHours() >= 12}>PM</PeriodItem>
                </PeriodGroup>
            </ClockGroup>
        );
    }
}

export default Clock;
