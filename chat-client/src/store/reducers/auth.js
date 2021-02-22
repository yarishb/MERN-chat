import * as ACTION_TYPES from '../actions/types.js'

const initialState = {
	switch_auth: false,
    token: undefined,
    user: undefined,
    user_verified: undefined,
    isLogged:undefined,
    modal_open: false
}

const authReducer = (state=initialState, action) => {
    const { type, payload } = action
    switch (type) {
    	case ACTION_TYPES.SWITCH_AUTH:
    		return {
    			...state,
    			switch_auth: !state.switch_auth
    		}
        case ACTION_TYPES.AUTH_LOGIN:
            return {
                ...state,
                token: payload.token,
                user: payload.user,
                isLogged: true
            }
        case ACTION_TYPES.AUTH_CHECK:
            return {
                ...state,
                user: payload,
                isLogged: true,
            }
        case ACTION_TYPES.AUTH_CHECK_FAIL:
            return {
                ...state,
                isLogged: false
            }
        case ACTION_TYPES.MODAL_VERIFICATION_OPEN:
            return {
                ...state,
                modal_open:true
            }
        case ACTION_TYPES.MODAL_VERIFICATION_CLOSE:
            return {
                ...state,
                modal_open:false
            }
        case ACTION_TYPES.AUTH_USER_VERIFIED:
            return {
                ...state, 
                user_verified: true
            }
        case ACTION_TYPES.NEW_LAST_MESSAGE:
            return {
                ...state,
                user: payload
            }
        default: 
            return state;
    }
}


export default authReducer;