import * as ACTION_TYPES from '../actions/types';

const initialState = {
    open_modal: false,
    typeModal: undefined,
    user: undefined,
    room: undefined,
}



const chatReducer = (state=initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case ACTION_TYPES.ROOM_MODAL_OPEN:
            return {
                ...state,
                open_modal: true,
                typeModal: payload
            }

        case ACTION_TYPES.ROOM_MODAL_CLOSE:
            return {
                ...state,
                open_modal: false
            }
        case ACTION_TYPES.JOIN_ROOM:
            return {
                ...state,
                user: payload
            }
        case ACTION_TYPES.CREATE_NEW_ROOM:
            return {
                ...state,
                user: payload
            }
        case ACTION_TYPES.CHOSEN_ROOM:
            return {
                ...state,
                room: payload
            }
        case ACTION_TYPES.LOAD_MESSAGES:
            return {
                ...state,
                room: payload
            }
        default:
            return state
    }
}


export default chatReducer;