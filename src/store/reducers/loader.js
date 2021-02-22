import { LOADING_TRUE, LOADING_FALSE } from '../actions/types'

const initialState = {
	loading: false,
}

const loadingReducer = (state=initialState, action) => {
    const { type, payload } = action

	switch(type) {
		case LOADING_TRUE:
			return {
				...state,
				loading: true
			}
		case LOADING_FALSE:
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}

export default loadingReducer