
import React from 'react'
import styles from './Loader.module.scss'



const Loader = () => {
	return (
		<>
		<div className={styles.container}>
		  <div className={`${styles.dash} ${styles.first}`}></div>
		  <div className={`${styles.dash} ${styles.second}`}></div>
		  <div className={`${styles.dash} ${styles.third}`}></div>
		  <div className={`${styles.dash} ${styles.fourth}`}></div>
		</div>
	</>
	)
}
export default Loader