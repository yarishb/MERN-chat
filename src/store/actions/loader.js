import {LOADING_TRUE, LOADING_FALSE} from './types'


export const setLoading = (type) => async(dispatch) => {
	if (type) {
		dispatch({
			type: LOADING_TRUE
		})
	} 
	if (!type) {
		dispatch({
			type: LOADING_FALSE
		})
	}
}