import React, {useState, useEffect} from 'react';
import styles from './RoomModal.module.scss';
import {connect} from "react-redux";
import {chatManager, close_modal} from "../../../store/actions/chat";
import Input from "../Input/Input";
import Button from "../Button/Button";

const RoomModal = ({typeModal, close_modal, chatManager}) => {
    const [roomName, setRoomName] = useState('')
    return (
        <>
            <div className={styles.modalBg} onClick={() => close_modal()}/>
            <div className={styles.modalCenter}>
            <div className={styles.modalRoom}>
                {
                    typeModal === "JOIN_EXISTING_ROOM" &&
                        <div className={styles.modalContent}>
                            <div className={`${styles.modalRoomImg} ${styles.modalRoomImgFirst}`}/>
                            <div className={styles.modalRoomText}>
                                <div className={styles.modalRoomHeader}>Join room!</div>
                                <Input
                                    name={"roomName"}
                                    type={"text"}
                                    placeholder={"Paste name of the room"}
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                />

                                <div className={styles.modalRoomButton}>
                                    <div onClick={() => close_modal()}><Button style={{backgroundColor: 'grey', marginRight: '1rem', width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Close'}/></div>
                                    <div onClick={() => chatManager(roomName, 'joinRoom', 'join')}><Button style={{width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={"Join!"}/></div>
                                </div>
                            </div>
                        </div>
                }
                {
                    typeModal === "CREATE_NEW_ROOM" &&
                        <div className={styles.modalContent}>
                            <div className={`${styles.modalRoomImg} ${styles.modalRoomImgSecond}`}/>
                            <div className={styles.modalRoomText}>
                                <div className={styles.modalRoomHeader}>Create new room!</div>
                                <Input
                                    name={"roomName"}
                                    type={"text"}
                                    placeholder={"Paste name of the room"}
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                />

                                <div className={styles.modalRoomButton} style={{bottom: "-1rem"}}>
                                    <div onClick={() => close_modal()}><Button style={{backgroundColor: 'grey', marginRight: '1rem', width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Close'}/></div>
                                    <div onClick={() => chatManager(roomName, 'createNewRoom', 'new')}><Button style={{width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={"Create!"}/></div>
                                </div>
                            </div>
                        </div>
                }
                {
                    typeModal === "LEAVE_ROOM" &&
                        <div className={styles.modalContent} >
                            <div className={`${styles.modalRoomImg} ${styles.modalRoomImgThird}`}/>
                            <div className={styles.modalRoomText} style={{marginLeft: '-3rem'}}>
                                <div className={`${styles.modalRoomHeader} ${styles.modalRoomHeaderLeave}`}>Are you sure to leave this room? If yes, paste the name of the room.</div>
                                <Input
                                    name={"roomName"}
                                    type={"text"}
                                    placeholder={"Paste name of the room"}
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                />

                                <div className={`${styles.modalRoomButton} ${styles.modalRoomButtonLarge}`} style={{bottom: "1rem"}}>
                                    <div onClick={() => close_modal()}><Button style={{backgroundColor: 'grey', marginRight: '1rem', width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={'Close'}/></div>
                                    <div onClick={() => chatManager(roomName, 'leaveRoom', 'leave')}><Button style={{width:'7rem', fontSize: '20px', height: '2.7rem', paddingTop:"8px"}} data={"Leave"}/></div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            </div>
        </>
    )
}


const mapStateToProps = (state) => ({
    typeModal: state.chat.typeModal,
    user: state.chat.user
});

export default connect(mapStateToProps, {close_modal,chatManager})(RoomModal)