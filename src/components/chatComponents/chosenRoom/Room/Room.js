import React, {useEffect, useState} from 'react';
import styles from './Room.module.scss';
import io from "socket.io-client";

import RoomHeader from "../ChosenRoomHeader/RoomHeader";
import {setAlert} from "../../../../store/actions/alert";
import {loadMessages, newLastMessage} from "../../../../store/actions/chat";
import {connect} from 'react-redux';
import {Messages, OldMessages} from "../Messages/Messages";

const ENDPOINT = 'https://sl-chat.herokuapp.com/';
let socket;

const Room = ({room, user, newLastMessage}) => {
    const [message, setMessage] = useState('');
    const [newMessages, setMessages] = useState([]);

    useEffect(() => {
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
        socket.emit('join', ({user, room}), (err) => {
            err && console.log('')
        })
        setMessages([])
    }, [room.name]);

    useEffect(() => {
        socket.on('message', ({messageToSave, messagesToSend,saveRoom}) => {
            if (messageToSave.to === room.name && room.name === saveRoom.name) {
                setMessages(messagesToSend)
                user.lastMessages[room.name] = {'lastMessage': messageToSave}
                newLastMessage(user)
            }
        })
    }, [newMessages, room.name]);

    useEffect(() => {
        return () => {
            socket.emit('leaveRoom')
        }
    }, [room.name])

    const sendMessage = (e) => {
        e.preventDefault()
        if (message) {
            socket.emit('sendMessage', {message, user, room})
            setMessage('')
        }
    };


    return (
        <div className={styles.Room}>
            <RoomHeader room={room} />
            <div className={styles.messages}>
                <OldMessages roomMessages={room.messages} user={user}/>
                <Messages newMessages={newMessages} user={user}/>
            </div>
            <div className={styles.RoomInputBox}>
                <div className={styles.RoomInputBottom}>
                    <div className={styles.sendMessage} onClick={(e) => sendMessage(e)}/>
                    <input
                        value={message}
                        className={styles.RoomInput}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={'Write a message...'}
                        onKeyPress={e => e.key === 'Enter' && sendMessage(e)}
                    />
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    room: state.chat.room
})

export default connect(mapStateToProps, {setAlert, loadMessages, newLastMessage})(Room)