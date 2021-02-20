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
    users.push(socket.id);

    socket.on('disconnect', () => {
    })

    socket.on('message', msg => {
        socket.broadcast.emit('message', msg);
    });

    socket.on('userJoined', (username) => {
        users[username] = socket.id;
        socket.broadcast.emit('userJoined', username);
    });
})

httpServer.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})