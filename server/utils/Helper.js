const Room = require('../models/roomModel');

class Helper {
    staticData (from, type) {
        if (type === 'room') {
            return {
                id: from.id,
                name: from.name,
                users: from.users,
                messages: from.messages
            }
        }
        if (type === 'user') {
            return {
                id: from._id,
                name: from.name,
                email: from.email,
            }
        }
    }

     async roomExists(roomName) {
        const roomExist = await Room.exists({name: roomName})
         console.log(roomName)
        return roomExist
    }

    userInRoomFind (roomName, room, userInfo) {
        let found = undefined
        let notFound = undefined

        room.users.forEach(userInRoomInfo => {
            const userId = userInfo.id.toString()
            const userInRoomInfoId = userInRoomInfo.id.toString()
            if (userId === userInRoomInfoId) {
                found = true
                notFound = false
            } else if (userId !== userInRoomInfoId) {
                notFound = true
            }
        })

        return {found, notFound}
    }

    async userLastMessages (user) {
        const lastMessages = {}

        for (const userRoom of user.rooms) {
            const room = await Room.find({name: userRoom.name})
            lastMessages[userRoom.name] = {'lastMessage': room[0].messages[room[0].messages.length-1]}
            console.log(userRoom)
        }

        return lastMessages
    }
}





module.exports = Helper