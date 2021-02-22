import authReducer from './auth';
import loadingReducer from './loader';
import alertReducer from './alert';
import chatReducer from "./chat";

import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    auth: authReducer,
    loading: loadingReducer,
    alert: alertReducer,
    chat: chatReducer,
});

export default rootReducer;