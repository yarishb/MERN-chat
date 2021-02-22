import React, {useState, useEffect} from 'react'
import styles from './Rooms.module.scss'
import {connect} from "react-redux";
import {chosenRoom} from "../../../store/actions/chat";
import {getTime} from "../../../utils/utils";


const Rooms = ({user, chosenRoom}) => {
    const [chosen, setChosen] = useState(undefined)


    return (
        <>
            {
                user.rooms.slice(0).reverse().map((room, idx) => {
                    let message;
                    const lastMessage = user.lastMessages[room.name].lastMessage;
                    if (lastMessage !== undefined) {
                        message = lastMessage.message.length >= 35 ? lastMessage.message.substring(0, 35).trimEnd() + "..." : lastMessage.message;
                    }

                    return (
                        <div
                            className={styles.menuRoom}
                            onClick={() => {
                                setChosen(idx)
                                chosenRoom(room)
                            }}
                            key={idx}
                            style={{backgroundColor: chosen === idx && '#fc8621', border: '0'}}
                        >
                            <div className={styles.timeBox}>
                                <div className={styles.time}>{lastMessage !== undefined && getTime(lastMessage.postedAt)}</div>
                            </div>
                            <div className={styles.roomName}>{room.name}</div>
                            {
                                lastMessage !== undefined
                                    ?
                                    <div className={styles.lastMessage}>
                                        {message}
                                    </div>
                                    :
                                    <div className={styles.lastMessage}>No messages in room yet.</div>
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})
export default connect(mapStateToProps, {chosenRoom})(Rooms)