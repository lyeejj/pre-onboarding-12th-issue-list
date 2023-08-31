import { IssueListType } from '../../types/issueList.interface';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/IssueItem.module.scss';
import { getDate } from '../../utils/getDate';

function IssueItem({ item }: { item: IssueListType }) {
	const navigate = useNavigate();
	const showIssueDetail = (issue_number: number) => {
		navigate(`/issue/${issue_number}`);
	};
	return (
		<>
			<li
				className={styles.item}
				key={item.number}
				onClick={() => {
					showIssueDetail(item.number);
				}}
			>
				<div className={styles.info}>
					<h2>
						<span className={styles['issue-number']}>#{item.number}</span> {item.title}
					</h2>
					<span className={styles['sub-info']}>
						작성자: {item.user.login}, 작성일: {getDate(item.created_at)}
					</span>
				</div>
				<span className={styles['sub-info']}>댓글수: {item.comments}</span>
			</li>
		</>
	);
}
export default IssueItem;
