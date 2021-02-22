import React, {useRef} from 'react';
import styles from './ChosenRoomDecoration.module.scss';

const ChosenRoomDecoration = () => {
    let moveRefs = useRef([]);
	moveRefs.current = [0,0,0,0,0,0].map(
	      (ref, idx) =>   moveRefs.current[idx] = React.createRef()
	)
  	const mouseMoveHandler = (e, idx) => {
  		[0,0,0,0,0,0].map((el, index) => {
  		  	const score = moveRefs.current[index].current.dataset.speed
			const innerX = (window.innerWidth - e.pageX * score)/100
			const innerY = (window.innerHeight - e.pageY * score)/100
			return moveRefs.current[index].current.style.transform=`translateX(${innerX}px) translateY(${innerY}px)`
  		})
	}

    return (
        <>
            <div
                className={styles.decoration}
                onMouseMove={(e) => mouseMoveHandler(e)}>

                <div className={styles.bg} />
                <div
                     className={styles.person}
                     data-speed="2"
                     ref={moveRefs.current[0]}  />

                <div className={styles.firstMessage}
                            data-speed="2"
		       				ref={moveRefs.current[1]}
                >
                    <div className={styles.messageBg1}/>
                    <div className={styles.message}
                            data-speed="2"
		       				ref={moveRefs.current[2]}
                    />
                </div>
                <div className={styles.secondMessage}>
                    <div className={styles.messageBg2}/>
                    <div className={styles.message2}
                            data-speed="1"
		       				ref={moveRefs.current[3]}
                    />
                </div>
                <div className={styles.thirdMessage}
                     data-speed="2"
                     ref={moveRefs.current[4]}
                >
                    <div className={styles.messageBg3}/>
                    <div className={styles.message3}
                        data-speed="1"
                         ref={moveRefs.current[5]}
                    />
                </div>
            </div>
        </>
    )
}

export default ChosenRoomDecoration