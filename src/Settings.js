import React, { Component } from 'react';

class Settings extends Component {
  render() {
    // Temporary placeholder page
    // Will pull out in-line stylings when creating actual settings page
    return (
      <div>
        <h1 style={{textAlign: 'center', fontSize: '3vw'}}>Settings</h1>
          <table style={{width: '100%'}}>
            <tbody>
            <tr>
              <td style={{paddingLeft: '30%', paddingRight: '20px', fontSize: '1.5vw', textAlign: 'right'}}>Culture</td>
              <td style={{paddingRight: '30%', paddingLeft: '20px', fontSize: '1.5vw'}}>en-US</td>
            </tr>
            <tr>
              <td style={{paddingLeft: '30%', paddingRight: '20px', fontSize: '1.5vw', textAlign: 'right'}}>TTS Voice</td>
              <td style={{paddingRight: '30%', paddingLeft: '20px', fontSize: '1.5vw'}}>Robot Samantha</td>
            </tr>
            <tr>
              <td style={{paddingLeft: '30%', paddingRight: '20px', fontSize: '1.5vw', textAlign: 'right'}}>Wake Word</td>
              <td style={{paddingRight: '30%', paddingLeft: '20px', fontSize: '1.5vw'}}>active</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Settings;
