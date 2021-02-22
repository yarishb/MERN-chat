import React from 'react';
import styles from './ChatMenu.module.scss';
import {connect} from "react-redux";
import {open_modal} from "../../../store/actions/chat";

import ArrowUp from "../ArrowUp/ArrowUp";
import Rooms from "../../chatComponents/Rooms/Rooms";
import {setLoading} from "../../../store/actions/loader";
import {logout} from "../../../store/actions/auth";

const ChatMenu = ({user, open_modal, logout}) => {
    const checker = () => {
        if (user.rooms !== undefined && user.rooms.length > 0) {
            return true
        }
        return false
    }
    return (
        <>
            <div className={styles.menu}>
            <div className={styles.chatMenu}>
                <div className={styles.helloName}>
                    <div>Hey, {user.name}</div>
                    <div className={styles.logout} onClick={() => logout()}/>
                </div>
                <div className={styles.roomManipulators}>
                    <div  onClick={() => open_modal('CREATE_NEW_ROOM')} className={`${styles.roomManipulatorsButton} ${styles.firstButton}`}>
                        <div className={styles.plus}>+</div>
                        <div className={styles.buttonText}>new room</div>
                    </div>
                    <div onClick={() => open_modal('JOIN_EXISTING_ROOM')} className={`${styles.roomManipulatorsButton} ${styles.secondButton}`}>
                        <i className={styles.plus}><ArrowUp /></i>
                        <div className={styles.buttonText}>join room</div>
                    </div>
                </div>

                    <div className={styles.roomsStyles}>
                        {
                            checker()
                            ?
                                <Rooms />
                            :
                                <div className={styles.noRooms}> No chats yet.</div>
                        }
                    </div>

            </div>
                </div>
        </>
    )
}

const mapStateToProps = (state) => ({
	user: state.auth.user
})

export default connect(mapStateToProps, {open_modal, setLoading, logout})(ChatMenu)