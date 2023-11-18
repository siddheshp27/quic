const quic = require('node-quic');
const fs = require('fs');

const QUIC_SERVER_PORT = 1234;
const QUIC_SERVER_ADDRESS = '127.0.0.1';
const VIDEO_NAME = 'sample.mp4';

const videoData = [];

quic.send(QUIC_SERVER_PORT, QUIC_SERVER_ADDRESS, VIDEO_NAME)
    .onData((data, buffer) => {
        videoData.push(buffer);
    })
    .then(() => {
        fs.writeFileSync('received_video.mp4', Buffer.concat(videoData));
        console.log('Video saved successfully as received_video.mp4');
    })
    .onError((error) => {
        console.error('Error fetching video data from QUIC server:', error);
    });
