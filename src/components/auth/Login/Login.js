import React, {useState, useEffect } from 'react'
import styles from '../Register/Register.module.scss'

//Additional 
import Button from '../../usedComponents/Button/Button'
import Input from '../../usedComponents/Input/Input'

//Redux
import { connect } from 'react-redux'
import {login} from '../../../store/actions/auth'
import {setLoading} from "../../../store/actions/loader";

//Router
import {useHistory} from 'react-router-dom'

export const Login = ({login, isLogged}) => {
	const history = useHistory()

	const [data, setData] = useState({
		email: '',
		password: '',
	})

	const inputHandler = (e) => {
		e.preventDefault()
		const value = e.target.value
		setData({
			...data,
			[e.target.name]: value
		})
	}

	useEffect(() => {
		if (isLogged !== undefined && isLogged === true) {
			history.push('/')
		}
	}, [isLogged])


	return (
		<>
			<form className={styles.form}>
				<Input value={data.email} name={'email'} onChange={inputHandler} type={'email'} placeholder={'Your E-Mail adress'}/>
				<Input value={data.password} name={'password'} onChange={inputHandler} type={'password'} placeholder={'Password'}/>
				<div style={{marginTop: '1rem'}} onClick={() => login(data.email, data.password)}><Button data={'Sign in'}/></div>
			</form>
		</>
	)
}



const mapStateToProps = (state) => ({
	isLogged: state.auth.isLogged
})

export default connect(mapStateToProps, {login, setLoading})(Login)
