import styles from '../../styles/Spinner.module.scss';

function Spinner({ scroll }: { scroll?: boolean }) {
	return (
		<div className={`${!scroll && styles.spinnerOverlay}`}>
			<div className={styles.spinner}></div>
		</div>
	);
}

export default Spinner;
