import React, { useRef } from 'react'
import styles from './decorations.module.scss'

export default function Decoration() {
	let moveRefs = useRef([]);
	moveRefs.current = [0,0,0,0].map(
	      (ref, idx) =>   moveRefs.current[idx] = React.createRef()
	)
  	const mouseMoveHandler = (e, idx) => {
  		[0,0,0,0].map((el, index) => {
  		  	const score = moveRefs.current[index].current.dataset.speed
			const innerX = (window.innerWidth - e.pageX * score)/100
			const innerY = (window.innerHeight - e.pageY * score)/100
			return moveRefs.current[index].current.style.transform=`translateX(${innerX}px) translateY(${innerY}px)`
  		})
	}
	
	return (
		<>
			<div className={styles.fullPage} onMouseMove={(e) => mouseMoveHandler(e)}>
				<div className={styles.art}>
	        		<div className={styles.artBg}></div>
		       			<div 
		       				data-speed="7" 
		  					ref={moveRefs.current[0]}  
		       				className={`${styles.planet} ${styles.spaceman}`}>
		       			</div>
		   				<div 
	    					data-speed="2"  
		       				ref={moveRefs.current[1]} 
		      				className={`${styles.planet} ${styles.planet1}`}>
		   				</div>
		   				<div 
		       				data-speed="4" 
		   					ref={moveRefs.current[2]} 
		        			className={`${styles.planet} ${styles.planet2}`}>
		        		</div>
		       			<div 
							data-speed="6" 
		       				ref={moveRefs.current[3]}  
		        			className={`${styles.planet} ${styles.planet3}`}>
		       			</div>
	       				<div className={styles.artSpace}></div>
	        	</div>
        	</div>
		</>
	)
}