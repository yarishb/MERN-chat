import React from 'react';
import styles from './ChosenRoomHeader.module.scss';
import {connect} from "react-redux";
import {open_modal, chosenRoom} from "../../../../store/actions/chat";


const RoomHeader = ({room, open_modal, chosenRoom}) => {
    return (
        <div className={styles.roomHeader}>
            <div className={styles.roomHeaderContent}>
                <div className={styles.roomHeaderClose} onClick={() => chosenRoom(undefined)}>x</div>
                <div className={styles.roomHeaderName}>{room.name}</div>
                <div className={styles.roomMembers}>
                    {
                        room.users.length === 1
                            ?
                            <div>1 member</div>
                            :
                            <div>{room.users.length} members</div>
                    }
                </div>
            </div>
            <div className={styles.leaveButton} onClick={() => open_modal("LEAVE_ROOM")}>leave</div>
        </div>
    )
}



export default connect(null, {open_modal, chosenRoom})(RoomHeader)