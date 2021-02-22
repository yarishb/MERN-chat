import * as ACTION_TYPES from './types';
import {setAlert} from "./alert";
import {checkLogged} from './auth'
import Axios from "axios";
import {setLoading} from "./loader";


export const open_modal = (typeOfModal) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.ROOM_MODAL_OPEN,
        payload: typeOfModal
    })
}


export const close_modal = (typeOfModal) => (dispatch) => {
    dispatch(checkLogged())
    dispatch({
        type: ACTION_TYPES.ROOM_MODAL_CLOSE,
        payload: typeOfModal
    })
}

export const newLastMessage = (user) => (dispatch) => {
    dispatch({
        type: ACTION_TYPES.NEW_LAST_MESSAGE,
        payload: user
    })
}

export const loadMessages = (roomName) => async (dispatch) => {
    try {
        const token = localStorage.getItem('auth-token')
        const body = JSON.stringify({roomName, token})
        const room = await Axios.post('http://localhost:5555/chat/loadMessages', null, {headers: {'x-auth-token': body}})
        dispatch({
            type: ACTION_TYPES.LOAD_MESSAGES,
            payload: room.data[0]
        })
    } catch (err) {
        dispatch(setAlert(err.response.data.msg, "error"))
    }
}


export const chosenRoom = (room) => async (dispatch) => {
    const roomName = room !== undefined && room.name
    dispatch({
        type: ACTION_TYPES.CHOSEN_ROOM,
        payload: room
    })

    roomName !== undefined && dispatch(loadMessages(roomName))
}

export const chatManager = (roomName, route, type) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const token = localStorage.getItem('auth-token')
        const body = JSON.stringify({roomName, token})
        const user = await Axios.post(`http://localhost:5555/chat/${route}`, null, {headers: {'x-auth-token': body}})
        dispatch({
            type: ACTION_TYPES.AUTH_CHECK,
            payload: user.data
        })
        dispatch(setLoading(false))
        dispatch(close_modal())
        if (type === 'join') return dispatch(setAlert("Successfully joined the room!", "success"))
        if (type === 'new')  return dispatch(setAlert("Successfully created the room!", "success"))
        if (type === 'leave') {
            dispatch(setAlert("Successfully left the room!", "success"))
            return dispatch(chosenRoom(undefined))
        }

    } catch (err) {
        dispatch(setLoading(false))
        dispatch(setAlert(err.response.data.msg, "error"))
    }
}
