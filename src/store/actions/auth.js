import * as ACTION_TYPES from './types.js'
import { config } from '../../utils/utils'
import { setAlert } from "./alert";

import { setLoading } from './loader'

import Axios from 'axios';

export const switch_auth = () => {
	return {
		type: ACTION_TYPES.SWITCH_AUTH
	}
}

export const closeVerificationModal = () => {
	return {
		type: ACTION_TYPES.MODAL_VERIFICATION_CLOSE
	}
}

export const userVerify = () => {
	return {
		type: ACTION_TYPES.AUTH_USER_VERIFIED
	}
}

export const checkLogged = () => async (dispatch) => {
	try {
		dispatch(setLoading(true))

		let token = localStorage.getItem("auth-token")
		if (token === null) {
			localStorage.setItem("auth-token", "");
			token = ""
		}

		const tokenRes = await Axios.post(
			'https://sl-chat.herokuapp.com/api/validToken',
			null, {headers: {'x-auth-token': token}}
		)

		if (tokenRes.data) {
			const userRes = await Axios.get(
				'https://sl-chat.herokuapp.com/api/',
				{headers: {'x-auth-token': token}}
			)
			dispatch({
				type: ACTION_TYPES.AUTH_CHECK,
				payload: userRes.data
		    })
		} else {
			dispatch({
				type: ACTION_TYPES.AUTH_CHECK_FAIL
			})
		}

		dispatch(setLoading(false))
	} catch (err) {
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
}


export const emailVerificationSend = (email) => async(dispatch) => {
	try {
		dispatch(setLoading(true))
		email = JSON.stringify({email})
		await Axios.post('https://sl-chat.herokuapp.com/api/verificationSend', email, config)
		
		dispatch({
			type: ACTION_TYPES.MODAL_VERIFICATION_OPEN
		})
		
		dispatch(setLoading(false))
	} catch (err) {
		console.log(err)
		console.log(err.response.data.msg)
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
}

export const emailVerification = (code) => async(dispatch) => {
	try {
		dispatch(setLoading(true))
		let token = localStorage.getItem("auth-token")
		const data = JSON.stringify({code, token})

		await Axios.post(
			'https://sl-chat.herokuapp.com/api/verificationRight',
			data, config
		)
		
		dispatch(userVerify())
		dispatch(setAlert("Successfully signed up.", 'success'))

		dispatch(setLoading(false))
	} catch (err) {
		dispatch(setLoading(false))
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
}


export const login = (emailLogin, passwordLogin) => async(dispatch) => {
	try {
		dispatch(setLoading(true))
		const loginUser = JSON.stringify({emailLogin, passwordLogin})
		const loginRes = await Axios.post('https://sl-chat.herokuapp.com/api/login', loginUser, config)
    	localStorage.setItem("auth-token", loginRes.data.token)
		
		dispatch({
			type: ACTION_TYPES.AUTH_LOGIN,
			payload:loginRes.data
		})
		dispatch(checkLogged())
		dispatch(setLoading(false))
	} catch (err) {
		dispatch(setLoading(false))
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
}

export const register = (email,password,confirmPassword,name) => async(dispatch) => {
	try {
		dispatch(setLoading(true))

		const newUser = JSON.stringify({email, password, confirmPassword, name})
		await Axios.post('https://sl-chat.herokuapp.com/api/register', newUser, config)
		dispatch(login(email,password))
		dispatch(emailVerificationSend(email))

		dispatch(setLoading(false))

	} catch (err) {
		console.log(err.response.data.msg)
		dispatch(setLoading(false))
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
};

export const logout = () => async (dispatch) => {
	try {
		localStorage.setItem('auth-token', '')
		dispatch(checkLogged())
	} catch (err) {
		dispatch(setAlert(err.response.data.msg, 'error'))
	}
}

