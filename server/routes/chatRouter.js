const router = require('express').Router();
const jwt_decode = require('jwt-decode');
const User = require('../models/userModel');
const Room = require('../models/roomModel');
const HelperClass = require('../utils/Helper');
const Helper = new HelperClass();

router
    .post('/createNewRoom', async(req, res) => {
        try {
            const {token, roomName} = JSON.parse(req.headers['x-auth-token'])
            const decodedJwt = jwt_decode(token)
            let user = await User.findById(decodedJwt.id)

            if (roomName.length < 5) {
                return res.status(400).json({msg: 'Room name must contain at least 5 characters.'})
            }
            if (roomName.length > 20) {
                return res.status(400).json({msg: "Room name can't contain more that 20 characters."})
            }

            if (roomName.length >= 5 && roomName.length < 20) {
                let roomExists = await Helper.roomExists(roomName)
                if (roomExists) {
                    return res.status(400).json({msg: "Room with this name already exists."})
                }

                const userToSend = Helper.staticData(user, 'user')
                let room = await new Room({
                    name: roomName,
                    creator: userToSend,
                    users: [userToSend]
                })

                const roomToSend = Helper.staticData(room, 'room')
                room.save()

                await User.findByIdAndUpdate(decodedJwt.id, {rooms: [...user.rooms, roomToSend]}, false)
            }


            const updatedUser = await User.findById(decodedJwt.id)
            const lastMessages = Helper.userLastMessages(updatedUser)
            return res.json({
                updatedUser,
                lastMessages
            })
        } catch (err) {
            console.log(err)
        }
    })

    .post('/joinRoom', async(req, res) => {
        try {
            const {token, roomName} = JSON.parse(req.headers['x-auth-token'])
            const decodedJwt = jwt_decode(token)

            let user = await User.findById(decodedJwt.id)
            let roomExists = await Helper.roomExists(roomName)

            if (roomExists) {
                const room = await Room.find({name: roomName})
                const userInfo = Helper.staticData(user, 'user')
                const roomToSend = Helper.staticData(room[0], 'room')

                const {found, notFound} = Helper.userInRoomFind(roomName, room[0], userInfo)

                if (found === true) {
                    return res.status(400).json({msg: "You already are in this room."})
                }
                if (notFound === true && found !== true) {
                    await Room.findOneAndUpdate({name: roomName}, {users: [...room[0].users, userInfo]})
                    await User.findByIdAndUpdate(decodedJwt.id, {rooms: [...user.rooms, roomToSend]})
                }
            } if (roomExists === false) {
                return res.status(400).json({msg: 'Room with this name does not exist.'})
            }


            const updatedUser = await User.findById(decodedJwt.id)
            const lastMessages = Helper.userLastMessages(updatedUser)
            return res.json({
                updatedUser,
                lastMessages
            })
        } catch (err) {
            console.log(err)
        }
    })

    .post('/leaveRoom', async(req, res) => {
        try {
            const {token, roomName} = JSON.parse(req.headers['x-auth-token'])
            const decodedJwt = jwt_decode(token)

            const roomExists = await Helper.roomExists(roomName)
            if (roomExists) {
                const user = await User.findById(decodedJwt.id)
                const room = await Room.find({name: roomName})

                const userInfo = Helper.staticData(user, 'user')
                const roomInfo = Helper.staticData(room[0], 'room')
                const {found, notFound} = Helper.userInRoomFind(roomName, room[0], userInfo)
                console.log(found, notFound)
                if (found === true || found === undefined) {
                    const roomToSave = room[0].users.filter(userInRoom => {
                        console.log(userInfo,userInRoom)
                        userInRoom.email !== userInfo.email
                    })

                    console.log("HEEEEEEEEEEEREEEEEE!", room[0].users)
                    if (user.rooms.length === 1) {
                        user.rooms.pop(0)
                    }

                    for (let i = 0; i<=user.rooms.length; i++) {
                        if (user.rooms[i] !== undefined) {
                            if (user.rooms[i].id === roomInfo.id) {
                                user.rooms.splice(i, 1)
                                i--
                            }
                        }

                    }
                    user.save()
                    await Room.updateOne({name: roomName}, {users: roomToSave})
                } if (notFound === false && found !== true) {
                    console.log('!found')
                   return res.status(400).json({msg: "You are not member of this room."})
                }
            }
            if(roomExists === false) {
                return res.status(400).json({msg: "Room with this name does not exist."})
            }


            const updatedUser = await User.findById(decodedJwt.id)
            const lastMessages = Helper.userLastMessages(updatedUser)
            return res.json({
                updatedUser,
                lastMessages
            })
        } catch (err) {
            console.log(err)
        }
    })
    .post('/loadMessages', async (req, res) => {
        const {token, roomName} = JSON.parse(req.headers['x-auth-token'])
        const decodedJwt = jwt_decode(token)

        const user = await User.findById(decodedJwt.id)
        const room = await Room.find({name: roomName})
        const userInfo = Helper.staticData(user, 'user')

        return res.json(room)
    })


module.exports = router