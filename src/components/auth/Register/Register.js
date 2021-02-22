import React, {useState} from 'react'
import styles from './Register.module.scss'
import { useHistory } from "react-router-dom"

//Additional 
import Button from '../../usedComponents/Button/Button'
import Input from '../../usedComponents/Input/Input'

//Redux
import { connect } from 'react-redux'
import {register} from '../../../store/actions/auth'



const Register = ({register}) => {
	const history = useHistory();

	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: ''
	})
	
	const inputHandler = (e) => {
		e.preventDefault()
		const value = e.target.value
		setData({
			...data,
			[e.target.name]: value
		})
	}

	return (
		<div>
			<form className={styles.form}>
				<Input value={data.name} name={'name'} onChange={inputHandler} type={'name'} placeholder={'Your name'}/>
				<Input value={data.email} name={'email'} onChange={inputHandler} type={'email'} placeholder={'Your E-Mail adress'}/>
				<Input value={data.password} name={'password'} onChange={inputHandler} type={'password'} placeholder={'Your password'}/>
				<Input value={data.confirmPassword} name={'confirmPassword'} onChange={inputHandler} type={'password'} placeholder={'Confirm your password'}/>
				<div onClick={() => register(data.email, data.password, data.confirmPassword, data.name, history)} style={{marginTop: '1rem'}}><Button data={'Sign up'}/></div>
			</form>
		</div>
	)
}


export default connect(null, {register})(Register)

