import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import { Grid } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './HeaderFooter.css';

const propTypes = {
    // Props injected by SpeechRecognition
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    transcript: PropTypes.string,
    finalTranscript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

const options = {
    autoStart: false
}

// consider making statelesss
class Footer extends PureComponent {
    state = {
        wakeWordActive: false,
        transcript: '',
        volume: 0,
        input: null
    }

    componentDidMount() {
        this.setState({input: <Input className="mic-input" disableUnderline={true} fullWidth={true} onKeyPress={this.onTextInput} style={{height: '100%'}}/>});
    }

    componentWillReceiveProps() {
        this.setState({
            wakeWordActive: this.props.wakeWordActive,
            transcript: this.props.audio,
            volume: this.props.volume,
            input: this.state.transcript && <span className="mic-input">{this.state.transcript}</span>
        });
    }

    activateWakeWord = () => {
        //this.propsTypes.resetTranscript();
        //this.propsTypes.startListening();
        console.log(this.props.transcript)
        this.setState({wakeWordActive: true});
    }

    onTextInput = (e) => {
        const text = e.target.value;
        if(this.state.wakeWordActive) {
            this.setState({
                wakeWordActive: true
            });
        }
        if(e.key === 'Enter') {
            console.log(e.target.value);
            this.setState({
                transcript: text,
                wakeWordActive: false
            });
            this.props.sendTranscription(e.target.value);
            //this.props.stopListening();
        }
    }

    onVoiceInput = (e) => {
        console.log(e.target.value);
        if (e.target.value.includes('end')) {
            this.setState({wakeWordActive: false})
        }
    }

    focusInput = () => {
        if (!this.state.wakeWordActive) {
            this.setState({
                transcript: '',
                input: <Input className="mic-input" disableUnderline={true} fullWidth={true} onKeyPress={this.onTextInput} />
            });
        }
    }

    render() {
        return (
            <Grid container direction="row" justify="flex-start" alignItems="flex-end" className="footer" style={{flexWrap: 'nowrap'}}>
                <Button variant="outlined" disabled={this.state.wakeWordActive} audio-volume={this.state.volume} audio-speed={this.state.volume} className="mic-button" onClick={this.props.startListening}>
                    <MicIcon className="mic-icon" />
                </Button>
                <div className="input-group" onClick={this.focusInput}>
                    {this.state.input}
                </div>
            </Grid>
        );
    }
}

Footer.propTypes = propTypes;

export default SpeechRecognition(options)(Footer);
