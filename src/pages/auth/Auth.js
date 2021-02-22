import React from 'react'
import styles from './Auth.module.scss'


//COMPONENTS
import Decoration from '../../components/usedComponents/decorations/Decoration'
import Register from '../../components/auth/Register/Register'
import Login from '../../components/auth/Login/Login'
import Modal from '../../components/usedComponents/Modal/Modal'

//REDUX TOOLS
import * as ACTIONS from '../../store/actions/auth'
import { connect } from 'react-redux'

export const Auth = (props) => {
    const switchText = props.switch_auth? "Haven't got and account yet? Try to sign up" : "Already have an account Try to sign in"
    
    return (
        <div className={styles.main}>
            {props.modal_open && <Modal/>}
        	<div className={styles.authBack}>
        		<div className={styles.logo}></div>
        		<div className={styles.auth}>
        			{props.switch_auth? <div className={styles.authBox}><Login /></div> : <div className={styles.authBox}><Register /></div>}
                    <div onClick={() => props.switch()} className={styles.switch}>
                        {switchText}
                    </div>
        		</div>
        		<Decoration />
        	</div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    switch_auth: state.auth.switch_auth,
    modal_open: state.auth.modal_open,
})

const mapDispatchToProps = (dispatch) => ({
    switch: () => dispatch(ACTIONS.switch_auth())
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)