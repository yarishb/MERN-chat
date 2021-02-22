import React, { useState, useEffect } from 'react'
import styles from './Modal.module.scss'

import Button from '../Button/Button'
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'

import {emailVerification, closeVerificationModal} from '../../../store/actions/auth'

const Modal = ({emailVerification, closeVerificationModal, user_verified, user}) => {
	const [codeInput, setCodeInput] = useState('') 
	const [stageOne, setStage] = useState(true)

	const classname = `${styles.modalDot} ${styles.modalDotActive}` 

	useEffect(() => {
		if (user_verified) setStage(false)
	}, [])


	return (
		<>
			<div className={styles.fullPage}></div>	
			<div className={styles.modalWindow} style={{height: !stageOne && '300px'}}>
				{
					stageOne
					?
					<>
					<div className={styles.modalImage}></div>
						<div className={styles.modalText}>
							<div className={styles.modalHeader}>Verification code was sent to your email.</div>
							<div className={styles.modalTitle}>Please, paste it down here to prove that you're not a robot.</div>
							<input value={codeInput.code} name={codeInput.code} placeholder="CODE" onChange={(e) => setCodeInput(e.target.value)} className={styles.modalInput}/>
						</div>
					</>
					:
					<>
						<div className={`${styles.modalImage} ${styles.modalEmoji}`}></div>
						<div className={styles.modalText}>
							<div className={styles.modalHeader} style={{fontSize:'30px'}}>Congratulations, {user.name}!</div>
							<div className={styles.modalTitle} style={{fontSize:'20px'}}>You've successfully created an account.</div>                                                                                           											
						</div>
					</>
				}
				<div className={styles.modalStaticContent}>
					<div style={{marginRight: stageOne? '' : '7rem', display:'flex', flexDirection: 'row'}}>
						<div className={stageOne? classname : styles.modalDot} style={{marginRight: '1.5rem'}}></div>
						<div className={!stageOne? classname : styles.modalDot}></div>
					</div>
					{stageOne && 
						<>
							<div className={styles.modalButton} onClick={() => closeVerificationModal()}><Button style={{backgroundColor: 'grey', marginRight: '1rem', width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Close'}/></div>
							<div className={styles.modalButton} onClick={() => emailVerification(codeInput)}><Button style={{width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Submit'}/></div>
						</>
					}
					{!stageOne && <Link to={'/'} className={styles.modalButton}><Button style={{width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Start'}/></Link>}
				</div>
			</div>
		</>
	)
}


const mapStateToProps = (state) => ({
	user_verified: state.auth.user_verified,
	user: state.auth.user
})

export default connect(mapStateToProps, {emailVerification, closeVerificationModal})(Modal)