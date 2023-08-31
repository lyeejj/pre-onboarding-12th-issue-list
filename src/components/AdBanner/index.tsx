import styles from '../../styles/AdBanner.module.scss';

const AdBanner = () => {
	const banner = {
		url: 'https://www.wanted.co.kr/',
		img: 'https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100',
		alt: '원티드 배너 광고 이미지',
	};
	return (
		<a className={styles.banner} href={banner.url} target="_blank" rel="noopener noreferrer">
			<img src={banner.img} alt={banner.alt} />
		</a>
	);
};

export default AdBanner;
