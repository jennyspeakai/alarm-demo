const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 3001;
const index = require("./routes/index");
const data = require("./data")

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

// backend would maintain the stack and know the current alarm
let alarm;

io.on("connection", socket => {
  console.log("New client connected");
  socket.on('listening', (context = 0) => {
    listenAndEmitSpeech(socket, context);
  });
  socket.on('followup', () => {
    listenAndEmitSpeech(socket, alarm, true);
  });
  socket.on('getAlarms', () => {
    emitAllAlarms(socket);
  })
  socket.on('sendTranscript', (transcript) => {
    setTimeout(() => getResponseAndEmit(socket, transcript), 500);  // delay response from typed text
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


const listenAndEmitSpeech = async (socket, id, followup = false) => {
    let mockAudio = data.audio[0];
    if (followup) {
        mockAudio = data.followup.find(text => text.id === id);
    } else if (id === 1) {
        mockAudio.concat(data.audio[1]);
    }
    try {

        const randomPick = Math.floor(Math.random() * mockAudio.length);
        const spoken = followup ? mockAudio.text : mockAudio[randomPick];
        const split = spoken.split(' ');
        let timeout = 0;
        // this is to similate input coming in a word at at a time
        split.forEach(word => {
            timeout += Math.random() * 1000;
            const audio = {
                text: word,
                volume: timeout/1000
            }
            setTimeout(() => socket.emit('audio', audio), timeout);
        });
        setTimeout(() => socket.emit('doneListening'), (split.length * 700) + 1000);  // delay mic turning off
        if (followup) {
            setTimeout(() => getFollowupResponseAndEmit(socket, mockAudio.response),(split.length * 700) + 1000);    
        } else {
            setTimeout(() => getResponseAndEmit(socket, spoken, randomPick),(split.length * 700) + 1000);     // pretend to take a while to figure out response
        }
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

const emitAllAlarms = async socket => {
    socket.emit('alarmsSuccess', data.alarms);
}

const getFollowupResponseAndEmit = async (socket, index) => {
    try {
        res = data.responses[index];
        socket.emit('response', res);
    } catch (error) {
        console.error(`Error: ${error.code}`);
        socket.emit('error', error);
    }
}

const getResponseAndEmit = async (socket, transcript, index = null) => {
    try {
        let res;
        if(index !== null) {
            res = data.responses[index];
        } else {
            // need more cases
            if (transcript.includes('alarms' && ('show'||'display'||'see'))) {
                res = data.responses[0];
            }/* else if (transcript.includes('alarms' && ('delete'||'remove'||'clear'))) {
                res = data.responses[7];
            }*/ else if (transcript.includes('alarm' && ('show'||'display'||'see') && ('one'||'first'))) {
                res = data.responses[2];
            } else if (transcript.includes('alarm' && ('create'||'add'))) {
                res = data.responses[4];
            } else if (transcript.includes('Fun Run')) {
                res = data.responses[12];
            } else {
                res = {
                    action: 'default',
                    data: {},
                    tts: 'I\'m sorry, I couldn\'t understand your request',
                    followup: false
                }
            }
        }
        alarm = res.data.id ? res.data.id : null;
        socket.emit('response', res)
    } catch (error) {
        console.error(`Error: ${error.code}`);
        socket.emit('error', error);
    }
};

server.listen(port, () => console.log(`Listening on port ${port}`));