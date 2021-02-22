const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);
const socketService = require('./services/socketService/socketServer')(io)

app.use('/api', require('./routes/authRouter'));
app.use('/chat', require('./routes/chatRouter'));


const mongooseConnection = require('./utils/mongooseConnect')();
PORT = process.env.PORT || 5555
server.listen(PORT, () => {
    console.log('server is running on port ' + PORT);
})

