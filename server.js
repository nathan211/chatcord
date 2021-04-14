require('dotenv').config();
require('./db_connection');

const path = require('path');
const http = require('http');
const express = require('express');
const formatMessage = require('./utils/messages');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
  } = require('./utils/users');
const { insertUser } = require('./controllers/userController');

const app = express(); 
const server = http.createServer(app);
const io = require('socket.io')(server);

const botName = 'ChatCord Bot';

app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WEB SOCKET connection...');

    socket.on('enterUser', async (username) => {
        const result = await insertUser(username);

        if(!result.status) return socket.emit('insertUserFailed', 'User already exists.');

        socket.emit('insertUserSuccessfully', null);
    })
    
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        console.log('socketid join room', socket.id);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${username} has joined the chat.`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });
 
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    socket.on('disconnect', () => {
        io.emit('message', formatMessage(botName, 'A user has left the chat.'));
    })
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));