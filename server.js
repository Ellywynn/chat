const path = require('path');
const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer,
    {
        cors: {
            origin: "*"
        }
    });

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

const users = {};

io.on('connection', socket => {


    socket.on('disconnect', () => {
        socket.broadcast.emit('userLeft', users[socket.id]);
    })

    socket.on('message', msg => {
        socket.broadcast.emit('message', users[socket.id], msg);
    });

    socket.on('userJoined', (username) => {
        users[socket.id] = username;
        socket.broadcast.emit('userJoined', users[socket.id]);
        socket.emit('userAccepted', socket.id);
    });
})

httpServer.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})