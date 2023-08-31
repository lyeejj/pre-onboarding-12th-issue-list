import styles from '../../styles/Spinner.module.scss';

function Spinner() {
	return (
		<div className={styles.spinnerOverlay}>
			<div className={styles.spinner}></div>
		</div>
	);
}

export default Spinner;
