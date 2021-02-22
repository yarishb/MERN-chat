const {addMessages, addUser, removeUser} = require('./userService')
const Message = require('../../models/messageModel')


module.exports = (io) => {
    let messages = {}
    io.on('connection', (socket) => {
        socket.on('join', ({user, room}, callback) => {
            if (!messages[room.name]) {
                messages[room.name] = []
            }
            const {error, newUser} = addUser(user, room, socket.id)
            if (error) {
                return () => {
                    socket.disconnect()
                    removeUser(socket.id)
                }
            }
            socket.join(newUser.room)
        })

        socket.on('leaveRoom', () => {
            removeUser(socket.id)
            socket.disconnect()
            console.log('User had left.')
        })

        socket.on('sendMessage', ({message, user, room}) => {
            const saveRoom = room

            let messageToSave = new Message({
                author: {
                    'name': user.name,
                    'email': user.email
                },
                postedAt: Date.now(),
                message: message,
                to: room.name
            })

            messages[room.name].push(messageToSave)
            const messagesToSend = messages[room.name]
            io.sockets.in(room.name).emit('message', ({messageToSave, messagesToSend, saveRoom}))
            addMessages(messageToSave, room)
        })

        socket.on('disconnect', () => {
            removeUser(socket.id)
            console.log('User had left.')
        })
    })
}
