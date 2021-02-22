const Room = require('../../models/roomModel');

const addMessages = async (messageToSave, room) => {
    try {
        await Room.findOneAndUpdate({name: room.name}, {messages: [...room.messages, messageToSave]})
    } catch (err) {
        console.log(err)
    }
}

const users = []

const addUser = (user, room, id) => {
    try {
        const newUser = {id: id, name: user.name, room: room.name, email: user.email}

        const existingUser = users.find((userInArr) => {
            return userInArr.room === newUser.room && userInArr.email === newUser.email
        })

        if (existingUser !== undefined) return {error: 'User is already in room.'};
        users.push(newUser)
        return {newUser}
    } catch (err) {
        console.log(err)
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if(index !== -1) return users.splice(index, 1)[0];
}


module.exports = {addMessages, addUser, removeUser}
