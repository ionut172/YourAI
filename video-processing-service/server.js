const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('frame', (data) => {
        // Save the incoming frame as an image file for testing purposes
        const base64Data = data.replace(/^data:image\/jpeg;base64,/, '');
        const filePath = path.join(__dirname, 'frames', `${Date.now()}.jpg`);

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error('Failed to save frame', err);
            } else {
                console.log('Frame saved:', filePath);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
