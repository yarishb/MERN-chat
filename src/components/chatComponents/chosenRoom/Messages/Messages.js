import React, {useState, useEffect, useRef} from 'react';
import styles from './Messages.module.scss';
import {getTime} from "../../../../utils/utils";


export const Message = ({el, user}) => {
    // false - him/her, true - me
    const [sender, setSender] = useState(false)
    const [time, setTime] = useState()
    const messagesEnd = useRef()

    useEffect(() => {
        el.author.email === user.email ? setSender(true) : setSender(false)
        scrollToBottom()
        setTime(getTime(el.postedAt))
    }, [el])

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <div className={styles.container}>
                <div ref={messagesEnd} className={sender ? `${styles.messageYou} ${styles.message}` : `${styles.messageOpposite} ${styles.message}`}>
                    <div className={styles.messageName}>{el.author.name}</div>
                    <div className={styles.messageContent}>{el.message}</div>
                    <div className={sender? styles.messageTimestampRight : styles.messageTimestampLeft}>{time}</div>
                </div>
            </div>
        </>
    )
}


export const OldMessages = React.memo(({roomMessages, user}) => {
    const [stateRoomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        setRoomMessages(roomMessages)
    }, [roomMessages])

    return (
        <>
            <div className={styles.container}>
            {
                stateRoomMessages.map((el, idx) => {
                    return (
                        <Message el={el} user={user} key={idx}/>
                    )
                })
            }
            </div>
        </>
    )
})



export const Messages = ({newMessages, user}) => {
    return (
        <>
            <div className={styles.container}>
            {
                 newMessages.map((el, idx) => {
                     return (
                         <Message el={el} user={user} key={idx}/>
                     )
                 })
            }
            </div>
        </>
    )
}


