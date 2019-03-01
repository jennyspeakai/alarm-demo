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
    getResponseAndEmit(socket, transcript);
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
            setTimeout(() => socket.emit('audio', word), timeout);
        });
        setTimeout(() => socket.emit('doneListening'), (split.length * 800) + 500);
        setTimeout(() => getResponseAndEmit(socket, spoken, randomPick),(split.length * 800) + 1000);
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

const emitAllAlarms = async socket => {
    socket.emit('alarmsSuccess', data.alarms)
}


const getResponseAndEmit = async (socket, transcript, index = null) => {
    console.log(index);
    try {
        let res;
        if(index !== null) {
            res = data.responses[index];
        } else {
            if (transcript.includes('alarms' && ('show'|'display'|'see'))) {
                res = data.response[0];
            } else {
                res = {
                    action: 'default',
                    data: {},
                    tts: 'I\'m sorry, I couldn\'t understand your request',
                    followup: false
                }
            }
        }
        //console.log(res.data);
        //socket.emit("request", res.data); // Emitting a new message. It will be consumed by the client
        //const interval = setInterval(() => getResponseAndEmit(socket), 10000);
        socket.emit('response', res)
    } catch (error) {
        console.error(`Error: ${error.code}`);
        socket.emit('error', error);
    }
  };

server.listen(port, () => console.log(`Listening on port ${port}`));