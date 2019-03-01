import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
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
        wakeWordActive: false
    }

    componentWillReceiveProps(newProps) {
        this.setState({wakeWordActive: newProps.wakeWordActive})
    }

    activateWakeWord = () => {
        //this.propsTypes.resetTranscript();
        //this.propsTypes.startListening();
        console.log(this.props.transcript)
        this.setState({wakeWordActive: true});
    }

    onTextInput = (e) => {
        this.setState({input: e.target.value});
        if(e.key === 'Enter') {
            this.props.sendTranscription(e.target.value);
            this.props.stopListening();
            this.setState({wakeWordActive: false});
        }
    }

    onVoiceInput = (e) => {
        console.log(e.target.value);
        if (e.target.value.includes('end')) {
            this.setState({wakeWordActive: false})
        }
    }

    render() {
        /*const { finalTranscription, startListening, browserSupportsSpeechRecognition } = this.props;
        
        if (!browserSupportsSpeechRecognition) {
            return null;
        }*/

        let input = <Input className="mic-input" disableUnderline={true} fullWidth={true} onKeyPress={this.onTextInput}></Input>;
        if (this.props.audio) {
            input = <span className="mic-input">{this.props.audio}</span>;
        }

        return (
            <div className="footer">
                <Button variant="outlined" disabled={this.props.wakeWordActive} className="mic-button" onClick={this.props.startListening}>
                    <MicIcon className="mic-icon" />
                </Button>
                <div className="input-group">
                    {input}
                </div>
            </div>
        );
    }
}

Footer.propTypes = propTypes;

export default SpeechRecognition(options)(Footer);
