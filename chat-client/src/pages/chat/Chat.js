import React, { useEffect } from 'react'
import styles from './Chat.module.scss'
import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { checkLogged } from '../../store/actions/auth'

import ChatMenu from '../../components/usedComponents/ChatMenu/ChatMenu'
import RoomModal from "../../components/usedComponents/RoomManipulation/RoomModal";
import ChosenRoom from "../../components/chatComponents/chosenRoom/ChosenRoom";


export const Chat = ({ checkLogged, isLogged, open_modal }) => {
	const history = useHistory()

	const changePage = () => {
		history.push('/auth')
	}

	useEffect(() => {
		isLogged === undefined && checkLogged()
	}, [isLogged])

    return (
    	<>
    	{

    		isLogged === true || undefined?
	    		<div>
					{open_modal && <RoomModal />}
					<div className={styles.chatBox}>
						<ChatMenu />
						<ChosenRoom />
					</div>
				</div>
	        	: isLogged === false && changePage() 
    	}
        </>
    )
}


const mapStateToProps = (state) => ({
	isLogged: state.auth.isLogged,
	open_modal: state.chat.open_modal,
})

export default connect(mapStateToProps, {checkLogged})(Chat)

