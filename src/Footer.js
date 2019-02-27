import React, { Component } from 'react';
import MicIcon from '@material-ui/icons/Mic';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './HeaderFooter.css';

// consider making statelesss
class Footer extends Component {
    state = {
        input: ''
    }

    render() {
        return (
            <div className="footer">
                <Button variant="outlined" className="mic-button" onClick={this.activateWakeWord}>
                    <MicIcon className="mic-icon" />
                </Button>
                <div className="input-group">
                    <Input className="mic-input" disableUnderline={true} fullWidth={true} value={this.state.input} onKeyPress={(e) => { if(e.key === 'Enter') console.log(e.target.value)}}></Input>
                </div>
            </div>
        );
    }
}

export default Footer;
