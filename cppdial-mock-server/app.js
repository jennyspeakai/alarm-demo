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

io.on("connection", socket => {
  console.log("New client connected");
  //getResponseAndEmit(socket);
  socket.on('listening', () => {
    listenAndEmitSpeech(socket);
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


const listenAndEmitSpeech = async socket => {
    const audio = data.audio;
    try {
        const randomPick = Math.floor(Math.random() * audio.length);
        const spoken = audio[randomPick];
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
        setTimeout(() => socket.emit('doneListening'), (split.length * 500) + 1000);  // delay mic turning off
        setTimeout(() => getResponseAndEmit(socket, spoken, randomPick),(split.length * 700) + 1000);     // pretend to take a while to figure out response
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

const emitAllAlarms = async socket => {
    socket.emit('alarmsSuccess', data.alarms);
}


const getResponseAndEmit = async (socket, transcript, index = null) => {
    try {
        let res;
        if(index !== null) {
            res = data.responses[index];
        } else {
            if (transcript.includes('alarms' && ('show'||'display'||'see'))) {
                res = data.responses[0];
            } else if (transcript.includes('alarms' && ('delete'||'remove'||'clear'))) {
                res = data.responses[7];
            } else if (transcript.includes('alarm' && ('show'||'display'||'see') && ('one'||'first'))) {
                res = data.responses[2];
            } else if (transcript.includes('alarm' && ('create'||'add'))) {
                res = data.responses[4];
            } else if (transcript.includes('Seattle Half Marathon')) {
                res = data.responses[8];
            } else {
                res = {
                    action: 'default',
                    data: {},
                    tts: 'I\'m sorry, I couldn\'t understand your request',
                    followup: false
                }
            }
        }
        socket.emit('response', res)
    } catch (error) {
        console.error(`Error: ${error.code}`);
        socket.emit('error', error);
    }
  };

server.listen(port, () => console.log(`Listening on port ${port}`));